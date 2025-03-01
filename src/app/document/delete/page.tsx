import DocLayout from '@/components/DocLayout';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';
import Feedback from '@/components/Feedback';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from 'next/link';

export default function DeletePage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Delete</h1>
        
        <LanguageToggle />
        
        <p>
          CapybaraDB supports deletion of documents using operations similar to MongoDB. 
          You can delete one or multiple documents by specifying filters. 
          This guide explains how to perform delete operations.
        </p>
        
        <h2>Delete Operation</h2>
        
        <p>
          The <code>delete</code> operation is used to delete one or multiple documents in a collection based on a filter.
        </p>
        
        <h3>Example Python Code for <code>delete</code></h3>
        
        <p>Here's how you can delete documents by applying a filter:</p>
        
        <LanguageContent language="python">
          <SyntaxHighlighter language="python" style={atomDark} showLineNumbers>
            {`# Filter to match the document(s) to delete
filter_criteria = {
    "email": "johndoe@example.com"
}

response = collection.delete(filter_criteria)`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <SyntaxHighlighter language="typescript" style={atomDark} showLineNumbers>
            {`// Filter to match the document(s) to delete
const filter_criteria = {
  email: "johndoe@example.com",
};

response = collection.delete(filter_criteria);`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <h3>Delete Response</h3>
        
        <p>A successful delete operation will return a JSON response indicating the number of deleted documents:</p>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "deleted_count": 1 // the count of deleted documents
}`}
        </SyntaxHighlighter>
        
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
                where you specify conditions to find the documents that need to be deleted. For more details, refer to the 
                <Link href="/syntax/filter" className="text-blue-600 dark:text-blue-400 hover:underline"> filter operator syntax</Link>.
              </td>
            </tr>
          </tbody>
        </table>
        
        <h3>How can we improve this documentation?</h3>
        
        <Feedback />
        
        <h3>Got question? <a href="mailto:hello@capybaradb.co" className="text-blue-600 dark:text-blue-400 hover:underline">Email us</a></h3>
      </div>
    </DocLayout>
  );
} 