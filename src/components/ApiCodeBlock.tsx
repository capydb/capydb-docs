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

  // Custom syntax highlighter theme with only layout customizations
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
      boxShadow: 'none',
      textShadow: 'none',
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: 'none',
      textShadow: 'none',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg">
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