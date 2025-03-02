'use client';
import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

// Function to calculate the active heading based on the scroll position
function calculateActiveIndex(
  headings: Heading[],
  setActiveId: (id: string) => void
) {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const headerOffset = 100;

  // If we're at the top of the page, highlight the first heading
  if (scrollY < headerOffset && headings.length > 0) {
    setActiveId(headings[0].id);
    return;
  }

  // If we're at the bottom of the page, highlight the last heading
  if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
    setActiveId(headings[headings.length - 1].id);
    return;
  }

  // Find all headings that are currently in view or above the viewport
  const visibleHeadings = headings.filter(heading => {
    const element = document.getElementById(heading.id);
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return rect.top <= viewportHeight / 2;
  });

  // Set the last visible heading as active
  if (visibleHeadings.length > 0) {
    setActiveId(visibleHeadings[visibleHeadings.length - 1].id);
  } else if (headings.length > 0) {
    setActiveId(headings[0].id);
  }
}

// Function to generate a unique ID for headings without IDs
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const CustomTOC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");
  const tocRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const { language } = useLanguage();

  useEffect(() => {
    const contentContainer = document.querySelector('.nextra-content');
    if (!contentContainer) return;
    
    // Only select h2 and h3 headings for better hierarchy
    const headingElements = Array.from(
      contentContainer.querySelectorAll('h2, h3')
    );
    
    // Process headings and add IDs if needed
    const extractedHeadings = headingElements
      .map((heading) => {
        const id = heading.id || generateId(heading.textContent?.trim() || '');
        const text = heading.textContent?.trim() || '';
        const level = parseInt(heading.tagName.substring(1), 10);
        
        if (!heading.id) {
          heading.id = id;
        }
        
        if (id && text) {
          return { id, text, level };
        }
        return null;
      })
      .filter((heading): heading is Heading => heading !== null);
    
    setHeadings(extractedHeadings);

    // Enhanced scroll tracking with debouncing
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        calculateActiveIndex(extractedHeadings, setActiveId);
      }, 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    calculateActiveIndex(extractedHeadings, setActiveId); // Initial calculation

    // Smooth scroll handling
    const handleTOCClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('.toc-link') as HTMLAnchorElement;
      
      if (link) {
        e.preventDefault();
        const id = link.getAttribute("href")?.slice(1);
        
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            // Adjust the header offset to match your layout
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = window.pageYOffset + elementPosition - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
            
            // Update active ID immediately for better UX
            setActiveId(id);
          }
        }
      }
    };

    // Add the click event listener to the TOC container
    const tocElement = tocRef.current;
    if (tocElement) {
      tocElement.addEventListener("click", handleTOCClick);
    }

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (tocElement) {
        tocElement.removeEventListener("click", handleTOCClick);
      }
      clearTimeout(timeoutId);
    };
  }, [pathname, language]);

  // Don't render if no headings
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      ref={tocRef}
      aria-label="Table of Contents"
      className="lg:sticky lg:top-20 w-full overflow-hidden"
    >
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 min-w-[280px]">
        <div className="flex items-center space-x-2 mb-6">
          <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 tracking-wide">
            On This Page
          </h4>
        </div>
        
        {headings.length > 0 ? (
          <div className="relative">
            <div className="absolute left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/20 via-amber-500/10 to-transparent"></div>
            <ul className="space-y-2 max-h-[calc(100vh-10rem)] overflow-y-auto pr-3 custom-scrollbar">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  style={{ 
                    marginLeft: heading.level === 3 ? '16px' : '0',
                  }}
                >
                  <a
                    href={`#${heading.id}`}
                    className={`
                      toc-link
                      group
                      flex items-center
                      py-2.5 pl-7 pr-3
                      text-sm
                      rounded-lg
                      transition-all duration-200
                      relative
                      ${
                        heading.id === activeId
                          ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }
                    `}
                  >
                    <span 
                      className={`
                        absolute left-0 w-[22px] h-[22px] 
                        flex items-center justify-center
                        rounded-full
                        transition-all duration-200
                        ${
                          heading.id === activeId
                            ? "bg-amber-500 border-2 border-amber-200 dark:border-amber-900"
                            : "border-2 border-gray-200 dark:border-gray-700 group-hover:border-amber-200 dark:group-hover:border-amber-900"
                        }
                      `}
                    >
                      <div 
                        className={`
                          w-2 h-2 
                          rounded-full 
                          ${
                            heading.id === activeId
                              ? "bg-white"
                              : "bg-gray-400 dark:bg-gray-600 group-hover:bg-amber-500"
                          }
                        `}
                      />
                    </span>
                    <span className="ml-2 block truncate">{heading.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No headings found on this page.
          </p>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #D1D5DB;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9CA3AF;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4B5563;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>
    </nav>
  );
};

export default CustomTOC; 