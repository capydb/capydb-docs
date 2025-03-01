import DocLayout from '@/components/DocLayout';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from 'next/link';

export default function DocumentsApiPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Documents API</h1>
        
        <p>
          The Documents API allows you to create, find, query, update, and delete documents in your CapybaraDB collections.
          Documents are JSON objects that can contain standard JSON types as well as CapybaraDB's special EmbJSON types for
          embedding text and images.
        </p>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> All document operations require authentication with a valid API key.
        </div>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> In all API endpoints, <code>db_id</code> refers to the combined identifier of your project and database in the format <code>project_id_database_name</code> (using an underscore as the separator).
        </div>
        
        <h2>Document Structure</h2>
        
        <p>
          Documents in CapybaraDB are JSON objects with the following characteristics:
        </p>
        
        <ul>
          <li>Each document has a unique ID (automatically generated or provided by you)</li>
          <li>Documents can contain nested objects and arrays</li>
          <li>Documents can include special EmbJSON types for embedding text and images</li>
          <li>There is no fixed schema - different documents in the same collection can have different fields</li>
        </ul>
        
        <h2>EmbJSON Types</h2>
        
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
        
        <h2>API Endpoints</h2>
        
        <h3 id="create-documents">Create Documents</h3>
        
        <p>
          Creates one or more documents in a collection.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code>
            POST /v0/db/{'{db_id}'}/collection/{'{collection_name}'}/document
          </code>
        </div>
        
        <h4>Request Body</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "documents": [
    {
      "title": "Example Document",
      "content": {
        "$embText": "This is an example document with embedded text."
      },
      "tags": ["example", "documentation"]
    },
    {
      "title": "Another Document",
      "content": {
        "$embText": "This is another example document."
      },
      "image": {
        "$embImage": "https://example.com/image.jpg"
      }
    }
  ]
}`}
        </SyntaxHighlighter>
        
        <h4>Response</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "success",
  "data": {
    "inserted_count": 2,
    "inserted_ids": [
      "507f1f77bcf86cd799439011",
      "507f1f77bcf86cd799439012"
    ]
  }
}`}
        </SyntaxHighlighter>
        
        <h4>Example Request</h4>
        
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
          "$embText": "This is an example document with embedded text."
        },
        "tags": ["example", "documentation"]
      }
    ]
  }'`}
        </SyntaxHighlighter>
        
        <h3 id="find-documents">Find Documents</h3>
        
        <p>
          Finds documents in a collection based on a filter.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code>
            POST /v0/db/{'{db_id}'}/collection/{'{collection_name}'}/document/find
          </code>
        </div>
        
        <h4>Request Body</h4>
        
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
        
        <p>
          Parameters:
        </p>
        
        <ul>
          <li><strong>filter</strong> (object): MongoDB-style query filter</li>
          <li><strong>projection</strong> (object, optional): Fields to include (1) or exclude (0) in the results</li>
          <li><strong>sort</strong> (object, optional): Sort order for results (1 for ascending, -1 for descending)</li>
          <li><strong>skip</strong> (integer, optional): Number of documents to skip</li>
          <li><strong>limit</strong> (integer, optional): Maximum number of documents to return</li>
        </ul>
        
        <h4>Response</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "success",
  "data": {
    "documents": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Example Document",
        "tags": ["example", "documentation"]
      }
    ],
    "total": 1
  }
}`}
        </SyntaxHighlighter>
        
        <h4>Example Request</h4>
        
        <SyntaxHighlighter language="bash" style={atomDark} showLineNumbers>
          {`curl -X POST \\
  https://api.capybaradb.co/v0/db/project_id_database_name/collection/my_collection/document/find \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "filter": {
      "tags": "example"
    },
    "limit": 10
  }'`}
        </SyntaxHighlighter>
        
        <h3 id="query-documents">Query Documents (Semantic Search)</h3>
        
        <p>
          Performs a semantic search on embedded text or images in a collection.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code>
            POST /v0/db/{'{db_id}'}/collection/{'{collection_name}'}/document/query
          </code>
        </div>
        
        <h4>Request Body</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "text": "What is CapybaraDB?",
  "filter": {
    "tags": "documentation"
  },
  "top_k": 5,
  "projection": {
    "title": 1,
    "content": 1
  },
  "include_values": true,
  "emb_model": "text-embedding-ada-002"
}`}
        </SyntaxHighlighter>
        
        <p>
          Parameters:
        </p>
        
        <ul>
          <li><strong>text</strong> (string): The query text for semantic search</li>
          <li><strong>filter</strong> (object, optional): MongoDB-style query filter to apply before semantic search</li>
          <li><strong>top_k</strong> (integer, optional): Number of results to return (default: 10)</li>
          <li><strong>projection</strong> (object, optional): Fields to include (1) or exclude (0) in the results</li>
          <li><strong>include_values</strong> (boolean, optional): Whether to include embedding values in the response</li>
          <li><strong>emb_model</strong> (string, optional): The embedding model to use (default: text-embedding-ada-002)</li>
        </ul>
        
        <h4>Response</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "success",
  "data": {
    "results": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Example Document",
        "content": {
          "$embText": "This is an example document with embedded text."
        },
        "score": 0.92,
        "values": [0.1, 0.2, 0.3, ...]
      }
    ]
  }
}`}
        </SyntaxHighlighter>
        
        <h4>Example Request</h4>
        
        <SyntaxHighlighter language="bash" style={atomDark} showLineNumbers>
          {`curl -X POST \\
  https://api.capybaradb.co/v0/db/project_id_database_name/collection/my_collection/document/query \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "What is CapybaraDB?",
    "top_k": 5
  }'`}
        </SyntaxHighlighter>
        
        <h3 id="update-documents">Update Documents</h3>
        
        <p>
          Updates one or more documents in a collection based on a filter.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code>
            PUT /v0/db/{'{db_id}'}/collection/{'{collection_name}'}/document
          </code>
        </div>
        
        <h4>Request Body</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "filter": {
    "tags": "example"
  },
  "update": {
    "$set": {
      "updated": true,
      "updated_at": "2023-07-21T15:30:00Z"
    },
    "$push": {
      "tags": "updated"
    }
  }
}`}
        </SyntaxHighlighter>
        
        <p>
          Parameters:
        </p>
        
        <ul>
          <li><strong>filter</strong> (object): MongoDB-style query filter to select documents to update</li>
          <li><strong>update</strong> (object): MongoDB-style update operators</li>
        </ul>
        
        <h4>Response</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "success",
  "data": {
    "matched_count": 1,
    "modified_count": 1
  }
}`}
        </SyntaxHighlighter>
        
        <h4>Example Request</h4>
        
        <SyntaxHighlighter language="bash" style={atomDark} showLineNumbers>
          {`curl -X PUT \\
  https://api.capybaradb.co/v0/db/project_id_database_name/collection/my_collection/document \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "filter": {
      "tags": "example"
    },
    "update": {
      "$set": {
        "updated": true
      }
    }
  }'`}
        </SyntaxHighlighter>
        
        <h3 id="delete-documents">Delete Documents</h3>
        
        <p>
          Deletes one or more documents in a collection based on a filter.
        </p>
        
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-md my-4 text-red-800 dark:text-red-200">
          <strong>Warning:</strong> This operation is irreversible. Deleted documents cannot be recovered.
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code>
            DELETE /v0/db/{'{db_id}'}/collection/{'{collection_name}'}/document
          </code>
        </div>
        
        <h4>Request Body</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "filter": {
    "tags": "example"
  }
}`}
        </SyntaxHighlighter>
        
        <p>
          Parameters:
        </p>
        
        <ul>
          <li><strong>filter</strong> (object): MongoDB-style query filter to select documents to delete</li>
        </ul>
        
        <h4>Response</h4>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "success",
  "data": {
    "deleted_count": 1
  }
}`}
        </SyntaxHighlighter>
        
        <h4>Example Request</h4>
        
        <SyntaxHighlighter language="bash" style={atomDark} showLineNumbers>
          {`curl -X DELETE \\
  https://api.capybaradb.co/v0/db/project_id_database_name/collection/my_collection/document \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "filter": {
      "tags": "example"
    }
  }'`}
        </SyntaxHighlighter>
        
        <h2>MongoDB-Style Query Operators</h2>
        
        <p>
          CapybaraDB supports a subset of MongoDB query operators for filtering documents:
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
        
        <h2>Related Resources</h2>
        
        <ul>
          <li>
            <Link href="/api-reference/collections" className="text-blue-600 dark:text-blue-400 hover:underline">
              Collections API
            </Link> - Manage collections in your database
          </li>
        </ul>
      </div>
    </DocLayout>
  );
} 