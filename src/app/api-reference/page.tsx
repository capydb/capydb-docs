import DocLayout from '@/components/DocLayout';
import Link from 'next/link';

export default function ApiReferencePage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>API Reference</h1>
        
        <p>
          Welcome to the CapybaraDB API Reference. This documentation provides detailed information about 
          the CapybaraDB REST API endpoints, request/response formats, and authentication methods.
        </p>
        
        <h2>Getting Started</h2>
        
        <p>
          The CapybaraDB API is organized around REST. Our API has predictable resource-oriented URLs, 
          accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP 
          response codes, authentication, and verbs.
        </p>
        
        <h2>Base URL</h2>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code>https://api.capybaradb.co/v1</code>
        </div>
        
        <h2>Authentication</h2>
        
        <p>
          The CapybaraDB API uses API keys to authenticate requests. You can view and manage your API keys 
          in the CapybaraDB Dashboard.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code>
            Authorization: Bearer YOUR_API_KEY
          </code>
        </div>
        
        <h2>API Endpoints</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">
              <Link href="/api-reference/collections" className="text-blue-600 dark:text-blue-400 hover:underline">
                Collections
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Create, list, and manage collections in your CapybaraDB database.
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">
              <Link href="/api-reference/documents" className="text-blue-600 dark:text-blue-400 hover:underline">
                Documents
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Insert, query, update, and delete documents in your collections.
            </p>
          </div>
        </div>
        
        <h2>Rate Limits</h2>
        
        <p>
          The CapybaraDB API implements rate limiting to ensure the stability and performance of the service. 
          Rate limits vary based on your subscription plan.
        </p>
        
        <h2>Errors</h2>
        
        <p>
          CapybaraDB uses conventional HTTP response codes to indicate the success or failure of an API request. 
          In general, codes in the 2xx range indicate success, codes in the 4xx range indicate an error that 
          failed given the information provided, and codes in the 5xx range indicate an error with CapybaraDB's 
          servers.
        </p>
      </div>
    </DocLayout>
  );
} 