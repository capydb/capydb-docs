'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// External links for the top navbar
const externalLinks = [
  { title: 'Dashboard', href: 'https://capydb.com/dashboard', external: true },
  { title: 'Contact', href: 'https://capydb.com/home/contact', external: true },
];

// Simple throttle function to limit how often a function runs
function throttle(callback: Function, delay: number) {
  let lastCall = 0;
  return function(...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return callback(...args);
  };
}

const Navbar = React.memo(() => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Create throttled scroll handler
  const controlNavbar = useCallback(
    throttle(() => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolling up or down
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        // Scrolling down - hide
        setVisible(false);
      } else {
        // Scrolling up - show
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    }, 200),
    [lastScrollY]
  );

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', controlNavbar);

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [controlNavbar]);

  return (
    <div className={`sticky top-0 z-20 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center px-6 transition-all duration-300 ease-in-out shadow-sm ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center h-full">
          {/* Documentation link removed */}
        </div>
        <div className="flex items-center space-x-4 h-full">
          {externalLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`group flex items-center px-4 py-1.5 rounded-lg border transition-all duration-200
                ${link.title === 'Dashboard' 
                  ? 'text-black bg-amber-500 hover:bg-amber-600 text-white border-transparent shadow-sm hover:shadow-md' 
                  : 'text-white border-gray-200 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/10'
                }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center text-sm font-medium">
                {link.title === 'Dashboard' && (
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                )}
                {link.title === 'Contact' && (
                  <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
                {link.title}
                <svg 
                  className={`ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                    ${link.title === 'Dashboard' ? 'text-white' : 'text-white'}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar; 