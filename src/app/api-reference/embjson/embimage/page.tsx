import DocLayout from '@/components/DocLayout';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ApiCodeBlock from '@/components/ApiCodeBlock';
import Feedback from '@/components/Feedback';

export default function EmbImagePage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>EmbImage</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="mb-4">
            The <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-amber-600 dark:text-amber-400 font-mono text-sm">EmbImage</code> endpoint allows you to generate embeddings from images. 
            This is useful for image similarity search, visual content analysis, and multimodal applications.
          </p>
          <div className="bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20 dark:border-amber-500/20 rounded-lg p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-200">
              <strong>Note:</strong> For text embedding generation, see the{' '}
              <Link href="/api-reference/embjson/embtext" className="text-amber-600 dark:text-amber-400 hover:text-amber-500">
                EmbText
              </Link>{' '}
              endpoint.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Endpoint</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 font-mono">
            <p className="text-amber-600 dark:text-amber-400">POST https://api.capydb.com/v1/embjson/embimage</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Request</h2>
          <h3 className="text-xl font-semibold mb-2">Headers</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Header
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-amber-600 dark:text-amber-400">
                    Authorization
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    Your API key in the format: <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-amber-600 dark:text-amber-400 font-mono text-sm">Bearer YOUR_API_KEY</code>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-amber-600 dark:text-amber-400">
                    Content-Type
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-amber-600 dark:text-amber-400 font-mono text-sm">application/json</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mb-2">Body</h3>
          <p className="mb-4">
            The request body should be a JSON object with the following properties:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Property
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Required
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-amber-600 dark:text-amber-400">
                    url
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    string
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    URL to the image to be processed
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    Yes
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-amber-600 dark:text-amber-400">
                    mime_type
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    string
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    The MIME type of the image. Supported types include <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-amber-600 dark:text-amber-400 font-mono text-sm">image/jpeg</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-amber-600 dark:text-amber-400 font-mono text-sm">image/jpg</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-amber-600 dark:text-amber-400 font-mono text-sm">image/png</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-amber-600 dark:text-amber-400 font-mono text-sm">image/gif</code>, and <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-amber-600 dark:text-amber-400 font-mono text-sm">image/webp</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    Yes
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-amber-600 dark:text-amber-400">
                    model
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    string
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    The model to use for embedding generation. Default is <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-amber-600 dark:text-amber-400 font-mono text-sm">clip</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    No
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Response</h2>
          <p className="mb-4">
            The response is a JSON object with the following properties:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Property
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-amber-600 dark:text-amber-400">
                    embedding
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    array
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    An array of floating-point numbers representing the image embedding
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-amber-600 dark:text-amber-400">
                    model
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    string
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    The model used for embedding generation
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Supported Vision Models</h2>
          
          <p className="mb-4">
            CapyDB supports various vision models for image embedding, including <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-amber-600 dark:text-amber-400 font-mono text-sm">clip-vit-base-patch32</code> (default), 
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-amber-600 dark:text-amber-400 font-mono text-sm">clip-vit-large-patch14</code>, and 
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-amber-600 dark:text-amber-400 font-mono text-sm">openai-vision</code>.
          </p>
          
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mb-6">
            <p className="text-amber-700 dark:text-amber-400 text-sm">
              For a complete list of supported vision models, their dimensions, and usage guidelines, see the{' '}
              <Link href="/api-reference/embjson/supported-llm-modes" className="text-amber-600 dark:text-amber-400 font-medium hover:underline">
                Supported LLM Modes
              </Link>{' '}
              documentation.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Example Usage</h2>
          
          <h3 className="text-xl font-semibold mb-2">Request Body Example</h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
            <pre>{JSON.stringify({
              "url": "https://example.com/image.jpg",
              "mime_type": "image/jpeg",
              "model": "clip"
            }, null, 2)}</pre>
          </div>
          
          <h3 className="text-xl font-semibold mb-4">REST API Examples</h3>
          <ApiCodeBlock
            curl={`curl -X POST https://api.capydb.com/v1/embjson/embimage \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com/image.jpg",
    "mime_type": "image/jpeg",
    "model": "clip"
  }'`}
            python={`import requests

# Load the image URL
image_url = "https://example.com/image.jpg"

# Make the API request
response = requests.post(
    "https://api.capydb.com/v1/embjson/embimage",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    },
    json={
        "url": image_url,
        "mime_type": "image/jpeg",
        "model": "clip"
    }
)

# Check if the request was successful
if response.status_code == 200:
    result = response.json()
    embedding = result["embedding"]
    model = result["model"]
    print(f"Generated embedding with {len(embedding)} dimensions using {model} model")
else:
    print(f"Error: {response.status_code}")
    print(response.text)`}
            javascript={`// Make the API request
async function generateImageEmbedding() {
  try {
    const imageUrl = 'https://example.com/image.jpg';
    
    const response = await fetch('https://api.capydb.com/v1/embjson/embimage', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: imageUrl,
        mime_type: 'image/jpeg',
        model: 'clip'
      })
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const result = await response.json();
    const { embedding, model } = result;
    console.log(\`Generated embedding with \${embedding.length} dimensions using \${model} model\`);
    return embedding;
  } catch (error) {
    console.error('Error generating image embedding:', error);
  }
}`}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Related</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <Link href="/api-reference/embjson" className="text-amber-600 dark:text-amber-400 hover:text-amber-500">
                EmbJSON Overview
              </Link>
            </li>
            <li>
              <Link href="/api-reference/embjson/embtext" className="text-amber-600 dark:text-amber-400 hover:text-amber-500">
                EmbText
              </Link>
            </li>
            <li>
              <Link href="/api-reference/query" className="text-amber-600 dark:text-amber-400 hover:text-amber-500">
                Query Documents
              </Link>
            </li>
          </ul>
        </div>

        <Feedback />
      </div>
    </DocLayout>
  );
} 