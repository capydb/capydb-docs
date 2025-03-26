'use client';
import DocLayout from '@/components/DocLayout';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';
import Feedback from '@/components/Feedback';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from 'next/link';
import CopyButton from '@/components/CopyButton';

export default function UpdatePage() {
  const pythonCode = `# Filter to match the document(s) to update
filter_criteria = {
    "name": "Alice Smith"
}

# Update operations to apply
update_operations = {
    "$set": {
        "age": 30,
        "email": "alice.smith@example.com"
    },
    "$inc": {
        "login_count": 1
    }
}

# Optional upsert parameter (default: False)
upsert = True

# Sending the request
response = collection.update(filter_criteria, update_operations, upsert)`;

  const typescriptCode = `// Filter to match the document(s) to update
const filter = {
  name: "Alice Smith",
};

// Update operations to apply
const update = {
  $set: {
    age: 30,
    email: "alice.smith@example.com",
  },
  $inc: {
    login_count: 1,
  },
};

// Optional upsert parameter (default: false)
const upsert = true;

const response = collection.update(filter, update, upsert);`;

  const jsonResponse = `{
  "matched_count": 1,
  "modified_count": 1,
  "upserted_id": null
}`;

  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Update</h1>
        
        <LanguageToggle />
        
        <p>
          CapyDB provides a flexible way to update documents in a collection using operations similar to MongoDB's update functionality. 
          You can use various update operators to modify fields, and optionally create new documents if no matches are found (upsert).
        </p>
        
        <h2>Update Operation</h2>
        
        <p>
          The <code>update</code> operation allows you to modify existing documents in a collection that match a specified filter. 
          You can use different update operators to perform various modifications on the matched documents.
        </p>
        
        <h3>Example Python Code for <code>update</code></h3>
        
        <p>Here's how you can update documents using Python, with various update operators and upsert option:</p>
        
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
        
        <h3>Update Response</h3>
        
        <p>
          A successful update operation will return a JSON response containing information about the operation's results. 
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
        
        <h2>Parameters for Update Operations</h2>
        
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
                A query object to match the documents to update. This works the same way as MongoDB filters, 
                allowing you to specify conditions to find the documents. For more details, refer to the 
                <Link href="/syntax/filter" className="text-blue-600 dark:text-blue-400 hover:underline"> filter operator syntax</Link>.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>update</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                An object containing update operators that specify the modifications to apply. For more details, refer to the 
                <Link href="/syntax/update" className="text-blue-600 dark:text-blue-400 hover:underline"> update operator syntax</Link>.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>upsert</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                A boolean value that, when set to <code>true</code>, creates a new document if no documents match the filter criteria. 
                Defaults to <code>false</code>.
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