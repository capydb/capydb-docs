// components/CustomTOC.tsx
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from 'next/router';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const { language } = useLanguage();
  const { asPath } = useRouter(); // Get current path

  useEffect(() => {
    // Function to fetch headings
    const fetchHeadings = () => {
      const headingElements = Array.from(
        document.querySelectorAll('h1,h2,h3,h4,h5,h6')
      );

      const newHeadings = headingElements.map((heading) => ({
        id: heading.id,
        text: heading.textContent || '',
        level: Number(heading.tagName.substring(1)),
      }));

      setHeadings(newHeadings);
    };

    // Fetch headings on initial load, language change, or path change
    fetchHeadings();
  }, [language, asPath]); // Depend on both language and path

  return (
    <nav className='fixed'>
      <ul>
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ marginLeft: (heading.level - 1) * 16 }}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
