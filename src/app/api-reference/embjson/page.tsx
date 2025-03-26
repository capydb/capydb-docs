import DocLayout from '@/components/DocLayout';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ApiCodeBlock from '@/components/ApiCodeBlock';
import Feedback from '@/components/Feedback';

export default function EmbJSONPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>EmbJSON Types</h1>
        
        <p>
          EmbJSON is CapyDB's extension to standard JSON that adds special types for embedding and vector operations.
          These types enable powerful semantic search capabilities, allowing you to query your data using natural language
          and find documents based on meaning rather than exact keyword matches.
        </p>
        
        <div className="bg-blue-50/80 dark:bg-blue-950/30 p-4 rounded-md my-4 text-gray-800 dark:text-gray-200 border border-blue-100 dark:border-blue-900">
          <strong>Note:</strong> EmbJSON fields are processed asynchronously. When you insert or update a document 
          with EmbJSON fields, the document is stored immediately, but the embedding process happens in the background.
          You can track the status of this process using the <code>task_id</code> returned in the response.
        </div>
        
        <h2>Available EmbJSON Types</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">
              <Link href="/api-reference/embjson/embtext" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                EmbText
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Text that is automatically chunked, embedded, and indexed for semantic search
            </p>
            <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <code className="break-all">{`{"@embText": "Text content to be embedded"}`}</code>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">
              <Link href="/api-reference/embjson/embimage" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                EmbImage
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Images processed by vision models to extract textual descriptions and optionally embedded for semantic search
            </p>
            <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <code className="break-all">{`{"@embImage": "https://example.com/image.jpg"}`}</code>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">
              <Link href="/api-reference/embjson/supported-llm-modes" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                Supported LLM Modes
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Comprehensive guide to all supported embedding models for text and images
            </p>
            <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <code className="break-all">{`{"model": "text-embedding-3-small"}`}</code>
            </div>
          </div>
        </div>
        
        <h2>How EmbJSON Works</h2>
        
        <p>
          EmbJSON types are special JSON objects that trigger automatic processing in CapyDB:
        </p>
        
        <ol>
          <li>When you insert or update a document containing EmbJSON fields, the document is stored immediately</li>
          <li>The EmbJSON fields are processed asynchronously in the background</li>
          <li>For <code>EmbText</code>, the text is chunked and embedded</li>
          <li>For <code>EmbImage</code>, the image is analyzed by a vision model to extract a textual description, which is then embedded</li>
          <li>The resulting embeddings are indexed for semantic search</li>
          <li>You can track the status of this process using the <code>task_id</code> returned in the response</li>
        </ol>
        
        <h2>Asynchronous Processing</h2>
        
        <p>
          When you insert or update documents with EmbJSON fields, the API returns a <code>task_id</code> that you can use to track the status of the embedding process.
          The document is available immediately for regular operations, but semantic search capabilities will only be available once the embedding process is complete.
        </p>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`// Response from insert operation with EmbJSON fields
{
  "status": "success",
  "data": {
    "inserted_ids": ["64f5a7b2c3d2e1f0a9b8c7d6"],
    "task_id": "task_123456789"
  }
}`}
        </SyntaxHighlighter>
        
        <h2>Example Document with EmbJSON</h2>
        
        <p>
          Here's an example of a document that uses both <code>EmbText</code> and <code>EmbImage</code> types:
        </p>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "title": "Mountain Hiking Guide",
  "author": "Jane Smith",
  "description": {
    "@embText": "A comprehensive guide to hiking in the Rocky Mountains, including trail information, safety tips, and equipment recommendations."
  },
  "cover_image": {
    "@embImage": {
      "url": "https://example.com/mountain.jpg",
      "vision_model": "gpt-4o",
      "prompt": "Describe this mountain landscape in detail"
    }
  },
  "tags": ["hiking", "mountains", "outdoors"],
  "published_date": "2023-09-15"
}`}
        </SyntaxHighlighter>
        
        <h2>Using EmbJSON with REST API</h2>
        
        <p>
          You can use EmbJSON types directly with the CapyDB REST API:
        </p>
        
        <ApiCodeBlock
          curl={`curl -X POST \\
  https://api.capydb.com/v0/db/project_id_database_name/collection/guides/document \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Mountain Hiking Guide",
    "author": "Jane Smith",
    "description": {
      "@embText": {
        "text": "A comprehensive guide to hiking in the Rocky Mountains, including trail information, safety tips, and equipment recommendations.",
        "emb_model": "text-embedding-3-small"
      }
    },
    "cover_image": {
      "@embImage": {
        "url": "https://example.com/mountain.jpg",
        "vision_model": "gpt-4o",
        "prompt": "Describe this mountain landscape in detail"
      }
    },
    "tags": ["hiking", "mountains", "outdoors"],
    "published_date": "2023-09-15"
  }'`}
          python={`import requests
import json
import base64

# API endpoint
url = "https://api.capydb.com/v0/db/project_id_database_name/collection/guides/document"

# Headers
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

# Load image data
with open("mountain.jpg", "rb") as image_file:
    image_data = base64.b64encode(image_file.read()).decode('utf-8')

# Request body
data = {
    "title": "Mountain Hiking Guide",
    "author": "Jane Smith",
    "description": {
        "@embText": {
            "text": "A comprehensive guide to hiking in the Rocky Mountains, including trail information, safety tips, and equipment recommendations.",
            "emb_model": "text-embedding-3-small"
        }
    },
    "cover_image": {
        "@embImage": {
            "url": "https://example.com/mountain.jpg",
            "vision_model": "gpt-4o",
            "prompt": "Describe this mountain landscape in detail"
        }
    },
    "tags": ["hiking", "mountains", "outdoors"],
    "published_date": "2023-09-15"
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
const url = 'https://api.capydb.com/v0/db/project_id_database_name/collection/guides/document';

// Headers
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};

// Function to load image data (in a real application)
async function loadImageAsBase64(imagePath) {
  // This is a placeholder - in a browser you might use FileReader
  // In Node.js you would use fs.readFile
  return 'base64_encoded_image_data';
}

// Async function to make the request
async function insertDocument() {
  try {
    // In a real application, you would load the image
    const imageData = await loadImageAsBase64('mountain.jpg');
    
    // Request body
    const data = {
      title: 'Mountain Hiking Guide',
      author: 'Jane Smith',
      description: {
        "@embText": {
          text: 'A comprehensive guide to hiking in the Rocky Mountains, including trail information, safety tips, and equipment recommendations.',
          emb_model: 'text-embedding-3-small'
        }
      },
      cover_image: {
        "@embImage": {
          url: "https://example.com/mountain.jpg",
          vision_model: 'gpt-4o',
          prompt: 'Describe this mountain landscape in detail'
        }
      },
      tags: ['hiking', 'mountains', 'outdoors'],
      published_date: '2023-09-15'
    };
    
    // Make the request
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('Inserted document with ID:', result.data.inserted_ids[0]);
      console.log('Task ID for embedding:', result.data.task_id);
    } else {
      console.error('Error:', result);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

insertDocument();`}
        />
        
        <h2>Querying Documents with EmbJSON Fields</h2>
        
        <p>
          Once documents with EmbJSON fields have been processed, you can perform semantic searches using natural language queries:
        </p>
        
        <ApiCodeBlock
          curl={`curl -X POST \\
  https://api.capydb.com/v0/db/project_id_database_name/collection/guides/document/query \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "hiking trails with beautiful mountain views",
    "embedding_model": "text-embedding-3-small",
    "top_k": 5
  }'`}
          python={`import requests
import json

# API endpoint
url = "https://api.capydb.com/v0/db/project_id_database_name/collection/guides/document/query"

# Headers
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

# Request body
data = {
    "query": "hiking trails with beautiful mountain views",
    "embedding_model": "text-embedding-3-small",
    "top_k": 5
}

# Make the request
response = requests.post(url, headers=headers, json=data)

# Process the response
if response.status_code == 200:
    result = response.json()
    matches = result["data"]["matches"]
    
    # Process the matches
    for match in matches:
        print(f"Score: {match['score']}")
        print(f"Document Title: {match['document']['title']}")
        print(f"Matching text: {match['chunk']}")
        print("---")
else:
    print(f"Error: {response.status_code}")
    print(response.text)`}
          javascript={`// API endpoint
const url = 'https://api.capydb.com/v0/db/project_id_database_name/collection/guides/document/query';

// Headers
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};

// Request body
const data = {
  query: 'hiking trails with beautiful mountain views',
  embedding_model: 'text-embedding-3-small',
  top_k: 5
};

// Make the request
fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    const matches = result.data.matches;
    
    // Process the matches
    matches.forEach(match => {
      console.log('Score:', match.score);
      console.log('Document Title:', match.document.title);
      console.log('Matching text:', match.chunk);
      console.log('---');
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });`}
        />
        
        <h2>Related Resources</h2>
        
        <ul>
          <li>
            <Link href="/api-reference/embjson/embtext" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              EmbText
            </Link> - Text embedding for semantic search
          </li>
          <li>
            <Link href="/api-reference/embjson/embimage" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              EmbImage
            </Link> - Image processing and embedding
          </li>
        </ul>
        
        <h2>Related Document Operations</h2>
        
        <p>
          Learn how to use EmbJSON types with the following document operations:
        </p>
        
        <ul>
          <li>
            <Link href="/api-reference/documents/insert" className="text-blue-600 dark:text-blue-400 hover:underline">
              Insert Documents
            </Link> - Add documents with EmbJSON fields
          </li>
          <li>
            <Link href="/api-reference/documents/query" className="text-blue-600 dark:text-blue-400 hover:underline">
              Query Documents
            </Link> - Perform semantic search on documents
          </li>
          <li>
            <Link href="/api-reference/documents/update" className="text-blue-600 dark:text-blue-400 hover:underline">
              Update Documents
            </Link> - Modify documents with EmbJSON fields
          </li>
        </ul>
        
        <Feedback />
      </div>
    </DocLayout>
  );
} 