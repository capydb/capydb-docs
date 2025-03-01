'use client';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import TOC from './TOC';

interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}

interface SidebarSection {
  title: string;
  items: NavItem[];
}

// External links for the top navbar
const externalLinks: NavItem[] = [
  { title: 'Dashboard', href: 'https://capybaradb.co/dashboard', external: true },
  { title: 'Contact', href: 'https://capybaradb.co/home/contact', external: true },
];

// Documentation sidebar sections
const docSidebarSections: SidebarSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Overview', href: '/overview' },
      { title: 'Quick Start', href: '/' },
    ],
  },
  {
    title: 'Document Operations',
    items: [
      { title: 'Insert', href: '/document/insert' },
      { title: 'Find', href: '/document/find' },
      { title: 'Update', href: '/document/update' },
      { title: 'Delete', href: '/document/delete' },
      { title: 'Query', href: '/document/query' },
    ],
  },
  {
    title: 'EmbJSON',
    items: [
      { title: 'Overview', href: '/emb_json' },
      { title: 'EmbText', href: '/emb_json/emb_text' },
      { title: 'EmbImage', href: '/emb_json/emb_image' },
      { title: 'Supported Models', href: '/models' },
    ],
  },
  {
    title: 'Syntax',
    items: [
      { title: 'Filter', href: '/syntax/filter' },
      { title: 'Projection', href: '/syntax/projection' },
      { title: 'Update', href: '/syntax/update' },
    ],
  },
];

// API Reference sidebar sections
const apiSidebarSections: SidebarSection[] = [
  {
    title: 'API Reference',
    items: [
      { title: 'Overview', href: '/api-reference' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { title: 'Collections', href: '/api-reference/collections' },
      { title: 'Documents', href: '/api-reference/documents' },
    ],
  },
];

interface DocLayoutProps {
  children: ReactNode;
}

export default function DocLayout({ children }: DocLayoutProps) {
  const pathname = usePathname();
  const capybaradbUrl = process.env.NEXT_PUBLIC_CAPYBARADB_URL || 'https://capybaradb.co';
  
  // Determine which sidebar sections to display based on the URL path
  const isApiReference = pathname.startsWith('/api-reference');
  const sidebarSections = isApiReference ? apiSidebarSections : docSidebarSections;
  
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto shadow-md">
        <div className="flex items-center h-14 px-5 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
          <Link href="https://capybaradb.co" className="flex items-center">
            <Image
              src="https://capybaradb.co/images/mainIcon.png"
              alt="CapybaraDB logo"
              width={28}
              height={28}
              className="mr-3"
            />
            <span className="font-bold text-xl text-gray-900 dark:text-white">CapybaraDB</span>
          </Link>
        </div>
        <nav className="p-5">
          {sidebarSections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 ml-2">
                {section.title}
              </h3>
              <ul className="space-y-1.5">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                        pathname === item.href
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-medium shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                      }`}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                    >
                      {item.title}
                      {item.external && (
                        <svg className="ml-1 h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 ml-72">
        {/* Header bar with external links */}
        <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-14 flex items-center px-6 shadow-sm">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center h-full space-x-4">
              <Link 
                href="/"
                className={`text-sm font-medium transition-colors duration-200 ${
                  !isApiReference 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                <span className="flex items-center">
                  Documentation
                </span>
              </Link>
              <Link 
                href="/api-reference"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isApiReference 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                <span className="flex items-center">
                  API Reference
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4 h-full">
              {externalLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="flex items-center h-full text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex items-center">
                    {link.title}
                    <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Two-column layout with fixed widths */}
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content - takes 3/4 of the space on large screens */}
            <div className="lg:col-span-3">
              <div className="nextra-content bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                {children}
              </div>
            </div>
            
            {/* TOC - takes 1/4 of the space on large screens */}
            <div className="lg:col-span-1">
              <TOC />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 