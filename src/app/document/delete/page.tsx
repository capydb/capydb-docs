'use client';
import DocLayout from '@/components/DocLayout';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';
import Feedback from '@/components/Feedback';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from 'next/link';
import CopyButton from '@/components/CopyButton';

export default function DeletePage() {
  const pythonCode = `# Filter to match the document(s) to delete
filter_criteria = {
    "name": "Alice Smith"
}

# Sending the request
response = collection.delete(filter_criteria)`;

  const typescriptCode = `// Filter to match the document(s) to delete
const filter = {
  name: "Alice Smith",
};

const response = collection.delete(filter);`;

  const jsonResponse = `{
  "deleted_count": 1
}`;

  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Delete</h1>
        
        <LanguageToggle />
        
        <p>
          CapyDB provides a straightforward way to delete documents from a collection using operations similar to MongoDB's delete functionality. 
          You can delete one or multiple documents that match a specified filter.
        </p>
        
        <h2>Delete Operation</h2>
        
        <p>
          The <code>delete</code> operation allows you to remove documents from a collection that match a specified filter. 
          This operation is permanent and cannot be undone.
        </p>
        
        <h3>Example Python Code for <code>delete</code></h3>
        
        <p>Here's how you can delete documents using Python:</p>
        
        <LanguageContent language="python">
          <div className="relative">
            <CopyButton code={pythonCode} />
            <SyntaxHighlighter 
              language="python" 
              style={atomDark}
              showLineNumbers={false}
              customStyle={{
                margin: 0,
                borderRadius: '0.75rem',
                background: '#1a1a1a',
                padding: '2rem',
              }}
            >
              {pythonCode}
            </SyntaxHighlighter>
          </div>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <div className="relative">
            <CopyButton code={typescriptCode} />
            <SyntaxHighlighter 
              language="typescript" 
              style={atomDark}
              showLineNumbers={false}
              customStyle={{
                margin: 0,
                borderRadius: '0.75rem',
                background: '#1a1a1a',
                padding: '2rem',
              }}
            >
              {typescriptCode}
            </SyntaxHighlighter>
          </div>
        </LanguageContent>
        
        <h3>Delete Response</h3>
        
        <p>
          A successful delete operation will return a JSON response containing information about the number of documents deleted. 
          Here's an example response:
        </p>
        
        <div className="relative">
          <CopyButton code={jsonResponse} />
          <SyntaxHighlighter 
            language="json" 
            style={atomDark}
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              borderRadius: '0.75rem',
              background: '#1a1a1a',
              padding: '2rem',
            }}
          >
            {jsonResponse}
          </SyntaxHighlighter>
        </div>
        
        <h2>Parameters for Delete Operations</h2>
        
        <table className="w-full border-collapse my-4">
          <thead>
            <tr>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Parameter</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>filter</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                A query object to match the documents to delete. This works the same way as MongoDB filters, 
                allowing you to specify conditions to find the documents. For more details, refer to the 
                <Link href="/syntax/filter" className="text-blue-600 dark:text-blue-400 hover:underline"> filter operator syntax</Link>.
              </td>
            </tr>
          </tbody>
        </table>
        
        <h3>How can we improve this documentation?</h3>
        
        <Feedback />
        
        <h3>Got question? <a href="mailto:hello@capydb.com" className="text-blue-600 dark:text-blue-400 hover:underline">Email us</a></h3>
      </div>
    </DocLayout>
  );
} 