'use client';
import { ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ApiLanguageToggle from './ApiLanguageToggle';
import ApiLanguageContent from './ApiLanguageContent';

interface ApiCodeBlockProps {
  curl: string;
  python: string;
  javascript: string;
  showLineNumbers?: boolean;
}

export default function ApiCodeBlock({ 
  curl, 
  python, 
  javascript, 
  showLineNumbers = true 
}: ApiCodeBlockProps) {
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <ApiLanguageToggle />
      <div className="bg-gray-900 p-0 m-0">
        <ApiLanguageContent language="curl">
          <SyntaxHighlighter
            language="bash"
            style={atomDark}
            showLineNumbers={showLineNumbers}
            customStyle={{ margin: 0, borderRadius: 0 }}
          >
            {curl}
          </SyntaxHighlighter>
        </ApiLanguageContent>
        
        <ApiLanguageContent language="python">
          <SyntaxHighlighter
            language="python"
            style={atomDark}
            showLineNumbers={showLineNumbers}
            customStyle={{ margin: 0, borderRadius: 0 }}
          >
            {python}
          </SyntaxHighlighter>
        </ApiLanguageContent>
        
        <ApiLanguageContent language="javascript">
          <SyntaxHighlighter
            language="javascript"
            style={atomDark}
            showLineNumbers={showLineNumbers}
            customStyle={{ margin: 0, borderRadius: 0 }}
          >
            {javascript}
          </SyntaxHighlighter>
        </ApiLanguageContent>
      </div>
    </div>
  );
} 