import DocLayout from '@/components/DocLayout';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Feedback from '@/components/Feedback';

export default function AuthenticationPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Authentication</h1>
        
        <p>
          The CapyDB API uses API keys to authenticate requests. API keys provide full access to your 
          CapyDB account, so be sure to keep them secure. Do not share your API keys in publicly 
          accessible areas such as GitHub, client-side code, or in your application's source code.
        </p>
        
        <h2>Obtaining API Keys</h2>
        
        <p>
          You can obtain an API key from the CapyDB Dashboard. After signing in:
        </p>
        
        <ol>
          <li>Navigate to the API Keys section in your account settings</li>
          <li>Click "Create New API Key"</li>
          <li>Give your API key a descriptive name (e.g., "Production", "Development", "Testing")</li>
          <li>Set appropriate permissions for the API key</li>
          <li>Copy and securely store your API key - it will only be shown once</li>
        </ol>
        
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-md my-4 text-yellow-800 dark:text-yellow-200">
          <strong>Important:</strong> Your API key will only be displayed once when it's created. Make sure to copy it and store it securely.
        </div>
        
        <h2>Using API Keys</h2>
        
        <p>
          To authenticate API requests, include your API key in the Authorization header of all requests:
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code>
            Authorization: Bearer YOUR_API_KEY
          </code>
        </div>
        
        <h3>Example Request with Authentication</h3>
        
        <SyntaxHighlighter language="bash" style={atomDark} showLineNumbers>
          {`curl -X POST \\
  https://api.capydb.com/v0/db/project_id_database_name/collection/my_collection/document \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Example Document",
    "content": {
      "@embText": "This is an example document with embedded text."
    }
  }'`}
        </SyntaxHighlighter>
        
        <h2>API Key Permissions</h2>
        
        <p>
          When creating API keys, you can specify different permission levels:
        </p>
        
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Permission Level</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Admin</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Full access to all resources and operations</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Write</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Can read, create, update, and delete resources</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Read</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Can only read resources, cannot modify them</td>
            </tr>
          </tbody>
        </table>
        
        <h2>API Key Security Best Practices</h2>
        
        <ul>
          <li><strong>Never expose API keys in client-side code</strong> - Always use API keys in server-side code where they cannot be exposed to users</li>
          <li><strong>Use environment variables</strong> - Store API keys in environment variables rather than hardcoding them</li>
          <li><strong>Implement key rotation</strong> - Regularly rotate your API keys to minimize the impact of potential exposure</li>
          <li><strong>Use the principle of least privilege</strong> - Create API keys with only the permissions they need</li>
          <li><strong>Monitor API key usage</strong> - Regularly review API key usage in the CapyDB Dashboard</li>
          <li><strong>Revoke compromised keys immediately</strong> - If you suspect an API key has been compromised, revoke it immediately</li>
        </ul>
        
        <h2>Authentication Errors</h2>
        
        <p>
          If authentication fails, the API will return a 401 Unauthorized response:
        </p>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "status": "error",
  "code": 401,
  "message": "Invalid API key provided"
}`}
        </SyntaxHighlighter>
        
        <h3>Common Authentication Errors</h3>
        
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Error Message</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Missing API key</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No API key was provided in the request</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Invalid API key provided</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The API key provided is not valid</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">API key has been revoked</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The API key has been revoked and is no longer valid</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Insufficient permissions</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The API key does not have the required permissions for the requested operation</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Related Resources</h2>
        
        <ul>
          <li>
            <Link href="/api-reference/documents" className="text-blue-600 dark:text-blue-400 hover:underline">
              Documents API
            </Link> - Work with documents in your collections
          </li>
          <li>
            <Link href="/api-reference/collections" className="text-blue-600 dark:text-blue-400 hover:underline">
              Collections API
            </Link> - Manage collections in your database
          </li>
        </ul>
        
        <Feedback />
      </div>
    </DocLayout>
  );
} 