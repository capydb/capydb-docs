import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import LanguageContent from './LanguageContent';
import LanguageToggle from './LanguageToggle';
import ApiCodeBlock from './ApiCodeBlock';
import Feedback from './Feedback';

const CopyButton = ({ code }: { code: string }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`
        absolute right-2 top-2
        px-2 py-1
        rounded
        text-sm
        font-medium
        transition-all
        duration-200
        ${isCopied 
          ? 'bg-green-500 text-white' 
          : 'bg-gray-700 hover:bg-gray-600 text-white'
        }
        z-10
      `}
    >
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  );
};

interface CalloutProps {
  children: React.ReactNode;
  type?: 'default' | 'info' | 'warning' | 'error';
}

const Callout = ({ children, type = 'default' }: CalloutProps) => {
  const styles = {
    default: 'bg-gray-100 border-gray-500 dark:bg-gray-800 dark:border-gray-600',
    info: 'bg-blue-50 border-blue-500 dark:bg-blue-900/30 dark:border-blue-400',
    warning: 'bg-yellow-50 border-yellow-500 dark:bg-yellow-900/30 dark:border-yellow-400',
    error: 'bg-red-50 border-red-500 dark:bg-red-900/30 dark:border-red-400',
  };

  return (
    <div className={`p-4 my-4 border-l-4 rounded-r-md ${styles[type]}`}>
      {children}
    </div>
  );
};

const CustomLink = ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  if (href?.startsWith('/') || href?.startsWith('#')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }
  
  if (href?.startsWith('http')) {
    return <a target="_blank" rel="noopener noreferrer" href={href} {...props} />;
  }
  
  return <a href={href} {...props} />;
};

const CustomCode = ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const match = /language-(\w+)/.exec(className || '');
  const code = String(children).replace(/\n$/, '');
  
  return match ? (
    <div className="my-4">
      <div className="relative">
        <CopyButton code={code} />
        <SyntaxHighlighter 
          language={match[1]}
          style={atomDark as any}
          showLineNumbers={false}
          PreTag="div"
          customStyle={{
            margin: 0,
            borderRadius: '0.75rem',
            backgroundColor: '#1a1a1a',
            padding: '2rem',
          }}
          {...props}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const MDXComponents = {
  wrapper: ({ children }: { children: React.ReactNode }) => <div className="mdx-wrapper">{children}</div>,
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold mt-8 mb-4" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-semibold mt-6 mb-3" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold mt-5 mb-2" {...props}>{children}</h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-xl font-semibold mt-4 mb-2" {...props}>{children}</h4>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4" {...props}>{children}</p>
  ),
  a: CustomLink,
  code: CustomCode,
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre {...props}>{children}</pre>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 my-4" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 my-4" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="my-1" {...props}>{children}</li>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4" {...props}>{children}</blockquote>
  ),
  table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <table className="w-full border-collapse my-4" {...props}>{children}</table>
  ),
  th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800" {...props}>{children}</th>
  ),
  td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2" {...props}>{children}</td>
  ),
  img: ({ src, alt, className }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      src={src || ''}
      alt={alt || ''}
      width={700}
      height={350}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  ),
  Callout,
  LanguageContent,
  LanguageToggle,
  ApiCodeBlock,
  Feedback,
};

export default MDXComponents; 