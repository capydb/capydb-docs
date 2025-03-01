import DocLayout from '@/components/DocLayout';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';
import Feedback from '@/components/Feedback';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from 'next/link';

export default function UpdatePage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Update</h1>
        
        <LanguageToggle />
        
        <p>
          CapybaraDB allows updating documents using operations that are similar to MongoDB. 
          You can update one or multiple documents by specifying filters, update fields, and an optional upsert parameter. 
          This guide explains how to perform update operations.
        </p>
        
        <h2>Update Operation</h2>
        
        <p>
          The <code>update</code> operation is used to update one or multiple documents in a collection based on a filter.
        </p>
        
        <h3>Example Python Code for <code>update</code></h3>
        
        <p>
          Here's how you can update documents by applying a filter and an update operation. 
          This example is designed to be similar to the insertion example, showing how you can seamlessly 
          transition from inserting to updating documents in CapybaraDB:
        </p>
        
        <LanguageContent language="python">
          <SyntaxHighlighter language="python" style={atomDark} showLineNumbers>
            {`# Filter to match the document(s) based on email (similar to the insert example)
filter_criteria = {
    "email": "johndoe@example.com"
}

# Update operation (e.g., updating the 'age' field and modifying bio)
update = {
    "$set": {
        "age": 31,
        "bio": EmbText("John is now an experienced AI specialist with updated skills.")
    }
}

# Optional upsert (set to true if you want to insert a new document if no match is found)
upsert = False

response = collection.update(update, filter_criteria, upsert)`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <SyntaxHighlighter language="typescript" style={atomDark} showLineNumbers>
            {`const filter_criteria = {
  email: "johndoe@example.com",
};

// Update operation (e.g., updating the 'age' field and modifying bio)
const update = {
  $set: {
    age: 31,
    bio: new EmbText(
      "John is now an experienced AI specialist with updated skills."
    ),
  },
};

// Optional upsert (set to true if you want to insert a new document if no match is found)
const upsert = false;

response = collection.update(update, filter_criteria, upsert);`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <h3>Update Response</h3>
        
        <p>
          A successful update operation will return a JSON response indicating the number of matched and modified documents, 
          and whether an upsert was performed:
        </p>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "matched_count": 1,
  "modified_count": 1,
  "upserted_id": null,
  "task_id": "abc123xyz"
}`}
        </SyntaxHighlighter>
        
        <p>
          If the <code>update</code> object contains <code>EmbJSON</code> data type, the response will include a <code>task_id</code> 
          indicating an asynchronous task is in progress. If no asynchronous processing is required, <code>task_id</code> will be <code>null</code>.
        </p>
        
        <p>
          If an upsert was performed, the <code>upserted_id</code> will contain the ID of the new document.
        </p>
        
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
                where you specify conditions to find the documents that need updating. For more details, refer to the 
                <Link href="/syntax/filter" className="text-blue-600 dark:text-blue-400 hover:underline"> filter operator syntax</Link>.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>update</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                The update operations to apply to the matched documents. You can use MongoDB-like update operators such as 
                <code>$set</code>, <code>$inc</code>, etc. For a full list of update operators, refer to the 
                <Link href="/syntax/update" className="text-blue-600 dark:text-blue-400 hover:underline"> update operator syntax</Link>.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>upsert</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                (Optional) A boolean flag to create a new document if no documents match the filter. 
                If set to <code>true</code>, a new document will be created using the <code>filter</code> and <code>update</code> information.
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