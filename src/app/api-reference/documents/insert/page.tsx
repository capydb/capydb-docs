import DocLayout from '@/components/DocLayout';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ApiCodeBlock from '@/components/ApiCodeBlock';
import Feedback from '@/components/Feedback';

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
          Inserts one or more documents into a collection. Documents can contain standard JSON types as well as CapyDB's special EmbJSON types for embedding text and images.
        </p>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> The <code>db_id</code> refers to the combined identifier of your project and database in the format <code>project_id_database_name</code> (using an underscore as the separator).
        </div>
        
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-md my-4 text-yellow-800 dark:text-yellow-200">
          <strong>Important:</strong> When inserting documents with <code>EmbText</code> or <code>EmbImage</code> fields, there may be a short delay before these fields are fully processed and available for semantic search. This is because the embedding process happens asynchronously in the background.
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
        "@embText": {
          "text": "This is an example document with embedded text that will be vectorized.",
          "emb_model": "text-embedding-3-small",
          "max_chunk_size": 200,
          "chunk_overlap": 20
        }
      },
      "image": {
        "@embImage": {
          "data": "base64_encoded_image_data",
          "vision_model": "gpt-4o",
          "emb_model": "text-embedding-3-small"
        }
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
          Documents in CapyDB are JSON objects with the following characteristics:
        </p>
        
        <ul>
          <li>Each document can have a unique ID (automatically generated if not provided)</li>
          <li>Documents can contain nested objects and arrays</li>
          <li>Documents can include special EmbJSON types for embedding text and images</li>
          <li>There is no fixed schema - different documents in the same collection can have different fields</li>
        </ul>
        
        <h3>EmbJSON Types</h3>
        
        <p>
          CapyDB extends standard JSON with special types for embedding and vector operations:
        </p>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <p>
            <strong>EmbText</strong> and <strong>EmbImage</strong> are special JSON types that enable semantic search capabilities in CapyDB. <code>EmbText</code> automatically chunks and embeds text, while <code>EmbImage</code> processes images with vision models for multimodal search.
          </p>
          <p className="mt-2">
            For detailed information about EmbJSON types, including parameters, supported models, and examples, please visit the <Link href="/api-reference/embjson" className="text-blue-600 dark:text-blue-400 hover:underline">EmbJSON Types</Link> documentation page.
          </p>
        </div>
        
        <h2>Response</h2>
        
        <h3>Success Response (200 OK)</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "success",
  "data": {
    "inserted_ids": ["507f1f77bcf86cd799439011"],
    "task_id": "task_123456789"
  }
}`}
        </SyntaxHighlighter>
        
        <p>
          <strong>Note:</strong> The <code>task_id</code> field is included when documents contain <code>EmbText</code> or <code>EmbImage</code> fields. 
          This ID can be used to track the status of the asynchronous embedding process.
        </p>
        
        <h3>Response Fields</h3>
        
        <table className="min-w-full border border-gray-300 dark:border-gray-700 my-4">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.inserted_ids</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">array</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Array of IDs for the inserted documents</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.task_id</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">ID of the asynchronous task for processing EmbText or EmbImage fields (included only when applicable)</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Code Examples</h2>
        
        <ApiCodeBlock
          curl={`curl -X POST \\
  https://api.capydb.com/v0/db/project_id_database_name/collection/my_collection/document \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "documents": [
      {
        "title": "Example Document",
        "content": {
          "@embText": {
            "text": "This is an example document with embedded text that will be vectorized.",
            "emb_model": "text-embedding-3-small",
            "max_chunk_size": 200,
            "chunk_overlap": 20
          }
        },
        "tags": ["example", "documentation"]
      }
    ]
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
    "documents": [
        {
            "title": "Example Document",
            "content": {
                "@embText": {
                    "text": "This is an example document with embedded text that will be vectorized.",
                    "emb_model": "text-embedding-3-small",
                    "max_chunk_size": 200,
                    "chunk_overlap": 20
                }
            },
            "tags": ["example", "documentation"]
        }
    ]
}

# Make the request
response = requests.post(url, headers=headers, json=data)

# Process the response
if response.status_code == 200:
    result = response.json()
    print(f"Inserted IDs: {result['data']['inserted_ids']}")
    if 'task_id' in result['data']:
        print(f"Task ID: {result['data']['task_id']}")
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
  documents: [
    {
      title: 'Example Document',
      content: {
        '@embText': {
          text: 'This is an example document with embedded text that will be vectorized.',
          emb_model: 'text-embedding-3-small',
          max_chunk_size: 200,
          chunk_overlap: 20
        }
      },
      tags: ['example', 'documentation']
    }
  ]
};

// Make the request
fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    console.log('Inserted IDs:', result.data.inserted_ids);
    if (result.data.task_id) {
      console.log('Task ID:', result.data.task_id);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });`}
        />
        
        <h2>Related Operations</h2>
        
        <ul>
          <li>
            <Link href="/api-reference/documents/find" className="text-blue-600 dark:text-blue-400 hover:underline">
              Find Documents
            </Link> - Retrieve documents based on filters
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
        
        <Feedback />
      </div>
    </DocLayout>
  );
} 