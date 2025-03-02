'use client';
import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  children: string;
  className?: string;
  showLineNumbers?: boolean;
  [key: string]: any;
}

const CodeBlock = ({ children, className, showLineNumbers = true, ...props }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);
  
  // Extract language from className (format: "language-{lang}")
  const language = className?.replace(/language-/, '') || '';
  
  // Clean up the code string
  const code = children.trim();

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative group rounded-lg overflow-hidden">
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          className="!mt-0 !bg-gray-900 dark:!bg-gray-800 !rounded-lg"
          customStyle={{
            padding: '1rem',
            marginTop: 0,
            marginBottom: 0,
            background: '#1a1a1a',
          }}
          lineNumberStyle={{
            userSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            msUserSelect: 'none',
          }}
          {...props}
        >
          {code}
        </SyntaxHighlighter>

        <button
          onClick={copyToClipboard}
          className={`
            absolute right-2 top-2
            flex items-center justify-center
            h-8 w-8
            rounded-md
            transition-all duration-200
            ${isCopied 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
            }
            opacity-100 md:opacity-0 md:group-hover:opacity-100
            shadow-lg
            z-10
          `}
          aria-label="Copy code"
        >
          {isCopied ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeBlock; 