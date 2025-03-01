import DocLayout from '@/components/DocLayout';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';

export default function CollectionsApiPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Collections API</h1>
        
        <p>
          The Collections API allows you to create, list, retrieve, and delete collections in your CapybaraDB database.
          Collections are containers for documents and provide a way to organize your data.
        </p>
        
        <div className="my-8 border-b border-gray-200 dark:border-gray-700"></div>
        
        <h2 id="list-collections">List Collections</h2>
        
        <p>Returns a list of all collections in your database.</p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code className="text-sm">
            <strong>GET</strong> /collections
          </code>
        </div>
        
        <h3>Response</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "collections": [
    {
      "name": "users",
      "count": 1250,
      "created_at": "2023-06-15T10:30:00Z"
    },
    {
      "name": "products",
      "count": 532,
      "created_at": "2023-06-16T14:20:00Z"
    }
  ]
}`}
        </SyntaxHighlighter>
        
        <div className="my-8 border-b border-gray-200 dark:border-gray-700"></div>
        
        <h2 id="create-collection">Create Collection</h2>
        
        <p>Creates a new collection in your database.</p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code className="text-sm">
            <strong>POST</strong> /collections
          </code>
        </div>
        
        <h3>Request Body</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "name": "customers",
  "options": {
    "vector_dimensions": 1536,  // Optional: For vector collections
    "vector_metric": "cosine"   // Optional: "cosine", "euclidean", or "dot"
  }
}`}
        </SyntaxHighlighter>
        
        <h3>Response</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "name": "customers",
  "created_at": "2023-07-20T09:15:00Z",
  "options": {
    "vector_dimensions": 1536,
    "vector_metric": "cosine"
  }
}`}
        </SyntaxHighlighter>
        
        <h3>Code Examples</h3>
        
        <LanguageToggle />
        
        <LanguageContent language="python">
          <SyntaxHighlighter language="python" style={atomDark} showLineNumbers>
            {`import requests

api_key = "your_api_key"
base_url = "https://api.capybaradb.co/v1"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

data = {
    "name": "customers",
    "options": {
        "vector_dimensions": 1536,
        "vector_metric": "cosine"
    }
}

response = requests.post(
    f"{base_url}/collections",
    headers=headers,
    json=data
)

print(response.json())`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <SyntaxHighlighter language="typescript" style={atomDark} showLineNumbers>
            {`const createCollection = async () => {
  const apiKey = "your_api_key";
  const baseUrl = "https://api.capybaradb.co/v1";
  
  const response = await fetch(\`\${baseUrl}/collections\`, {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${apiKey}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "customers",
      options: {
        vector_dimensions: 1536,
        vector_metric: "cosine"
      }
    })
  });
  
  const data = await response.json();
  console.log(data);
};

createCollection();`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <div className="my-8 border-b border-gray-200 dark:border-gray-700"></div>
        
        <h2 id="delete-collection">Delete Collection</h2>
        
        <p>
          Deletes a collection and all of its documents. This operation cannot be undone, so use it with caution.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code className="text-sm">
            <strong>DELETE</strong> /collections/:collection_name
          </code>
        </div>
        
        <h3>Response</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "deleted": true,
  "name": "customers"
}`}
        </SyntaxHighlighter>
      </div>
    </DocLayout>
  );
} 