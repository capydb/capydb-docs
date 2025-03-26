import DocLayout from '@/components/DocLayout';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ApiCodeBlock from '@/components/ApiCodeBlock';
import Feedback from '@/components/Feedback';

export default function QueryDocumentsPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Query Documents</h1>
        
        <div className="flex items-center mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono mr-2">POST</span>
          <code className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded break-all">/v0/db/{'{db_id}'}/collection/{'{collection_name}'}/document/query</code>
        </div>
        
        <p>
          Performs semantic search on documents in a collection. This endpoint allows you to find documents that are semantically similar to a query text, with options for filtering and limiting results.
        </p>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> The <code>db_id</code> refers to the combined identifier of your project and database in the format <code>project_id_database_name</code> (using an underscore as the separator).
        </div>
        
        <h2>Authentication</h2>
        
        <p>
          This endpoint requires authentication with a valid API key that has read permissions.
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
  "query": "How to implement vector search?",
  "filter": {"category": "AI", "published": true},
  "projection": {
    "title": 1,
    "content": 1
  },
  "embedding_model": "text-embedding-3-small",
  "top_k": 5,
  "include_values": true
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">query</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The text query to search for semantically similar content</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">filter</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">object</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">MongoDB-style query filter to apply to documents before semantic search</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">projection</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">object</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Fields to include (1) or exclude (0) in the returned documents</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">embedding_model</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The embedding model to use for the query (default: "text-embedding-3-small")</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">top_k</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">integer</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Maximum number of matches to return (default: 10)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">include_values</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">boolean</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Whether to include the matching text chunks in the response (default: true)</td>
            </tr>
          </tbody>
        </table>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <p>
            The query operation searches for semantic matches in documents that contain <code>EmbText</code> or <code>EmbImage</code> fields. These special types enable powerful natural language search capabilities.
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
    "matches": [
      {
        "chunk": "This guide explains how to implement vector search in your application using embedding models...",
        "path": "content",
        "chunk_n": 0,
        "score": 0.92,
        "document": {
          "_id": "507f1f77bcf86cd799439011",
          "title": "Vector Search Implementation Guide",
          "content": {
            "@embText": {
              "text": "This guide explains how to implement vector search in your application using embedding models...",
              "emb_model": "text-embedding-3-small",
              "chunks": ["This guide explains how to implement vector search in your application using embedding models..."]
            }
          }
        }
      },
      {
        "chunk": "Learn how to build a semantic search engine using vector embeddings and similarity metrics...",
        "path": "content",
        "chunk_n": 0,
        "score": 0.85,
        "document": {
          "_id": "507f1f77bcf86cd799439013",
          "title": "Semantic Search Tutorial",
          "content": {
            "@embText": {
              "text": "Learn how to build a semantic search engine using vector embeddings and similarity metrics...",
              "emb_model": "text-embedding-3-small",
              "chunks": ["Learn how to build a semantic search engine using vector embeddings and similarity metrics..."]
            }
          }
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.matches</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">array</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Array of matches, sorted by relevance (highest score first)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.matches[].chunk</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The text chunk that matched the query</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.matches[].path</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The document field path where the match was found</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.matches[].chunk_n</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">integer</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The index of the chunk within the field</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.matches[].score</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">number</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The similarity score (0-1) indicating how well the chunk matches the query</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.matches[].document</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">object</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The full document containing the match</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Code Examples</h2>
        
        <ApiCodeBlock
          curl={`curl -X POST \\
  https://api.capydb.com/v0/db/project_id_database_name/collection/my_collection/document/query \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "How to implement vector search?",
    "top_k": 5,
    "embedding_model": "text-embedding-3-small",
    "include_values": true
  }'`}
          python={`import requests
import json

# API endpoint
url = "https://api.capydb.com/v0/db/project_id_database_name/collection/my_collection/document/query"

# Headers
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

# Request body
data = {
    "query": "How to implement vector search?",
    "embedding_model": "text-embedding-3-small",
    "top_k": 5,
    "include_values": True
}

# Make the request
response = requests.post(url, headers=headers, json=data)

# Process the response
if response.status_code == 200:
    result = response.json()
    matches = result["data"]["matches"]
    
    # Process the matches
    for match in matches:
        print(f"Score: {match['score']}")
        print(f"Matching text: {match['chunk']}")
        print(f"Document ID: {match['document']['_id']}")
        print("---")
else:
    print(f"Error: {response.status_code}")
    print(response.text)`}
          javascript={`// API endpoint
const url = 'https://api.capydb.com/v0/db/project_id_database_name/collection/my_collection/document/query';

// Headers
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};

// Request body
const data = {
  query: 'How to implement vector search?',
  embedding_model: 'text-embedding-3-small',
  top_k: 5,
  include_values: true
};

// Make the request
fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    const matches = result.data.matches;
    
    // Process the matches
    matches.forEach(match => {
      console.log('Score:', match.score);
      console.log('Matching text:', match.chunk);
      console.log('Document ID:', match.document._id);
      console.log('---');
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });`}
        />
        
        <ul>
          <li>
            <Link href="/api-reference/documents/find" className="text-blue-600 dark:text-blue-400 hover:underline">
              Find Documents
            </Link> - Find documents based on filters
          </li>
          <li>
            <Link href="/api-reference/embjson" className="text-blue-600 dark:text-blue-400 hover:underline">
              EmbJSON Types
            </Link> - Learn about EmbText and EmbImage types
          </li>
        </ul>
        
        <Feedback />
      </div>
    </DocLayout>
  );
} 