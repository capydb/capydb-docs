import DocLayout from '@/components/DocLayout';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function EmbJSONPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>EmbJSON Types</h1>
        
        <p>
          EmbJSON is CapybaraDB's extension to standard JSON that adds special types for embedding and vector operations.
          These types enable powerful semantic search capabilities, allowing you to query your data using natural language
          and find documents based on meaning rather than exact keyword matches.
        </p>
        
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md my-4 text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> EmbJSON fields are processed asynchronously. When you insert or update a document 
          with EmbJSON fields, the document is stored immediately, but the embedding process happens in the background.
          You can track the status of this process using the <code>task_id</code> returned in the response.
        </div>
        
        <h2>Available EmbJSON Types</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">
              <Link href="/api-reference/embjson/embtext" className="text-blue-600 dark:text-blue-400 hover:underline">
                EmbText
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Text that is automatically chunked, embedded, and indexed for semantic search
            </p>
            <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <code className="break-all">{`{"$embText": "Text content to be embedded"}`}</code>
            </div>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">
              <Link href="/api-reference/embjson/embimage" className="text-blue-600 dark:text-blue-400 hover:underline">
                EmbImage
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Images processed by vision models to extract textual descriptions and optionally embedded for semantic search
            </p>
            <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <code className="break-all">{`{"$embImage": "https://example.com/image.jpg"}`}</code>
            </div>
          </div>
        </div>
        
        <h2>How EmbJSON Works</h2>
        
        <p>
          EmbJSON types are special JSON objects that trigger automatic processing in CapybaraDB:
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
    "$embText": "A comprehensive guide to hiking in the Rocky Mountains, including trail information, safety tips, and equipment recommendations."
  },
  "cover_image": {
    "$embImage": {
      "data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/...",
      "vision_model": "gpt-4o",
      "prompt": "Describe this mountain landscape in detail"
    }
  },
  "tags": ["hiking", "mountains", "outdoors"],
  "published_date": "2023-09-15"
}`}
        </SyntaxHighlighter>
        
        <h2>Using EmbJSON with the Python SDK</h2>
        
        <p>
          The CapybaraDB Python SDK provides convenient classes for working with EmbJSON types:
        </p>
        
        <SyntaxHighlighter language="python" style={atomDark} showLineNumbers>
          {`from capybaradb import CapybaraDB, EmbText, EmbImage
import base64

# Initialize the client
client = CapybaraDB(api_key="your_api_key")
db = client.database("your_project_your_database")
collection = db.collection("guides")

# Load image data
with open("mountain.jpg", "rb") as image_file:
    image_data = base64.b64encode(image_file.read()).decode('utf-8')

# Create a document with EmbJSON types
document = {
    "title": "Mountain Hiking Guide",
    "author": "Jane Smith",
    "description": EmbText(
        text="A comprehensive guide to hiking in the Rocky Mountains, including trail information, safety tips, and equipment recommendations.",
        emb_model="text-embedding-3-small"
    ),
    "cover_image": EmbImage(
        data=image_data,
        vision_model="gpt-4o",
        prompt="Describe this mountain landscape in detail"
    ),
    "tags": ["hiking", "mountains", "outdoors"],
    "published_date": "2023-09-15"
}

# Insert the document
result = collection.insert_one(document)
print(f"Inserted document with ID: {result.inserted_id}")
print(f"Task ID for embedding: {result.task_id}")
`}
        </SyntaxHighlighter>
        
        <h2>Querying Documents with EmbJSON Fields</h2>
        
        <p>
          Once documents with EmbJSON fields have been processed, you can perform semantic searches using natural language queries:
        </p>
        
        <SyntaxHighlighter language="python" style={atomDark} showLineNumbers>
          {`# Semantic search using the query endpoint
results = collection.query(
    query="hiking trails with beautiful mountain views",
    embedding_model="text-embedding-3-small",
    top_k=5
)

for doc in results:
    print(f"Title: {doc['title']}")
    print(f"Score: {doc['_score']}")
    print("---")
`}
        </SyntaxHighlighter>
        
        <h2>Detailed Documentation</h2>
        
        <p>
          For detailed information about each EmbJSON type, please visit the following pages:
        </p>
        
        <ul>
          <li>
            <Link href="/api-reference/embjson/embtext" className="text-blue-600 dark:text-blue-400 hover:underline">
              EmbText
            </Link> - Text embedding for semantic search
          </li>
          <li>
            <Link href="/api-reference/embjson/embimage" className="text-blue-600 dark:text-blue-400 hover:underline">
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
            </Link> - Perform semantic search on embedded fields
          </li>
          <li>
            <Link href="/api-reference/documents/update" className="text-blue-600 dark:text-blue-400 hover:underline">
              Update Documents
            </Link> - Modify documents with EmbJSON fields
          </li>
        </ul>
      </div>
    </DocLayout>
  );
} 