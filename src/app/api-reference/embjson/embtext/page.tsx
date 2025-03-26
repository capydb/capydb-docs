import DocLayout from '@/components/DocLayout';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ApiCodeBlock from '@/components/ApiCodeBlock';
import Feedback from '@/components/Feedback';

export default function EmbTextPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>EmbText</h1>
        
        <p>
          <code>EmbText</code> is a special type in CapyDB that allows you to store text that will be automatically 
          chunked, embedded, and indexed for semantic search. This enables powerful natural language queries 
          against your text data.
        </p>
        
        <div className="bg-blue-50/80 dark:bg-blue-950/30 p-4 rounded-md my-4 text-gray-800 dark:text-gray-200 border border-blue-100 dark:border-blue-900">
          <strong>Note:</strong> <code>EmbText</code> fields are processed asynchronously. When you insert or update a document 
          with <code>EmbText</code> fields, the document is stored immediately, but the embedding process happens in the background.
          You can track the status of this process using the <code>task_id</code> returned in the response.
        </div>
        
        <h2>Format</h2>
        
        <p>
          The <code>EmbText</code> type is represented in JSON as an object with the <code>@embText</code> key:
        </p>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "@embText": {
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
  "@embText": "This is the text content that will be embedded"
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
        
        <p>
          CapyDB supports various text embedding models including <code>text-embedding-3-small</code> (default), 
          <code>text-embedding-3-large</code>, and <code>text-embedding-ada-002</code>.
        </p>
        
        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mb-6">
          <p className="text-amber-700 dark:text-amber-400 text-sm">
            For a complete list of supported models, their dimensions, and usage guidelines, see the{' '}
            <Link href="/api-reference/embjson/supported-llm-modes" className="text-amber-600 dark:text-amber-400 font-medium hover:underline">
              Supported LLM Modes
            </Link>{' '}
            documentation.
          </p>
        </div>
        
        <h2>Chunking</h2>
        
        <p>
          When you store text using <code>EmbText</code>, CapyDB automatically chunks the text into smaller segments 
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
    "@embText": {
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
  https://api.capydb.com/v0/db/project_id_database_name/collection/articles/document \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Introduction to Machine Learning",
    "author": "Jane Smith",
    "content": {
      "@embText": {
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
url = "https://api.capydb.com/v0/db/project_id_database_name/collection/articles/document"

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
        "@embText": {
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
          javascript={`// JavaScript example
const document = {
  title: "Introduction to Machine Learning",
  author: "Jane Smith",
  content: {
    "@embText": {
      text: "Machine learning is a field of study that gives computers the ability to learn without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves.",
      emb_model: "text-embedding-3-large",
      max_chunk_size: 150,
      chunk_overlap: 15
    }
  }
};

// Insert the document
await collection.insertOne(document);`}
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
            </Link> - Embed and search images
          </li>
          <li>
            <Link href="/api-reference/documents/query" className="text-blue-600 dark:text-blue-400 hover:underline">
              Query Documents
            </Link> - Perform semantic search on embedded text
          </li>
        </ul>
        
        <Feedback />
      </div>
    </DocLayout>
  );
} 