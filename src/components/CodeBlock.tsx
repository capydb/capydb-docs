'use client';

import React, { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {  atomDark, prism, tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CopyButton from './CopyButton';
import { useTheme } from '@/context/ThemeContext';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'python',
}) => {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (theme === 'system') {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
      
      // Add listener for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    } else {
      setIsDarkMode(theme === 'dark');
    }
  }, [theme]);
  
  // Apply special markers to our terms
  const prepareCode = (code: string) => {
    // Add special markers that will be rendered as spans with classes after highlighting
    return code
      .replace(/EmbText/g, '___CAPYDB_EMBTEXT___')
      .replace(/EmbImage/g, '___CAPYDB_EMBIMAGE___');
  };
  
  // Process the HTML after syntax highlighting to add our custom class
  const postProcess = (html: string) => {
    return html
      .replace(/___CAPYDB_EMBTEXT___/g, '<span class="capydb-highlight">EmbText</span>')
      .replace(/___CAPYDB_EMBIMAGE___/g, '<span class="capydb-highlight">EmbImage</span>');
  };

  return (
    <div className="relative">
      <CopyButton code={code} />
      <div className="custom-code-block">
        <SyntaxHighlighter 
          language={language}
          style={isDarkMode ? tomorrow : prism}
          customStyle={{
            borderRadius: '0.75rem',
            padding: '2rem',
            fontSize: '0.75rem'
          }}
          PreTag={({ children, ...rest }) => (
            <pre {...rest}>{children}</pre>
          )}
          CodeTag={({ children, ...rest }) => {
            if (typeof children === 'string') {
              return (
                <code
                  {...rest}
                  dangerouslySetInnerHTML={{
                    __html: postProcess(children)
                  }}
                />
              );
            }
            return <code {...rest}>{children}</code>;
          }}
        >
          {prepareCode(code)}
        </SyntaxHighlighter>
      </div>
      <style jsx global>{`
        .custom-code-block .capydb-highlight {
          color: ${isDarkMode ? '#ff79c6' : '#d73a49'} !important;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default CodeBlock; 