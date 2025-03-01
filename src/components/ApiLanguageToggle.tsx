"use client";
import { useApiLanguage } from "../context/ApiLanguageContext";

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
              ? 'bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
          }`}
          aria-current={language === 'python' ? 'page' : undefined}
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
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
            <path d="M10 13l-1 2l1 2" />
            <path d="M14 13l1 2l-1 2" />
          </svg>
          Python
        </button>

        <button
          onClick={() => setLanguage('javascript')}
          className={`px-3 py-1.5 rounded-md transition-all duration-200 flex items-center ${
            language === 'javascript'
              ? 'bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
          }`}
          aria-current={language === 'javascript' ? 'page' : undefined}
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
            <path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z" />
            <path d="M7.5 8h3v8l-2 -1" />
            <path d="M16.5 8h-2.5a0.5 0.5 0 0 0 -0.5 0.5v3a0.5 0.5 0 0 0 0.5 0.5h1.5a0.5 0.5 0 0 1 0.5 0.5v3a0.5 0.5 0 0 1 -0.5 0.5h-2.5" />
          </svg>
          JavaScript
        </button>
      </div>
    </div>
  );
} 