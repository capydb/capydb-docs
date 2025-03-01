"use client";
import { useApiLanguage } from "../context/ApiLanguageContext";
import Image from "next/image";

export default function ApiLanguageToggle() {
  const { language, setLanguage } = useApiLanguage();

  return (
    <div className="flex items-center bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
      <div className="flex space-x-1 text-sm font-medium">
        <button
          onClick={() => setLanguage('curl')}
          className={`px-3 py-1.5 rounded-md transition-all duration-200 flex items-center ${
            language === 'curl'
              ? 'bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
          }`}
          aria-current={language === 'curl' ? 'page' : undefined}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-4 h-4 mr-1.5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
          curl
        </button>

        <button
          onClick={() => setLanguage('python')}
          className={`px-3 py-1.5 rounded-md transition-all duration-200 flex items-center ${
            language === 'python'
              ? 'bg-white dark:bg-gray-800 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
          }`}
          aria-current={language === 'python' ? 'page' : undefined}
        >
          <div className="w-4 h-4 mr-1.5 flex items-center justify-center overflow-visible">
            <Image 
              src="/images/python.svg" 
              alt="Python" 
              width={16} 
              height={16} 
              style={{ objectFit: 'contain', borderRadius: 0 }}
            />
          </div>
          Python
        </button>

        <button
          onClick={() => setLanguage('javascript')}
          className={`px-3 py-1.5 rounded-md transition-all duration-200 flex items-center ${
            language === 'javascript'
              ? 'bg-white dark:bg-gray-800 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
          }`}
          aria-current={language === 'javascript' ? 'page' : undefined}
        >
          <div className="w-4 h-4 mr-1.5 flex items-center justify-center overflow-visible">
            <Image 
              src="/images/javascript.svg" 
              alt="JavaScript" 
              width={16} 
              height={16} 
              style={{ objectFit: 'contain', borderRadius: 0 }}
            />
          </div>
          JavaScript
        </button>
      </div>
    </div>
  );
} 