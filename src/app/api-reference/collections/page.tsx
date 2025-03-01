import DocLayout from '@/components/DocLayout';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from 'next/link';

export default function CollectionsApiPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Collections API</h1>
        
        <p>
          Collections in CapybaraDB are containers for documents. This API reference covers operations for 
          managing collections within a database.
        </p>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> All collection operations require authentication with a valid API key.
        </div>
        
        <h2>Collection Structure</h2>
        
        <p>
          A collection in CapybaraDB has the following properties:
        </p>
        
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Property</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">name</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The name of the collection</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">created_at</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">timestamp</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">When the collection was created</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">document_count</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">integer</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The number of documents in the collection</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">embedding_models</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">array</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">List of embedding models used in the collection</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Collection Naming Rules</h2>
        
        <p>
          Collection names must follow these rules:
        </p>
        
        <ul>
          <li>Must be between 1 and 64 characters long</li>
          <li>Can only contain alphanumeric characters, underscores, and hyphens</li>
          <li>Cannot start with a number or hyphen</li>
          <li>Must be unique within a database</li>
        </ul>
        
        <h2>API Endpoints</h2>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> In all API endpoints, <code>db_id</code> refers to the combined identifier of your project and database in the format <code>project_id_database_name</code> (using an underscore as the separator).
        </div>
        
        <h3 id="create-collection">Create a Collection</h3>
        
        <p>
          Creates a new collection in the specified database.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code>
            POST /v0/db/{'{db_id}'}/collection
          </code>
        </div>
        
        <h4>Request Body</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "name": "my_collection"
}`}
        </SyntaxHighlighter>
        
        <h4>Response</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "success",
  "data": {
    "name": "my_collection",
    "created_at": "2023-06-15T10:30:00Z",
    "document_count": 0,
    "embedding_models": []
  }
}`}
        </SyntaxHighlighter>
        
        <h4>Example Request</h4>
        
        <SyntaxHighlighter language="bash" style={atomDark} showLineNumbers>
          {`curl -X POST \\
  https://api.capybaradb.co/v0/db/project_id_database_name/collection \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "my_collection"
  }'`}
        </SyntaxHighlighter>
        
        <h3 id="list-collections">List Collections</h3>
        
        <p>
          Lists all collections in the specified database.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code>
            GET /v0/db/{'{db_id}'}/collection
          </code>
        </div>
        
        <h4>Response</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "success",
  "data": [
    {
      "name": "my_collection",
      "created_at": "2023-06-15T10:30:00Z",
      "document_count": 42,
      "embedding_models": ["text-embedding-ada-002"]
    },
    {
      "name": "another_collection",
      "created_at": "2023-06-16T14:20:00Z",
      "document_count": 17,
      "embedding_models": ["text-embedding-ada-002", "clip"]
    }
  ]
}`}
        </SyntaxHighlighter>
        
        <h4>Example Request</h4>
        
        <SyntaxHighlighter language="bash" style={atomDark} showLineNumbers>
          {`curl -X GET \\
  https://api.capybaradb.co/v0/db/project_id_database_name/collection \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
        </SyntaxHighlighter>
        
        <h3 id="get-collection">Get Collection</h3>
        
        <p>
          Retrieves information about a specific collection.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code>
            GET /v0/db/{'{db_id}'}/collection/{'{collection_name}'}
          </code>
        </div>
        
        <h4>Response</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "success",
  "data": {
    "name": "my_collection",
    "created_at": "2023-06-15T10:30:00Z",
    "document_count": 42,
    "embedding_models": ["text-embedding-ada-002"]
  }
}`}
        </SyntaxHighlighter>
        
        <h4>Example Request</h4>
        
        <SyntaxHighlighter language="bash" style={atomDark} showLineNumbers>
          {`curl -X GET \\
  https://api.capybaradb.co/v0/db/project_id_database_name/collection/my_collection \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
        </SyntaxHighlighter>
        
        <h3 id="delete-collection">Delete Collection</h3>
        
        <p>
          Deletes a collection and all its documents.
        </p>
        
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-md my-4 text-red-800 dark:text-red-200">
          <strong>Warning:</strong> This operation is irreversible. All documents in the collection will be permanently deleted.
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code>
            DELETE /v0/db/{'{db_id}'}/collection/{'{collection_name}'}
          </code>
        </div>
        
        <h4>Response</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "success",
  "message": "Collection 'my_collection' has been deleted"
}`}
        </SyntaxHighlighter>
        
        <h4>Example Request</h4>
        
        <SyntaxHighlighter language="bash" style={atomDark} showLineNumbers>
          {`curl -X DELETE \\
  https://api.capybaradb.co/v0/db/project_id_database_name/collection/my_collection \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
        </SyntaxHighlighter>
        
        <h2>Related Resources</h2>
        
        <ul>
          <li>
            <Link href="/api-reference/documents" className="text-blue-600 dark:text-blue-400 hover:underline">
              Documents API
            </Link> - Manage documents within collections
          </li>
        </ul>
      </div>
    </DocLayout>
  );
} 