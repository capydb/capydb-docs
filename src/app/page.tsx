import DocLayout from '@/components/DocLayout';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';
import Feedback from '@/components/Feedback';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function HomePage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Quick Start</h1>
        
        <LanguageToggle />
        
        <p>
          Welcome to <strong>CapybaraDB</strong>! The chillest AI-native database out there! This guide will help you get started quickly with our powerful API service. 
          Whether you're inserting your first document or exploring advanced features, you'll find everything you need to Save Documents (No Need for Embedding!) in just a few simple steps.
        </p>
        
        <h2>Step 1: Install SDK</h2>
        
        <LanguageContent language="python">
          <SyntaxHighlighter language="bash" style={atomDark}>
            {`pip install capybaradb`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <SyntaxHighlighter language="bash" style={atomDark}>
            {`npm install capybaradb`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <h2>Step 2: Sign Up</h2>
        
        <p>Start by signing up for <strong>CapybaraDB</strong>:</p>
        
        <ol>
          <li>Visit <a href="https://capybaradb.co" className="text-blue-600 dark:text-blue-400 hover:underline">CapybaraDB Sign Up</a>.</li>
          <li>After signing up, you'll be navigated to the developer console.</li>
        </ol>
        
        <h2>Step 3: Get the API Key and the Project ID</h2>
        
        <h3>API Key</h3>
        
        <ol>
          <li>In the sidebar, go to the <strong>API Key</strong> page.</li>
          <li>Click to create a new API key—you can optionally name the key.</li>
          <li>The key will only be displayed once. <strong>Store it securely</strong>.</li>
        </ol>
        
        <h3>Project ID</h3>
        
        <ol>
          <li>Project ID can be found on the welcome page or collection page on the console.</li>
          <li>It's recommended to store project ID securely.</li>
        </ol>
        
        <h3>Setting the API Key and Project URL</h3>
        
        <p>For this quick start guide (non-production environment), directly assign your API key and project ID to variables:</p>
        
        <SyntaxHighlighter language="bash" style={atomDark}>
          {`CAPYBARA_API_KEY = "your_api_key"
CAPYBARA_PROJECT_ID = "your_project_id"`}
        </SyntaxHighlighter>
        
        <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 my-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            <strong>Important:</strong> Only hardcode credentials for local development.
          </p>
          <p className="text-yellow-700 dark:text-yellow-300">
            In production, use environment variables or secure server-side logic for <strong>API Key</strong> and <strong>Collection URL</strong> to prevent unauthorized access and keep information secure.
          </p>
        </div>
        
        <h2>Step 4: Initialize SDK client</h2>
        
        <LanguageContent language="python">
          <SyntaxHighlighter language="python" style={atomDark}>
            {`from capybaradb import CapybaraDB, EmbText
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

client = CapybaraDB()
db = client.db("your_db_name")
collection = db.collection("your_collection_name")`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <SyntaxHighlighter language="typescript" style={atomDark}>
            {`import { CapybaraDB, EmbText } from "capybaradb";
import dotenv from "dotenv";

dotenv.config();

const client = new CapybaraDB();
const db = client.db("your_db_name");
const collection = db.collection("your_collection_name");`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <h2>Step 5: Save Documents (No Embedding Needed!)</h2>
        
        <h3>Example: Insert a Document</h3>
        
        <LanguageContent language="python">
          <SyntaxHighlighter language="python" style={atomDark}>
            {`# Define the document to be inserted
docs = [
    {
        "name": "Alice",
        "age": "7",
        "background": EmbText(
            "Through the Looking-Glass follows Alice as she steps into a fantastical world..."
        ),
    }
]

# Make the POST request to insert the document
response = collection.insert(docs)`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <p>Use TypeScript to insert a doc into the collection:</p>
          
          <SyntaxHighlighter language="typescript" style={atomDark}>
            {`async function main() {
  // Define the document to be inserted
  const docs = [
    {
      name: "Alice",
      age: "7",
      background: new EmbText(
        "Through the Looking-Glass follows Alice as she steps into a fantastical world..."
      ),
    },
  ];

  const result = await collection.insert(docs);
}

main();`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4 my-4">
          <h3 className="text-blue-700 dark:text-blue-300">EmbJSON - What Happens After Saving</h3>
          <p className="text-blue-700 dark:text-blue-300">
            When saving an <code>EmbText</code> data type, CapybaraDB performs additional processing:
          </p>
          <ul className="text-blue-700 dark:text-blue-300">
            <li>The saved data will have an updated field called <code>EmbText.chunks</code> in addition to <code>EmbText.text</code> and <code>EmbText.emb_model</code>.</li>
            <li>Each chunk is vectorized and indexed in the database, enabling efficient querying and similarity searches.</li>
          </ul>
        </div>
        
        <h2>Step 6: Querying the Data</h2>
        
        <h3>Query Request</h3>
        
        <LanguageContent language="python">
          <p>Here's how to perform a query using Python:</p>
          
          <SyntaxHighlighter language="python" style={atomDark}>
            {`query = "Alice in a fantastical world"

response = collection.query(query)`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <p>Here's how to perform a query using TypeScript:</p>
          
          <SyntaxHighlighter language="typescript" style={atomDark}>
            {`async function main() {
  // Define the query
  const query = "Alice in a fantastical world";

  // Execute the query
  const response = await collection.query(query);
}

main();`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <h3>Example Response</h3>
        
        <p>Successful query response:</p>
        
        <SyntaxHighlighter language="json" style={atomDark}>
          {`{
  "matches": [
    {
      "chunk": "Through the Looking-Glass follows Alice as she steps into a fantastical world...",
      "path": "background",
      "chunk_n": 0,
      "score": 0.703643203,
      "document": {"_id": ObjectId("671bf91580bffb6387b4f3d2")}
    }
  ]
}`}
        </SyntaxHighlighter>
        
        <h3>How can we improve this documentation?</h3>
        
        <Feedback />
        
        <h3>Got question? <a href="mailto:hello@capybaradb.co" className="text-blue-600 dark:text-blue-400 hover:underline">Email us</a></h3>
      </div>
    </DocLayout>
  );
} 