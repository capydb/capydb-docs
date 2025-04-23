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
                <code {...rest}>{children}</code>
              );
            }
            return <code {...rest}>{children}</code>;
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <style jsx global>{``}</style>
    </div>
  );
};

export default CodeBlock; 