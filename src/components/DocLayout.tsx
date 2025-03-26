'use client';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import TOC from './TOC';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from './MDXComponents';

interface NavItem {
  title: string;
  href: string;
  external?: boolean;
  icon?: React.ReactNode;
}

interface SidebarSection {
  title: string;
  items: NavItem[];
}

// External links for the top navbar
const externalLinks: NavItem[] = [
  { title: 'Dashboard', href: 'https://capydb.com/dashboard', external: true },
  { title: 'Contact', href: 'https://capydb.com/home/contact', external: true },
];

// Documentation sidebar sections
const docSidebarSections: SidebarSection[] = [
  {
    title: 'Getting Started',
    items: [
      { 
        title: 'Overview', 
        href: '/overview',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )
      },
      { 
        title: 'Quick Start', 
        href: '/',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        )
      },
    ],
  },
  {
    title: 'Document Operations',
    items: [
      { 
        title: 'Insert', 
        href: '/document/insert',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        )
      },
      { 
        title: 'Find', 
        href: '/document/find',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        )
      },
      { 
        title: 'Update', 
        href: '/document/update',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        )
      },
      { 
        title: 'Delete', 
        href: '/document/delete',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        )
      },
      { 
        title: 'Query', 
        href: '/document/query',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )
      },
    ],
  },
  {
    title: 'EmbJSON',
    items: [
      { 
        title: 'Overview', 
        href: '/emb_json',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        )
      },
      { 
        title: 'EmbText', 
        href: '/emb_json/emb_text',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
          </svg>
        )
      },
      { 
        title: 'EmbImage', 
        href: '/emb_json/emb_image',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        )
      },
      { 
        title: 'Supported Models', 
        href: '/models',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
          </svg>
        )
      },
    ],
  },
  {
    title: 'Syntax',
    items: [
      { 
        title: 'Filter', 
        href: '/syntax/filter',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
          </svg>
        )
      },
      { 
        title: 'Projection', 
        href: '/syntax/projection',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
          </svg>
        )
      },
      { 
        title: 'Update', 
        href: '/syntax/update',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        )
      },
    ],
  },
];

// API Reference sidebar sections
const apiSidebarSections: SidebarSection[] = [
  {
    title: 'API Reference',
    items: [
      { 
        title: 'Overview', 
        href: '/api-reference',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        )
      },
    ],
  },
  {
    title: 'Main operations',
    items: [
      { 
        title: 'Overview', 
        href: '/api-reference/documents',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
          </svg>
        )
      },
      { 
        title: 'Insert Documents', 
        href: '/api-reference/documents/insert',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        )
      },
      { 
        title: 'Find Documents', 
        href: '/api-reference/documents/find',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        )
      },
      { 
        title: 'Query Documents', 
        href: '/api-reference/documents/query',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )
      },
      { 
        title: 'Update Documents', 
        href: '/api-reference/documents/update',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        )
      },
      { 
        title: 'Delete Documents', 
        href: '/api-reference/documents/delete',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        )
      },
    ],
  },
  {
    title: 'EmbJSON',
    items: [
      { 
        title: 'Overview', 
        href: '/api-reference/embjson',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        )
      },
      { 
        title: 'EmbText', 
        href: '/api-reference/embjson/embtext',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
          </svg>
        )
      },
      { 
        title: 'EmbImage', 
        href: '/api-reference/embjson/embimage',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        )
      },
      { 
        title: 'Supported LLM Modes', 
        href: '/api-reference/embjson/supported-llm-modes',
        icon: (
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
          </svg>
        )
      },
    ],
  },
];

interface DocLayoutProps {
  children: ReactNode;
}

export default function DocLayout({ children }: DocLayoutProps) {
  const pathname = usePathname();
  const isApiReference = pathname?.startsWith('/api-reference') || false;
  
  // Choose the appropriate sidebar sections based on the current path
  const sidebarSections = isApiReference ? apiSidebarSections : docSidebarSections;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto shadow-md">
        <div className="flex items-center h-16 px-5 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
          <Link href="https://capydb.com" className="flex items-center group">
            <div className="relative">
              <div className="absolute -inset-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg blur-lg opacity-0 group-hover:opacity-75 transition duration-200"></div>
              <Image
                src="https://capydb.com/images/mainIcon.png"
                alt="CapyDB logo"
                width={32}
                height={32}
                className="relative"
              />
            </div>
            <span className="ml-3 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">CapyDB</span>
          </Link>
        </div>
        <nav className="p-6">
          {sidebarSections.map((section, idx) => (
            <div key={idx} className="mb-10">
              <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-4 ml-2 flex items-center">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></div>
                <span className="text-gray-700 dark:text-gray-200">{section.title}</span>
              </h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                        pathname === item.href
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300 font-medium shadow-sm border-l-2 border-amber-500 pl-3'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-amber-600 hover:pl-5 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-amber-300'
                      }`}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                    >
                      {item.icon}
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
        {/* Header bar with external links - keeping the modern design */}
        <div className="sticky top-0 z-20 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center px-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center h-full space-x-8">
              <Link 
                href="/"
                className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 relative ${
                  !isApiReference 
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 shadow-sm' 
                    : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50 dark:text-gray-300 dark:hover:text-amber-400 dark:hover:bg-amber-900/10'
                }`}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Documentation
                </span>
              </Link>
              <Link 
                href="/api-reference"
                className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 relative ${
                  isApiReference 
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 shadow-sm' 
                    : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50 dark:text-gray-300 dark:hover:text-amber-400 dark:hover:bg-amber-900/10'
                }`}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  API Reference
                </span>
              </Link>
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
        
        {/* Two-column layout with fixed widths */}
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content - takes 3/4 of the space on large screens */}
            <div className="lg:col-span-3">
              <div className="nextra-content bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-800">
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