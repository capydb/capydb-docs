'use client';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ApiLanguageToggle from './ApiLanguageToggle';
import ApiLanguageContent from './ApiLanguageContent';
import { useApiLanguage } from '../context/ApiLanguageContext';

interface ApiCodeBlockProps {
  curl: string;
  python: string;
  javascript: string;
  showLineNumbers?: boolean;
}

const ApiCodeBlock: React.FC<ApiCodeBlockProps> = ({
  curl,
  python,
  javascript,
  showLineNumbers = false,
}) => {
  const { language } = useApiLanguage();

  // Custom syntax highlighter theme
  const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: '#1a1a1a',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      margin: '0',
      overflow: 'auto',
      fontSize: '0.9rem',
      lineHeight: '1.5',
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: 'none',
      textShadow: 'none',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    comment: {
      ...vscDarkPlus.comment,
      color: '#6b7280',
    },
    string: {
      ...vscDarkPlus.string,
      color: '#f59e0b', // amber-500
    },
    keyword: {
      ...vscDarkPlus.keyword,
      color: '#d97706', // amber-600
    },
    function: {
      ...vscDarkPlus.function,
      color: '#fbbf24', // amber-400
    },
    punctuation: {
      ...vscDarkPlus.punctuation,
      color: '#94a3b8', // slate-400
    },
    operator: {
      ...vscDarkPlus.operator,
      color: '#cbd5e1', // slate-300
    },
  };

  return (
    <div className="my-6 overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <ApiLanguageToggle />
      <div className="relative">
        <ApiLanguageContent language="curl">
          <SyntaxHighlighter
            language="bash"
            style={customStyle}
            showLineNumbers={showLineNumbers}
            wrapLines={true}
            wrapLongLines={false}
          >
            {curl}
          </SyntaxHighlighter>
        </ApiLanguageContent>

        <ApiLanguageContent language="python">
          <SyntaxHighlighter
            language="python"
            style={customStyle}
            showLineNumbers={showLineNumbers}
            wrapLines={true}
            wrapLongLines={false}
          >
            {python}
          </SyntaxHighlighter>
        </ApiLanguageContent>

        <ApiLanguageContent language="javascript">
          <SyntaxHighlighter
            language="javascript"
            style={customStyle}
            showLineNumbers={showLineNumbers}
            wrapLines={true}
            wrapLongLines={false}
          >
            {javascript}
          </SyntaxHighlighter>
        </ApiLanguageContent>
      </div>
    </div>
  );
};

export default ApiCodeBlock; 