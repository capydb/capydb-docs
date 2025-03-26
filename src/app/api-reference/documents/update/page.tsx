import DocLayout from '@/components/DocLayout';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ApiCodeBlock from '@/components/ApiCodeBlock';
import Feedback from '@/components/Feedback';

export default function UpdateDocumentsPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Update Documents</h1>
        
        <div className="flex items-center mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono mr-2">PUT</span>
          <code className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded break-all">/v0/db/{'{db_id}'}/collection/{'{collection_name}'}/document</code>
        </div>
        
        <p>
          Updates documents in a collection based on a filter. This endpoint allows you to modify documents that match specific criteria, with options for updating specific fields or replacing entire documents.
        </p>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> The <code>db_id</code> refers to the combined identifier of your project and database in the format <code>project_id_database_name</code> (using an underscore as the separator).
        </div>
        
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-md my-4 text-yellow-800 dark:text-yellow-200">
          <strong>Important:</strong> When updating documents with <code>EmbText</code> or <code>EmbImage</code> fields, there may be a short delay before these fields are fully processed and available for semantic search. This is because the embedding process happens asynchronously in the background.
          <p className="mt-2">
            For detailed information about EmbJSON types, including parameters, supported models, and examples, please visit the <Link href="/api-reference/embjson" className="text-yellow-600 dark:text-yellow-400 hover:underline">EmbJSON Types</Link> documentation page.
          </p>
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
    "category": "books"
  },
  "update": {
    "$set": {
      "status": "published",
      "updated_at": "2023-06-15T10:30:00Z",
      "content": {
        "@embText": {
          "text": "Updated content with embedded text.",
          "emb_model": "text-embedding-3-small",
          "max_chunk_size": 200,
          "chunk_overlap": 20
        }
      }
    }
  },
  "upsert": false
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">MongoDB-style query filter to select documents to update</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">update</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">object</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Update operations to apply to the matched documents</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">upsert</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">boolean</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">If true, creates a new document when no document matches the filter (default: false)</td>
            </tr>
          </tbody>
        </table>
        
        <h3>Update Operators</h3>
        
        <p>
          CapyDB supports a subset of MongoDB update operators:
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>$set</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Sets the value of a field</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"$set": {"status": "published"}}`}</code></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>$unset</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Removes the specified field</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"$unset": {"temporary_field": ""}}`}</code></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>$inc</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Increments a field by a specified value</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"$inc": {"views": 1}}`}</code></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>$push</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Adds an element to an array</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"$push": {"tags": "new_tag"}}`}</code></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>$pull</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Removes all array elements that match a specified condition</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"$pull": {"tags": "old_tag"}}`}</code></td>
            </tr>
          </tbody>
        </table>
        
        <h2>Response</h2>
        
        <h3>Success Response (200 OK)</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "success",
  "data": {
    "matched_count": 2,
    "modified_count": 2,
    "upserted_id": null
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.matched_count</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">integer</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Number of documents that matched the filter</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.modified_count</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">integer</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Number of documents that were modified</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">data.upserted_id</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string or null</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">ID of the newly created document if an upsert occurred, otherwise null</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Code Examples</h2>
        
        <ApiCodeBlock
          curl={`curl -X PUT \\
  https://api.capydb.com/v0/db/project_id_database_name/collection/my_collection/document \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "filter": {
      "category": "technology"
    },
    "update": {
      "$set": {
        "status": "published",
        "updated_at": "2023-06-15T10:30:00Z"
      },
      "$inc": {
        "view_count": 1
      }
    },
    "upsert": true
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
        "category": "technology"
    },
    "update": {
        "$set": {
            "status": "published",
            "updated_at": "2023-06-15T10:30:00Z"
        },
        "$inc": {
            "view_count": 1
        }
    },
    "upsert": True
}

# Make the request
response = requests.put(url, headers=headers, json=data)

# Process the response
if response.status_code == 200:
    result = response.json()
    print(f"Matched count: {result['data']['matched_count']}")
    print(f"Modified count: {result['data']['modified_count']}")
    if 'upserted_id' in result['data']:
        print(f"Upserted ID: {result['data']['upserted_id']}")
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
    category: 'technology'
  },
  update: {
    $set: {
      status: 'published',
      updated_at: '2023-06-15T10:30:00Z'
    },
    $inc: {
      view_count: 1
    }
  },
  upsert: true
};

// Make the request
fetch(url, {
  method: 'PUT',
  headers: headers,
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    console.log('Matched count:', result.data.matched_count);
    console.log('Modified count:', result.data.modified_count);
    if (result.data.upserted_id) {
      console.log('Upserted ID:', result.data.upserted_id);
    }
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