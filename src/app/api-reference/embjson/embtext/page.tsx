import DocLayout from '@/components/DocLayout';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ApiCodeBlock from '@/components/ApiCodeBlock';

export default function EmbTextPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>EmbText</h1>
        
        <p>
          <code>EmbText</code> is a special type in CapybaraDB that allows you to store text that will be automatically 
          chunked, embedded, and indexed for semantic search. This enables powerful natural language queries 
          against your text data.
        </p>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> <code>EmbText</code> fields are processed asynchronously. When you insert or update a document 
          with <code>EmbText</code> fields, the document is stored immediately, but the embedding process happens in the background.
          You can track the status of this process using the <code>task_id</code> returned in the response.
        </div>
        
        <h2>Format</h2>
        
        <p>
          The <code>EmbText</code> type is represented in JSON as an object with the <code>$embText</code> key:
        </p>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "$embText": {
    "text": "This is the text content that will be embedded",
    "emb_model": "text-embedding-3-small",
    "max_chunk_size": 200,
    "chunk_overlap": 20
  }
}`}
        </SyntaxHighlighter>
        
        <p>
          For simple cases, you can also use a shorthand format:
        </p>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "$embText": "This is the text content that will be embedded"
}`}
        </SyntaxHighlighter>
        
        <p>
          This shorthand will use the default embedding model and chunking parameters.
        </p>
        
        <h2>Parameters</h2>
        
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>text</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The text content to be embedded</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>emb_model</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The embedding model to use. Defaults to <code>text-embedding-3-small</code></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>max_chunk_size</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">integer</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Maximum number of tokens per chunk. Defaults to 200</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>chunk_overlap</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">integer</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Number of overlapping tokens between consecutive chunks. Defaults to 20</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Supported Embedding Models</h2>
        
        <p>The following embedding models are supported for <code>EmbText</code>:</p>
        
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Model</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Dimensions</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>text-embedding-3-small</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1536</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Default model, good balance of quality and performance</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>text-embedding-3-large</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">3072</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Higher quality embeddings for more nuanced search</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>text-embedding-ada-002</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1536</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Legacy model, included for backward compatibility</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Chunking</h2>
        
        <p>
          When you store text using <code>EmbText</code>, CapybaraDB automatically chunks the text into smaller segments 
          before embedding. This is important for two reasons:
        </p>
        
        <ul>
          <li>Embedding models have token limits</li>
          <li>Smaller chunks provide more precise search results</li>
        </ul>
        
        <p>
          You can control the chunking behavior using the <code>max_chunk_size</code> and <code>chunk_overlap</code> parameters.
        </p>
        
        <h2>Example Usage</h2>
        
        <h3>JSON Example</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "title": "Introduction to Machine Learning",
  "author": "Jane Smith",
  "content": {
    "$embText": {
      "text": "Machine learning is a field of study that gives computers the ability to learn without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves.",
      "emb_model": "text-embedding-3-large",
      "max_chunk_size": 150,
      "chunk_overlap": 15
    }
  }
}`}
        </SyntaxHighlighter>
        
        <h3>REST API Examples</h3>
        
        <ApiCodeBlock
          curl={`curl -X POST \\
  https://api.capybaradb.co/v0/db/project_id_database_name/collection/articles/document \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Introduction to Machine Learning",
    "author": "Jane Smith",
    "content": {
      "$embText": {
        "text": "Machine learning is a field of study that gives computers the ability to learn without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves.",
        "emb_model": "text-embedding-3-large",
        "max_chunk_size": 150,
        "chunk_overlap": 15
      }
    }
  }'`}
          python={`import requests
import json

# API endpoint
url = "https://api.capybaradb.co/v0/db/project_id_database_name/collection/articles/document"

# Headers
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

# Request body
data = {
    "title": "Introduction to Machine Learning",
    "author": "Jane Smith",
    "content": {
        "$embText": {
            "text": "Machine learning is a field of study that gives computers the ability to learn without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves.",
            "emb_model": "text-embedding-3-large",
            "max_chunk_size": 150,
            "chunk_overlap": 15
        }
    }
}

# Make the request
response = requests.post(url, headers=headers, json=data)

# Process the response
if response.status_code == 201:
    result = response.json()
    print(f"Inserted document with ID: {result['data']['inserted_ids'][0]}")
    print(f"Task ID for embedding: {result['data']['task_id']}")
else:
    print(f"Error: {response.status_code}")
    print(response.text)`}
          javascript={`// API endpoint
const url = 'https://api.capybaradb.co/v0/db/project_id_database_name/collection/articles/document';

// Headers
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};

// Request body
const data = {
  title: 'Introduction to Machine Learning',
  author: 'Jane Smith',
  content: {
    $embText: {
      text: 'Machine learning is a field of study that gives computers the ability to learn without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves.',
      emb_model: 'text-embedding-3-large',
      max_chunk_size: 150,
      chunk_overlap: 15
    }
  }
};

// Make the request
fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    if (result.status === 'success') {
      console.log('Inserted document with ID:', result.data.inserted_ids[0]);
      console.log('Task ID for embedding:', result.data.task_id);
    } else {
      console.error('Error:', result);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });`}
        />
        
        <h2>Related Resources</h2>
        
        <ul>
          <li>
            <Link href="/api-reference/embjson" className="text-blue-600 dark:text-blue-400 hover:underline">
              EmbJSON Overview
            </Link> - Learn about all EmbJSON types
          </li>
          <li>
            <Link href="/api-reference/embjson/embimage" className="text-blue-600 dark:text-blue-400 hover:underline">
              EmbImage
            </Link> - Documentation for the EmbImage type
          </li>
          <li>
            <Link href="/api-reference/documents/query" className="text-blue-600 dark:text-blue-400 hover:underline">
              Query Documents
            </Link> - Learn how to perform semantic search on EmbText fields
          </li>
        </ul>
      </div>
    </DocLayout>
  );
} 