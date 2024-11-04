import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
  element: HTMLElement;
}

// Function to calculate the active heading based on the scroll position
function calculateActiveIndex(
  headings: Heading[],
  setActiveId: (id: string) => void
) {
  const scrollY = window.scrollY;
  const headerOffset = 100; // Adjust based on your header height

  // Find the current active heading based on scroll position
  for (const heading of headings) {
    const element = document.getElementById(heading.id);
    if (element) {
      const { top } = element.getBoundingClientRect();
      const absoluteTop = top + scrollY;

      if (absoluteTop - headerOffset <= scrollY) {
        setActiveId(heading.id);
      }
    }
  }
}

const CustomTOC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");
  const tocRef = useRef<HTMLElement | null>(null); // Ref for TOC component
  const pathname = usePathname()
  const language = useLanguage()

  useEffect(() => {
    // Select all heading elements
    const headingElements = Array.from(
      document.querySelectorAll("h1,h2,h3,h4,h5,h6")
    );

    // Map over the heading elements to extract necessary data
    const extractedHeadings = headingElements
      .map((heading) => {
        const anchor = heading.querySelector("a[id]");
        if (!anchor) return null;

        const id = anchor.id;
        const text = Array.from(heading.childNodes)
          .filter((node) => node.nodeType === Node.TEXT_NODE)
          .map((node) => node.textContent)
          .join("")
          .trim();
        const level = Number(heading.tagName.substring(1));

        return { id, text, level, element: heading as HTMLElement };
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

    // Smooth scroll handling specific to this component
    const handleTOCClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches(".toc-link")) {
        e.preventDefault();
        const id = target.getAttribute("href")?.slice(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            const headerOffset = 80; // Adjust based on your fixed header height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }
      }
    };

    // Add the click event listener only to the TOC container
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

  return (
    <nav
      ref={tocRef} // Attach ref to nav element
      aria-label="Table of Contents"
      className="fixed right-4 top-20 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto scroll-smooth"
    >
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{
              marginLeft: `${(heading.level - 1) * 1}rem`,
              transition: "all 0s ease",
            }}
          >
            <a
              href={`#${heading.id}`}
              className={`
                toc-link
                block py-1.5 px-3 text-sm
                rounded-md transition-all duration-200
                ${
                  heading.id === activeId
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-900 dark:hover:bg-gray-400 dark:hover:text-blue-600"
                }
              `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CustomTOC;
