import DocLayout from '@/components/DocLayout';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ApiCodeBlock from '@/components/ApiCodeBlock';
import Feedback from '@/components/Feedback';

export default function DeleteDocumentsPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Delete Documents</h1>
        
        <div className="flex items-center mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono mr-2">DELETE</span>
          <code className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded break-all">/v0/db/{'{db_id}'}/collection/{'{collection_name}'}/document</code>
        </div>
        
        <p>
          Deletes documents from a collection based on a filter. This endpoint allows you to remove documents that match specific criteria.
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
  "filter": {
    "status": "archived"
  }
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">filter</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">object</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">MongoDB-style query filter to select documents to delete</td>
            </tr>
          </tbody>
        </table>
        
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-md my-4 text-yellow-800 dark:text-yellow-200">
          <strong>Warning:</strong> If you provide an empty filter <code>{'{}'}</code>, all documents in the collection will be deleted. Use with caution.
        </div>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <p>
            When deleting documents that contain <code>EmbText</code> or <code>EmbImage</code> fields, all associated embeddings will also be removed from the vector index. For more information about EmbJSON types, please visit the <Link href="/api-reference/embjson" className="text-blue-600 dark:text-blue-400 hover:underline">EmbJSON Types</Link> documentation page.
          </p>
        </div>
        
        <h2>Response</h2>
        
        <h3>Success Response (200 OK)</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "success",
  "data": {
    "deleted_count": 3
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.deleted_count</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">integer</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Number of documents that were deleted</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Code Examples</h2>
        
        <ApiCodeBlock
          curl={`curl -X DELETE \\
  https://api.capydb.com/v0/db/project_id_database_name/collection/my_collection/document \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "filter": {
      "status": "archived"
    }
  }'`}
          python={`import requests
import json

# API endpoint
url = "https://api.capydb.com/v0/db/project_id_database_name/collection/my_collection/document"

# Headers
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

# Request body
data = {
    "filter": {
        "status": "archived"
    }
}

# Make the request
response = requests.delete(url, headers=headers, json=data)

# Process the response
if response.status_code == 200:
    result = response.json()
    print(f"Deleted count: {result['data']['deleted_count']}")
else:
    print(f"Error: {response.status_code}")
    print(response.text)`}
          javascript={`// API endpoint
const url = 'https://api.capydb.com/v0/db/project_id_database_name/collection/my_collection/document';

// Headers
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};

// Request body
const data = {
  filter: {
    status: 'archived'
  }
};

// Make the request
fetch(url, {
  method: 'DELETE',
  headers: headers,
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    console.log('Deleted count:', result.data.deleted_count);
  })
  .catch(error => {
    console.error('Error:', error);
  });`}
        />
        
        <Feedback />
      </div>
    </DocLayout>
  );
} 