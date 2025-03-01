import DocLayout from '@/components/DocLayout';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function InsertDocumentsPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Insert Documents</h1>
        
        <div className="flex items-center mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono mr-2">POST</span>
          <code className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded break-all">/v0/db/{'{db_id}'}/collection/{'{collection_name}'}/document</code>
        </div>
        
        <p>
          Inserts one or more documents into a collection. Documents can contain standard JSON types as well as CapybaraDB's special EmbJSON types for embedding text and images.
        </p>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> The <code>db_id</code> refers to the combined identifier of your project and database in the format <code>project_id_database_name</code> (using an underscore as the separator).
        </div>
        
        <h2>Authentication</h2>
        
        <p>
          This endpoint requires authentication with a valid API key that has write permissions.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code>
            Authorization: Bearer YOUR_API_KEY
          </code>
        </div>
        
        <h2>Request</h2>
        
        <h3>Request Body</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "documents": [
    {
      "title": "Example Document",
      "content": {
        "$embText": "This is an example document with embedded text that will be vectorized."
      },
      "tags": ["example", "documentation"],
      "metadata": {
        "author": "Jane Doe",
        "created_at": "2023-06-15T10:30:00Z"
      }
    }
  ]
}`}
        </SyntaxHighlighter>
        
        <h3>Request Parameters</h3>
        
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Parameter</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Required</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">documents</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">array</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Array of documents to insert</td>
            </tr>
          </tbody>
        </table>
        
        <h3>Document Structure</h3>
        
        <p>
          Documents in CapybaraDB are JSON objects with the following characteristics:
        </p>
        
        <ul>
          <li>Each document can have a unique ID (automatically generated if not provided)</li>
          <li>Documents can contain nested objects and arrays</li>
          <li>Documents can include special EmbJSON types for embedding text and images</li>
          <li>There is no fixed schema - different documents in the same collection can have different fields</li>
        </ul>
        
        <h3>EmbJSON Types</h3>
        
        <p>
          CapybaraDB extends standard JSON with special types for embedding and vector operations:
        </p>
        
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">JSON Representation</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">EmbText</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"$embText": "text content"}`}</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Text that will be embedded for semantic search</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">EmbImage</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"$embImage": "https://example.com/image.jpg"}`}</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Image URL that will be embedded for visual search</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Response</h2>
        
        <h3>Success Response (200 OK)</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "success",
  "data": {
    "inserted_count": 1,
    "documents": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Example Document",
        "content": {
          "$embText": "This is an example document with embedded text that will be vectorized."
        },
        "tags": ["example", "documentation"],
        "metadata": {
          "author": "Jane Doe",
          "created_at": "2023-06-15T10:30:00Z"
        }
      }
    ]
  }
}`}
        </SyntaxHighlighter>
        
        <h3>Response Fields</h3>
        
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Field</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">status</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The status of the request ("success" or "error")</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.inserted_count</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">integer</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Number of documents successfully inserted</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.documents</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">array</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Array of inserted documents, including generated IDs</td>
            </tr>
          </tbody>
        </table>
        
        <h3>Error Responses</h3>
        
        <h4>400 Bad Request</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "error",
  "code": 400,
  "message": "Invalid document format"
}`}
        </SyntaxHighlighter>
        
        <h4>401 Unauthorized</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "error",
  "code": 401,
  "message": "Invalid API key provided"
}`}
        </SyntaxHighlighter>
        
        <h4>404 Not Found</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "error",
  "code": 404,
  "message": "Collection 'my_collection' not found"
}`}
        </SyntaxHighlighter>
        
        <h2>Example</h2>
        
        <h3>Example Request</h3>
        
        <SyntaxHighlighter language="bash" style={atomDark} showLineNumbers>
          {`curl -X POST \\
  https://api.capybaradb.co/v0/db/project_id_database_name/collection/my_collection/document \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "documents": [
      {
        "title": "Example Document",
        "content": {
          "$embText": "This is an example document with embedded text that will be vectorized."
        },
        "tags": ["example", "documentation"]
      }
    ]
  }'`}
        </SyntaxHighlighter>
        
        <h3>Example Response</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "success",
  "data": {
    "inserted_count": 1,
    "documents": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Example Document",
        "content": {
          "$embText": "This is an example document with embedded text that will be vectorized."
        },
        "tags": ["example", "documentation"]
      }
    ]
  }
}`}
        </SyntaxHighlighter>
        
        <h2>Related Operations</h2>
        
        <ul>
          <li>
            <Link href="/api-reference/documents/find" className="text-blue-600 dark:text-blue-400 hover:underline">
              Find Documents
            </Link> - Find documents based on filters
          </li>
          <li>
            <Link href="/api-reference/documents/query" className="text-blue-600 dark:text-blue-400 hover:underline">
              Query Documents
            </Link> - Perform semantic search on documents
          </li>
          <li>
            <Link href="/api-reference/documents/update" className="text-blue-600 dark:text-blue-400 hover:underline">
              Update Documents
            </Link> - Update documents based on filters
          </li>
          <li>
            <Link href="/api-reference/documents/delete" className="text-blue-600 dark:text-blue-400 hover:underline">
              Delete Documents
            </Link> - Delete documents based on filters
          </li>
        </ul>
      </div>
    </DocLayout>
  );
} 