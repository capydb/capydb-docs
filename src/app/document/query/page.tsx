'use client';
import DocLayout from '@/components/DocLayout';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';
import Feedback from '@/components/Feedback';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from 'next/link';
import CopyButton from '@/components/CopyButton';

export default function QueryPage() {
  const pythonCode = `# Query to find documents with age greater than 25
query = {
    "age": {"$gt": 25}
}

# Optional projection to include only specific fields
projection = {
    "name": 1,
    "age": 1,
    "_id": 0  # Exclude _id
}

# Optional sort order
sort = {
    "age": -1  # Sort by age in descending order
}

# Optional pagination parameters
limit = 5
skip = 0

# Sending the request
response = collection.query(query, projection, sort, limit, skip)`;

  const typescriptCode = `// Query to find documents with age greater than 25
const query = {
  age: { $gt: 25 },
};

// Optional projection to include only specific fields
const projection = {
  name: 1,
  age: 1,
  _id: 0, // Exclude _id
};

// Optional sort order
const sort = {
  age: -1, // Sort by age in descending order
};

// Optional pagination parameters
const limit = 5;
const skip = 0;

const response = collection.query(query, projection, sort, limit, skip);`;

  const jsonResponse = `{
  "docs": [
    {
      "name": "Alice Smith",
      "age": 29
    },
    {
      "name": "Bob Johnson",
      "age": 40
    }
  ]
}`;

  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Query</h1>
        
        <LanguageToggle />
        
        <p>
          CapyDB provides a powerful query interface similar to MongoDB's query functionality. 
          You can use various query operators to find documents, project specific fields, sort results, and implement pagination.
        </p>
        
        <h2>Query Operation</h2>
        
        <p>
          The <code>query</code> operation allows you to search for documents in a collection using query operators. 
          You can also specify projection fields, sort order, and pagination parameters.
        </p>
        
        <h3>Example Python Code for <code>query</code></h3>
        
        <p>Here's how you can query documents using Python, with various query operators and options:</p>
        
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
        
        <h3>Query Response</h3>
        
        <p>
          A successful query operation will return a JSON response containing the matching documents. 
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
        
        <h2>Parameters for Query Operations</h2>
        
        <table className="w-full border-collapse my-4">
          <thead>
            <tr>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Parameter</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>query</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                A query object to match the documents to retrieve. This works the same way as MongoDB queries, 
                allowing you to specify conditions to find the documents. For more details, refer to the 
                <Link href="/syntax/query" className="text-blue-600 dark:text-blue-400 hover:underline"> query operator syntax</Link>.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>projection</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                A field specification object to control which fields are returned in the result set. 
                Use <code>1</code> to include and <code>0</code> to exclude fields. For more details, refer to the 
                <Link href="/syntax/projection" className="text-blue-600 dark:text-blue-400 hover:underline"> projection operator syntax</Link>.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>sort</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                An object specifying the sort order for the result set (e.g., <code>{`{ "age": 1 }`}</code> to sort by <code>age</code> in ascending order, 
                or <code>{`{ "age": -1 }`}</code> for descending).
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>limit</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                A number to limit the number of documents returned.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>skip</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                A number to skip the first <code>n</code> documents in the result set, useful for pagination.
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