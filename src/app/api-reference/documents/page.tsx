import DocLayout from '@/components/DocLayout';
import Link from 'next/link';
import Feedback from '@/components/Feedback';

export default function DocumentsApiPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Documents API</h1>
        
        <p>
          The Documents API allows you to create, find, query, update, and delete documents in your CapyDB collections.
          Documents are JSON objects that can contain standard JSON types as well as CapyDB's special EmbJSON types for
          embedding text and images.
        </p>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> All document operations require authentication with a valid API key.
        </div>
        
        <h2>Document Structure</h2>
        
        <p>
          Documents in CapyDB are JSON objects with the following characteristics:
        </p>
        
        <ul>
          <li>Each document has a unique ID (automatically generated or provided by you)</li>
          <li>Documents can contain nested objects and arrays</li>
          <li>Documents can include special EmbJSON types for embedding text and images</li>
          <li>There is no fixed schema - different documents in the same collection can have different fields</li>
        </ul>
        
        <h2>EmbJSON Types</h2>
        
        <p>
          CapyDB extends standard JSON with special types for embedding and vector operations. For detailed information about EmbJSON types, please visit the <Link href="/api-reference/embjson" className="text-blue-600 dark:text-blue-400 hover:underline">EmbJSON Types</Link> documentation page.
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"@embText": {"text": "content", "emb_model": "text-embedding-3-small", "max_chunk_size": 200, "chunk_overlap": 20, ...}}`}</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Text that will be automatically chunked, embedded, and indexed for semantic search. Supports configuration of embedding model, chunk size, and other parameters.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">EmbImage</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>{`{"@embImage": {"url": "https://example.com/image.jpg", "vision_model": "gpt-4o", "emb_model": "text-embedding-3-small", ...}}`}</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Image URL that can be processed by vision models to extract textual descriptions and optionally embedded for semantic search.</td>
            </tr>
          </tbody>
        </table>
        
        <h3>Supported Models</h3>
        
        <p>
          CapyDB supports various embedding models for text and vision models for image processing. 
          For a comprehensive list and detailed information about all supported models, please visit the 
          <Link href="/api-reference/embjson/supported-llm-modes" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
            Supported LLM Modes
          </Link> documentation page.
        </p>
        
        <h2>API Operations</h2>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> In all API endpoints, <code>db_id</code> refers to the combined identifier of your project and database in the format <code>project_id_database_name</code> (using an underscore as the separator).
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">
              <Link href="/api-reference/documents/insert" className="text-blue-600 dark:text-blue-400 hover:underline">
                Insert Documents
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Insert one or more documents in a collection
            </p>
            <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <code className="break-all">POST /v0/db/{'{db_id}'}/collection/{'{collection_name}'}/document</code>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">
              <Link href="/api-reference/documents/find" className="text-blue-600 dark:text-blue-400 hover:underline">
                Find Documents
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Find documents based on filters
            </p>
            <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <code className="break-all">POST /v0/db/{'{db_id}'}/collection/{'{collection_name}'}/document/find</code>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">
              <Link href="/api-reference/documents/query" className="text-blue-600 dark:text-blue-400 hover:underline">
                Query Documents
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Perform semantic search on documents
            </p>
            <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <code className="break-all">POST /v0/db/{'{db_id}'}/collection/{'{collection_name}'}/document/query</code>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">
              <Link href="/api-reference/documents/update" className="text-blue-600 dark:text-blue-400 hover:underline">
                Update Documents
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Update documents based on filters
            </p>
            <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <code className="break-all">PUT /v0/db/{'{db_id}'}/collection/{'{collection_name}'}/document</code>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">
              <Link href="/api-reference/documents/delete" className="text-blue-600 dark:text-blue-400 hover:underline">
                Delete Documents
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Delete documents based on filters
            </p>
            <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <code className="break-all">DELETE /v0/db/{'{db_id}'}/collection/{'{collection_name}'}/document</code>
            </div>
          </div>
        </div>
        
        <h2>MongoDB-Style Query Operators</h2>
        
        <p>
          CapyDB supports a subset of MongoDB query operators for filtering documents. For details and examples, see the <Link href="/api-reference/documents/find" className="text-blue-600 dark:text-blue-400 hover:underline">Find Documents</Link> page.
        </p>
        
        <h2>Related Resources</h2>
        
        <ul>
          <li>
            <Link href="/api-reference/collections" className="text-blue-600 dark:text-blue-400 hover:underline">
              Collections API
            </Link> - Manage collections in your database
          </li>
          <li>
            <Link href="/api-reference/embjson" className="text-blue-600 dark:text-blue-400 hover:underline">
              EmbJSON Types
            </Link> - Detailed information about EmbText and EmbImage types
          </li>
        </ul>
        
        <Feedback />
      </div>
    </DocLayout>
  );
} 