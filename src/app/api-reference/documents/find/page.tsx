import DocLayout from '@/components/DocLayout';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ApiCodeBlock from '@/components/ApiCodeBlock';
import Feedback from '@/components/Feedback';

export default function FindDocumentsPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Find Documents</h1>
        
        <div className="flex items-center mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono mr-2">POST</span>
          <code className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded break-all">/v0/db/{'{db_id}'}/collection/{'{collection_name}'}/document/find</code>
        </div>
        
        <p>
          Finds documents in a collection based on a filter. This endpoint allows you to retrieve documents that match specific criteria, with options for pagination, sorting, and field projection.
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
  "filter": {
    "tags": "example"
  },
  "projection": {
    "title": 1,
    "tags": 1
  },
  "sort": {
    "title": 1
  },
  "skip": 0,
  "limit": 10
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">MongoDB-style query filter to select documents</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">projection</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">object</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Fields to include (1) or exclude (0) in the results</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">sort</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">object</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Sort order for results (1 for ascending, -1 for descending)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">skip</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">integer</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Number of documents to skip (for pagination)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">limit</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">integer</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Maximum number of documents to return (default: 100)</td>
            </tr>
          </tbody>
        </table>
        
        <h2>MongoDB-Style Query Operators</h2>
        
        <p>
          CapyDB supports a subset of MongoDB query operators for filtering documents:
        </p>
        
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Operator</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>$eq</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Matches values equal to a specified value</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"field": {"$eq": "value"}}`}</code></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>$gt</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Matches values greater than a specified value</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"field": {"$gt": 100}}`}</code></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>$gte</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Matches values greater than or equal to a specified value</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"field": {"$gte": 100}}`}</code></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>$lt</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Matches values less than a specified value</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"field": {"$lt": 100}}`}</code></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>$lte</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Matches values less than or equal to a specified value</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"field": {"$lte": 100}}`}</code></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>$in</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Matches any of the values in an array</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"field": {"$in": ["value1", "value2"]}}`}</code></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>$nin</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Matches none of the values in an array</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"field": {"$nin": ["value1", "value2"]}}`}</code></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>$and</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Joins query clauses with a logical AND</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"$and": [{"field1": "value1"}, {"field2": "value2"}]}`}</code></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>$or</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Joins query clauses with a logical OR</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"$or": [{"field1": "value1"}, {"field2": "value2"}]}`}</code></td>
            </tr>
          </tbody>
        </table>
        
        <h2>Working with EmbJSON Fields</h2>
        
        <p>
          When working with documents that contain EmbJSON fields (EmbText or EmbImage), you can filter and project these fields like any other field.
        </p>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <p>
            <strong>EmbText</strong> and <strong>EmbImage</strong> are special JSON types that enable semantic search capabilities in CapyDB. When retrieving documents with these fields, you'll see their structure including metadata about chunking and embedding.
          </p>
          <p className="mt-2">
            For detailed information about EmbJSON types, including parameters, supported models, and examples, please visit the <Link href="/api-reference/embjson" className="text-blue-600 dark:text-blue-400 hover:underline">EmbJSON Types</Link> documentation page.
          </p>
        </div>
        
        <h3>Filter Examples</h3>
        
        <h4>Simple Equality Filter</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "filter": {
    "category": "books"
  }
}`}
        </SyntaxHighlighter>
        
        <h4>Combining Multiple Conditions with $and</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "filter": {
    "$and": [
      { "category": "books" },
      { "price": { "$lt": 20 } }
    ]
  }
}`}
        </SyntaxHighlighter>
        
        <h4>Using $or for Alternative Conditions</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "filter": {
    "$or": [
      { "category": "books" },
      { "category": "magazines" }
    ]
  }
}`}
        </SyntaxHighlighter>
        
        <h4>Filtering on Nested Fields</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "filter": {
    "metadata.author": "Jane Doe"
  }
}`}
        </SyntaxHighlighter>
        
        <h2>Response</h2>
        
        <h3>Success Response (200 OK)</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "success",
  "data": {
    "documents": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Example Document",
        "content": {
          "@embText": {
            "text": "This is an example document with embedded text.",
            "emb_model": "text-embedding-3-small",
            "max_chunk_size": 200,
            "chunk_overlap": 20,
            "chunks": ["This is an example document with embedded text."]
          }
        },
        "tags": ["example", "documentation"]
      }
    ],
    "total": 1
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.documents</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">array</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Array of documents matching the filter</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.total</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">integer</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Total number of documents matching the filter</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Code Examples</h2>
        
        <ApiCodeBlock
          curl={`curl -X POST \\
  https://api.capydb.com/v0/db/project_id_database_name/collection/my_collection/document/find \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "filter": {
      "tags": "example"
    },
    "projection": {
      "title": 1,
      "tags": 1
    },
    "limit": 10
  }'`}
          python={`import requests
import json

# API endpoint
url = "https://api.capydb.com/v0/db/project_id_database_name/collection/my_collection/document/find"

# Headers
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

# Request body
data = {
    "filter": {
        "tags": "example"
    },
    "projection": {
        "title": 1,
        "tags": 1
    },
    "limit": 10
}

# Make the request
response = requests.post(url, headers=headers, json=data)

# Process the response
if response.status_code == 200:
    result = response.json()
    documents = result["data"]["documents"]
    total = result["data"]["total"]
    
    # Process the documents
    for doc in documents:
        print(f"Document ID: {doc['_id']}")
        print(f"Title: {doc['title']}")
        print(f"Tags: {doc['tags']}")
        print("---")
    
    print(f"Total matching documents: {total}")
else:
    print(f"Error: {response.status_code}")
    print(response.text)`}
          javascript={`// API endpoint
const url = 'https://api.capydb.com/v0/db/project_id_database_name/collection/my_collection/document/find';

// Headers
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};

// Request body
const data = {
  filter: {
    tags: 'example'
  },
  projection: {
    title: 1,
    tags: 1
  },
  limit: 10
};

// Make the request
fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    const documents = result.data.documents;
    const total = result.data.total;
    
    // Process the documents
    documents.forEach(doc => {
      console.log('Document ID:', doc._id);
      console.log('Title:', doc.title);
      console.log('Tags:', doc.tags);
      console.log('---');
    });
    
    console.log('Total matching documents:', total);
  })
  .catch(error => {
    console.error('Error:', error);
  });`}
        />
        
        <ul>
          <li>
            <Link href="/api-reference/documents/insert" className="text-blue-600 dark:text-blue-400 hover:underline">
              Insert Documents
            </Link> - Add new documents to a collection
          </li>
          <li>
            <Link href="/api-reference/documents/query" className="text-blue-600 dark:text-blue-400 hover:underline">
              Query Documents
            </Link> - Perform semantic search on documents
          </li>
        </ul>
        
        <Feedback />
      </div>
    </DocLayout>
  );
} 