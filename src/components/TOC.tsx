'use client';
import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

// Function to calculate the active heading based on scroll position
function calculateActiveIndex(
  headings: Heading[],
  setActiveId: (id: string) => void
) {
  const scrollY = window.scrollY;
  const headerOffset = 100; // Adjust based on your header height

  // Find the current active heading based on scroll position
  let activeHeading = null;
  
  for (let i = headings.length - 1; i >= 0; i--) {
    const heading = headings[i];
    const element = document.getElementById(heading.id);
    
    if (element) {
      const { top } = element.getBoundingClientRect();
      const absoluteTop = top + scrollY;
      
      if (absoluteTop - headerOffset <= scrollY) {
        activeHeading = heading;
        break;
      }
    }
  }
  
  if (activeHeading) {
    setActiveId(activeHeading.id);
  } else if (headings.length > 0) {
    // Default to first heading if none are active
    setActiveId(headings[0].id);
  }
}

// Function to generate a unique ID for headings without IDs
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const CustomTOC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const scrollListenerRef = useRef<number | null>(null);
  const pathname = usePathname();
  const { language } = useLanguage();

  useEffect(() => {
    // Add IDs to headings that don't have them
    const contentContainer = document.querySelector('.nextra-content');
    if (!contentContainer) return;
    
    const headingElements = Array.from(
      contentContainer.querySelectorAll('h1, h2, h3, h4')
    );
    
    // Process headings and add IDs if needed
    headingElements.forEach((heading) => {
      const existingId = heading.id;
      const headingText = heading.textContent?.trim() || '';
      
      if (!existingId && headingText) {
        const newId = generateId(headingText);
        heading.id = newId;
      }
    });
    
    // Now extract all headings with IDs
    const extractedHeadings = headingElements
      .map((heading) => {
        const id = heading.id;
        const text = heading.textContent?.trim() || '';
        const level = parseInt(heading.tagName.substring(1), 10);
        
        if (id && text) {
          return { id, text, level };
        }
        return null;
      })
      .filter((heading): heading is Heading => heading !== null);

    setHeadings(extractedHeadings);

    // Set up scroll listener
    const handleScroll = () => {
      if (extractedHeadings.length > 0) {
        calculateActiveIndex(extractedHeadings, setActiveId);
      }
    };

    // Initial calculation
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    scrollListenerRef.current = window.setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollListenerRef.current) {
        window.clearTimeout(scrollListenerRef.current);
      }
    };
  }, [pathname, language]);

  // Handle TOC link clicks for smooth scrolling
  const handleTOCClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const link = target.closest('a') as HTMLAnchorElement;
    
    if (link) {
      const id = link.getAttribute('href')?.slice(1);
      
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
          
          // Update active ID immediately for better UX
          setActiveId(id);
        }
      }
    }
  };

  return (
    <nav 
      aria-label="Table of Contents"
      className="lg:sticky lg:top-20 w-full overflow-hidden"
    >
      <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h4 className="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-2 px-1.5 border-b border-gray-100 dark:border-gray-800 pb-1.5">
          On This Page
        </h4>
        {headings.length > 0 ? (
          <ul className="space-y-0.5 max-h-[calc(100vh-12rem)] overflow-y-auto pr-1">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ 
                  paddingLeft: `${Math.min((heading.level - 1) * 6, 18)}px`,
                  transition: "all 0.2s ease"
                }}
              >
                <a
                  href={`#${heading.id}`}
                  className={`
                    toc-link
                    block py-1 px-1.5 text-[11px]
                    rounded-md transition-all duration-200
                    ${
                      heading.id === activeId
                        ? "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/40 font-medium border-l-2 border-amber-500 dark:border-amber-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                    }
                  `}
                  onClick={handleTOCClick}
                >
                  <span className="block truncate">{heading.text}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-700 dark:text-gray-300 px-1.5">
            No headings found on this page.
          </p>
        )}
      </div>
    </nav>
  );
};

export default CustomTOC; 