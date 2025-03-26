import DocLayout from '@/components/DocLayout';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ApiCodeBlock from '@/components/ApiCodeBlock';
import Feedback from '@/components/Feedback';

export default function ApiReferencePage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>CapyDB API v0 Reference</h1>
        
        <p>
          Welcome to the CapyDB API v0 Reference. This documentation provides detailed information about 
          the CapyDB REST API endpoints, request/response formats, and authentication methods.
        </p>
        
        <h2>Getting Started</h2>
        
        <p>
          The CapyDB API is organized around REST principles. Our API has predictable resource-oriented URLs, 
          accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP 
          response codes, authentication, and verbs.
        </p>
        
        <h2>Base URL</h2>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 font-mono text-sm">
          <code>https://api.capydb.com/v0</code>
        </div>
        
        <h2>Authentication</h2>
        
        <p>
          The CapyDB API uses API keys to authenticate requests. You can view and manage your API keys 
          in the CapyDB Dashboard. API keys must be included in the Authorization header of all requests.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 font-mono text-sm">
          <code>Authorization: Bearer YOUR_API_KEY</code>
        </div>
        
        <p>
          For more details on authentication, see the <Link href="/api-reference/authentication" className="text-blue-600 dark:text-blue-400 hover:underline">Authentication Guide</Link>.
        </p>
        
        <h2>Database and Collection Structure</h2>
        
        <p>
          CapyDB organizes data in a hierarchical structure:
        </p>
        
        <ul>
          <li><strong>Project</strong>: The top-level container for your data</li>
          <li><strong>Database</strong>: A logical grouping of collections within a project</li>
          <li><strong>Collection</strong>: A container for documents</li>
          <li><strong>Document</strong>: Individual JSON records that can contain standard JSON types and CapyDB's EmbJSON types</li>
        </ul>
        
        <p>
          When making API requests, you'll need to specify the database ID (<code>db_id</code>) which is a combination of your project ID and database name in the format <code>project_id_database_name</code>.
        </p>
        
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-md my-4 text-yellow-800 dark:text-yellow-200">
          <strong>Important:</strong> The <code>db_id</code> uses an underscore (_) as a separator between the project ID and database name. For example: <code>my_project_my_database</code>
        </div>
        
        <h2>URL Structure</h2>
        
        <p>
          API endpoints follow this general structure:
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code>/v0/db/&lt;db_id&gt;/collection/&lt;collection_name&gt;/document/...</code>
        </div>
        
        <h2>EmbJSON Types</h2>
        
        <p>
          CapyDB extends standard JSON with special types for embedding and vector operations:
        </p>
        
        <ul>
          <li><strong>EmbText</strong>: For text that should be embedded and indexed for semantic search</li>
          <li><strong>EmbImage</strong>: For images that should be embedded and indexed for visual search</li>
        </ul>

        <p>
          For detailed information about EmbJSON types, please visit the <Link href="/api-reference/embjson" className="text-blue-600 dark:text-blue-400 hover:underline">EmbJSON Types</Link> documentation page.
          To learn about the supported embedding models for text and images, see the <Link href="/api-reference/embjson/supported-llm-modes" className="text-blue-600 dark:text-blue-400 hover:underline">Supported LLM Modes</Link> page.
        </p>
        
        <p>
          In JSON requests, these are represented as:
        </p>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "title": "Regular text field",
  "description": {
    "@embText": "This text will be embedded for semantic search"
  },
  "image": {
    "@embImage": "https://example.com/image.jpg"
  }
}`}
        </SyntaxHighlighter>
        
        <h2>API Endpoints</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">
              <Link href="/api-reference/documents" className="text-blue-600 dark:text-blue-400 hover:underline">
                Documents
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Insert, find, query, update, and delete documents in your collections.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">
              <Link href="/api-reference/embjson" className="text-blue-600 dark:text-blue-400 hover:underline">
                EmbJSON Types
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Detailed information about EmbText and EmbImage types for embedding and vector operations.
            </p>
          </div>
        </div>
        
        <h2>Error Handling</h2>
        
        <p>
          CapyDB uses conventional HTTP response codes to indicate the success or failure of an API request. 
          In general, codes in the 2xx range indicate success, codes in the 4xx range indicate an error that 
          failed given the information provided, and codes in the 5xx range indicate an error with CapyDB's 
          servers.
        </p>
        
        <p>Error responses follow this format:</p>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "error",
  "code": 400,
  "message": "Detailed error message"
}`}
        </SyntaxHighlighter>
        
        <h2>Need Help?</h2>
        
        <p>
          If you have any questions or need assistance with the CapyDB API, please don't hesitate to reach out to our support team at <a href="mailto:hello@capydb.com" className="text-blue-600 dark:text-blue-400 hover:underline">hello@capydb.com</a>.
        </p>
        
        <Feedback />
      </div>
    </DocLayout>
  );
} 