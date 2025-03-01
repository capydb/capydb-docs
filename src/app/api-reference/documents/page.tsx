import DocLayout from '@/components/DocLayout';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';

export default function DocumentsApiPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Documents API</h1>
        
        <p>
          The Documents API allows you to insert, query, update, and delete documents in your CapybaraDB collections.
          Documents are stored as JSON objects and can include standard JSON types as well as CapybaraDB's EmbJSON types.
        </p>
        
        <div className="my-8 border-b border-gray-200 dark:border-gray-700"></div>
        
        <h2 id="insert-documents">Insert Documents</h2>
        
        <p>Inserts one or more documents into a collection.</p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code className="text-sm">
            <strong>POST</strong> /collections/:collection_name/documents
          </code>
        </div>
        
        <h3>Request Body</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "documents": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "bio": {
        "$embText": "John is a software engineer with 5 years of experience."
      }
    },
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "age": 28,
      "bio": {
        "$embText": "Jane is a data scientist specializing in machine learning."
      }
    }
  ]
}`}
        </SyntaxHighlighter>
        
        <h3>Response</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "inserted_ids": [
    "64d2f8f01234abcd5678ef90",
    "64d2f8f01234abcd5678ef91"
  ],
  "task_id": "abc123xyz"
}`}
        </SyntaxHighlighter>
        
        <h3>Code Examples</h3>
        
        <LanguageToggle />
        
        <LanguageContent language="python">
          <SyntaxHighlighter language="python" style={atomDark} showLineNumbers>
            {`from capybaradb import EmbText
import requests

api_key = "your_api_key"
base_url = "https://api.capybaradb.co/v1"
collection_name = "users"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

documents = [
    {
        "name": "John Doe",
        "email": "john@example.com",
        "age": 30,
        "bio": EmbText("John is a software engineer with 5 years of experience.")
    },
    {
        "name": "Jane Smith",
        "email": "jane@example.com",
        "age": 28,
        "bio": EmbText("Jane is a data scientist specializing in machine learning.")
    }
]

response = requests.post(
    f"{base_url}/collections/{collection_name}/documents",
    headers=headers,
    json={"documents": documents}
)

print(response.json())`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <SyntaxHighlighter language="typescript" style={atomDark} showLineNumbers>
            {`import { EmbText } from "capybaradb";

const insertDocuments = async () => {
  const apiKey = "your_api_key";
  const baseUrl = "https://api.capybaradb.co/v1";
  const collectionName = "users";
  
  const documents = [
    {
      name: "John Doe",
      email: "john@example.com",
      age: 30,
      bio: new EmbText("John is a software engineer with 5 years of experience.")
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      age: 28,
      bio: new EmbText("Jane is a data scientist specializing in machine learning.")
    }
  ];
  
  const response = await fetch(\`\${baseUrl}/collections/\${collectionName}/documents\`, {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${apiKey}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ documents })
  });
  
  const data = await response.json();
  console.log(data);
};

insertDocuments();`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <div className="my-8 border-b border-gray-200 dark:border-gray-700"></div>
        
        <h2 id="query-documents">Query Documents</h2>
        
        <p>
          Queries documents in a collection based on filter criteria. Supports both exact matches and 
          semantic (vector) search using EmbJSON fields.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <code className="text-sm">
            <strong>POST</strong> /collections/:collection_name/query
          </code>
        </div>
        
        <h3>Request Body</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "filter": {
    "age": { "$gte": 25 }
  },
  "semantic": {
    "bio": "Experience with machine learning"
  },
  "limit": 10,
  "projection": {
    "name": 1,
    "email": 1,
    "bio": 1
  }
}`}
        </SyntaxHighlighter>
        
        <h3>Response</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "documents": [
    {
      "_id": "64d2f8f01234abcd5678ef91",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "bio": "Jane is a data scientist specializing in machine learning.",
      "_score": 0.92
    },
    {
      "_id": "64d2f8f01234abcd5678ef92",
      "name": "Michael Johnson",
      "email": "michael@example.com",
      "bio": "Michael has 10 years of experience in AI and machine learning.",
      "_score": 0.85
    }
  ],
  "count": 2,
  "total": 2
}`}
        </SyntaxHighlighter>
        
        <h3>Code Examples</h3>
        
        <LanguageToggle />
        
        <LanguageContent language="python">
          <SyntaxHighlighter language="python" style={atomDark} showLineNumbers>
            {`import requests

api_key = "your_api_key"
base_url = "https://api.capybaradb.co/v1"
collection_name = "users"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

query = {
    "filter": {
        "age": { "$gte": 25 }
    },
    "semantic": {
        "bio": "Experience with machine learning"
    },
    "limit": 10,
    "projection": {
        "name": 1,
        "email": 1,
        "bio": 1
    }
}

response = requests.post(
    f"{base_url}/collections/{collection_name}/query",
    headers=headers,
    json=query
)

print(response.json())`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <SyntaxHighlighter language="typescript" style={atomDark} showLineNumbers>
            {`const queryDocuments = async () => {
  const apiKey = "your_api_key";
  const baseUrl = "https://api.capybaradb.co/v1";
  const collectionName = "users";
  
  const query = {
    filter: {
      age: { $gte: 25 }
    },
    semantic: {
      bio: "Experience with machine learning"
    },
    limit: 10,
    projection: {
      name: 1,
      email: 1,
      bio: 1
    }
  };
  
  const response = await fetch(\`\${baseUrl}/collections/\${collectionName}/query\`, {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${apiKey}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(query)
  });
  
  const data = await response.json();
  console.log(data);
};

queryDocuments();`}
          </SyntaxHighlighter>
        </LanguageContent>
      </div>
    </DocLayout>
  );
} 