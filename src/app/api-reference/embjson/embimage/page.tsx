import DocLayout from '@/components/DocLayout';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ApiCodeBlock from '@/components/ApiCodeBlock';

export default function EmbImagePage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>EmbImage</h1>
        
        <p>
          <code>EmbImage</code> is a special type in CapybaraDB that allows you to store images that can be processed by 
          vision models to extract textual descriptions and optionally embedded for semantic search. This enables 
          powerful visual search capabilities and the ability to query your image data using natural language.
        </p>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> <code>EmbImage</code> fields are processed asynchronously. When you insert or update a document 
          with <code>EmbImage</code> fields, the document is stored immediately, but the image processing and embedding happens in the background.
          You can track the status of this process using the <code>task_id</code> returned in the response.
        </div>
        
        <h2>Format</h2>
        
        <p>
          The <code>EmbImage</code> type is represented in JSON as an object with the <code>$embImage</code> key:
        </p>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "$embImage": {
    "data": "base64_encoded_image_data",
    "vision_model": "gpt-4o",
    "emb_model": "text-embedding-3-small",
    "prompt": "Describe this image in detail"
  }
}`}
        </SyntaxHighlighter>
        
        <p>
          For simple cases, you can also use a shorthand format with a URL:
        </p>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "$embImage": "https://example.com/image.jpg"
}`}
        </SyntaxHighlighter>
        
        <p>
          This shorthand will use the default vision and embedding models with default parameters.
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>data</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Base64-encoded image data or a URL to an image</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>vision_model</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The vision model to use for image understanding. Defaults to <code>gpt-4o</code></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>emb_model</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The embedding model to use for the extracted text. Defaults to <code>text-embedding-3-small</code></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>prompt</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Custom prompt to guide the vision model's description of the image. Defaults to a general description prompt</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Supported Vision Models</h2>
        
        <p>The following vision models are supported for <code>EmbImage</code>:</p>
        
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Model</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>gpt-4o</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">High-quality image understanding with detailed descriptions</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>gpt-4o-mini</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Smaller, faster version with reduced capabilities</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>gpt-4-turbo</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Optimized version balancing performance and quality</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><code>o1</code></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Advanced vision model with enhanced capabilities for complex visual reasoning</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Supported Embedding Models</h2>
        
        <p>
          After the vision model extracts a textual description from the image, this text can be embedded using 
          one of the following embedding models:
        </p>
        
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
          </tbody>
        </table>
        
        <h2>How It Works</h2>
        
        <p>
          When you store an image using <code>EmbImage</code>, CapybaraDB processes it in the following steps:
        </p>
        
        <ol>
          <li>The image is stored in the document</li>
          <li>The specified vision model analyzes the image and generates a detailed textual description</li>
          <li>This textual description is embedded using the specified embedding model</li>
          <li>The embedding is indexed for semantic search</li>
        </ol>
        
        <p>
          This process allows you to:
        </p>
        
        <ul>
          <li>Search for images using natural language queries</li>
          <li>Find images with similar visual content</li>
          <li>Extract and index information contained in images</li>
        </ul>
        
        <h2>Example Usage</h2>
        
        <h3>JSON Example</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "title": "Mountain Landscape",
  "photographer": "John Doe",
  "image": {
    "$embImage": {
      "data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/...",
      "vision_model": "gpt-4o",
      "emb_model": "text-embedding-3-large",
      "prompt": "Describe this landscape in detail, including geographical features and weather conditions"
    }
  }
}`}
        </SyntaxHighlighter>
        
        <h3>REST API Examples</h3>
        
        <ApiCodeBlock
          curl={`curl -X POST \\
  https://api.capybaradb.co/v0/db/project_id_database_name/collection/photos/document \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Mountain Landscape",
    "photographer": "John Doe",
    "image": {
      "$embImage": {
        "data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/...",
        "vision_model": "gpt-4o",
        "emb_model": "text-embedding-3-large",
        "prompt": "Describe this landscape in detail, including geographical features and weather conditions"
      }
    }
  }'`}
          python={`import requests
import json
import base64

# API endpoint
url = "https://api.capybaradb.co/v0/db/project_id_database_name/collection/photos/document"

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
    "title": "Mountain Landscape",
    "photographer": "John Doe",
    "image": {
        "$embImage": {
            "data": f"data:image/jpeg;base64,{image_data}",
            "vision_model": "gpt-4o",
            "emb_model": "text-embedding-3-large",
            "prompt": "Describe this landscape in detail, including geographical features and weather conditions"
        }
    }
}

# Make the request
response = requests.post(url, headers=headers, json=data)

# Process the response
if response.status_code == 201:
    result = response.json()
    print(f"Inserted document with ID: {result['data']['inserted_ids'][0]}")
    print(f"Task ID for image processing: {result['data']['task_id']}")
else:
    print(f"Error: {response.status_code}")
    print(response.text)`}
          javascript={`// API endpoint
const url = 'https://api.capybaradb.co/v0/db/project_id_database_name/collection/photos/document';

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
      title: 'Mountain Landscape',
      photographer: 'John Doe',
      image: {
        $embImage: {
          data: \`data:image/jpeg;base64,\${imageData}\`,
          vision_model: 'gpt-4o',
          emb_model: 'text-embedding-3-large',
          prompt: 'Describe this landscape in detail, including geographical features and weather conditions'
        }
      }
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
      console.log('Task ID for image processing:', result.data.task_id);
    } else {
      console.error('Error:', result);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

insertDocument();`}
        />
        
        <h2>Related Resources</h2>
        
        <ul>
          <li>
            <Link href="/api-reference/embjson" className="text-blue-600 dark:text-blue-400 hover:underline">
              EmbJSON Overview
            </Link> - Learn about all EmbJSON types
          </li>
          <li>
            <Link href="/api-reference/embjson/embtext" className="text-blue-600 dark:text-blue-400 hover:underline">
              EmbText
            </Link> - Documentation for the EmbText type
          </li>
          <li>
            <Link href="/api-reference/documents/query" className="text-blue-600 dark:text-blue-400 hover:underline">
              Query Documents
            </Link> - Learn how to perform semantic search on EmbImage fields
          </li>
        </ul>
      </div>
    </DocLayout>
  );
} 