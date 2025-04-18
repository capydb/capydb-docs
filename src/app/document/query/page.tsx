'use client';
import DocLayout from '@/components/DocLayout';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';
import Feedback from '@/components/Feedback';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from 'next/link';
import CopyButton from '@/components/CopyButton';

export default function QueryPage() {
  const basicPythonCode = `# Simple query example
query_text = "Software engineer with expertise in AI"

response = collection.query(query_text)

# Process the results - response is now a list of matches
for match in response:
    print(f"Match: {match['chunk']} (Score: {match['score']})")`;

  const basicTypescriptCode = `// Simple query example
const queryText = "Software engineer with expertise in AI";

const response = collection.query(queryText);

// Process the results - response is now an array of matches
response.forEach(match => {
  console.log(\`Match: \${match.chunk} (Score: \${match.score})\`);
});`;

  const advancedPythonCode = `# Advanced query with optional parameters
query_text = "Software engineer with expertise in AI"
emb_model = "text-embedding-3-small"  # Optional
top_k = 3  # Optional
include_values = True  # Optional
projection = {
    "mode": "include",
    "fields": ["name", "bio"]
}  # Optional

response = collection.query(
    query_text, 
    filter={"status": "active"}, 
    projection=projection,
    emb_model=emb_model, 
    top_k=top_k, 
    include_values=include_values
)

# Process the results - response is now a list of matches
for match in response:
    print(f"Match: {match['chunk']} (Score: {match['score']})")
    print(f"From document: {match['document']['_id']}")`;

  const advancedTypescriptCode = `// Advanced query with optional parameters
const queryText = "Software engineer with expertise in AI";
const embModel = "text-embedding-3-small"; // Optional
const topK = 3; // Optional
const includeValues = true; // Optional
const projection = {
  mode: "include",
  fields: ["name", "bio"],
}; // Optional

const response = collection.query(queryText, {
  filter: { status: "active" },
  projection,
  embModel,
  topK,
  includeValues,
});

// Process the results - response is now an array of matches
response.forEach(match => {
  console.log(\`Match: \${match.chunk} (Score: \${match.score})\`);
  console.log(\`From document: \${match.document._id}\`);
});`;

  const jsonResponse = `[
  {
    "chunk": "John is a software engineer with expertise in AI.",
    "path": "bio",
    "chunk_n": 0,
    "score": 0.95,
    "document": {
      "_id": ObjectId("64d2f8f01234abcd5678ef90")
      // All document fields are returned here (name, bio, skills, etc.)
    }
  },
  {
    "chunk": "Alice is a data scientist with a background in machine learning.",
    "path": "bio",
    "chunk_n": 1,
    "score": 0.89,
    "document": {
      "_id": ObjectId("64d2f8f01234abcd5678ef91")
      // Complete document data is returned by default
    }
  }
]`;

  const jsonDetailedResponse = `[
  {
    "path": "bio",
    "chunk": "John is a software engineer with expertise in AI.",
    "chunk_n": 0,
    "score": 0.95,
    "values": [
      0.123, 0.456, 0.789, ...
    ],
    "document": {
      "_id": ObjectId("64d2f8f01234abcd5678ef90"),
      "name": "John Doe",
      "bio": EmbText("John is a software engineer with expertise in AI.")
    }
  },
  {
    "path": "bio",
    "chunk": "Alice is a data scientist with a background in machine learning.",
    "chunk_n": 1,
    "score": 0.89,
    "values": [
      0.234, 0.567, 0.890, ...
    ],
    "document": {
      "_id": ObjectId("64d2f8f01234abcd5678ef91"),
      "name": "Alice Smith",
      "bio": EmbText("Alice is a data scientist with a background in machine learning.")
    }
  }
]`;

  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Query</h1>
        
        <LanguageToggle />
        
        <p>
          This guide explains how to perform <strong>semantic queries</strong> on documents in CapyDB. 
          Semantic queries retrieve documents by matching the meaning of the provided query text with <strong>EmbJSONs</strong> in the database.
        </p>
        
        <p>
          <strong>The query operation returns a list of matched chunks from EmbJSONs in the collection. 
          Only EmbJSONs with the same emb_model as the query text are included in the semantic search.</strong> 
          EmbJSONs with differing <code>emb_model</code> are excluded from the semantic search.
        </p>
        
        <h2>Basic Query Operation</h2>
        
        <p>
          The simplest way to use the <code>query</code> operation is to just provide the query text.
          This offers an easy and intuitive way to search your data semantically without worrying about additional parameters.
        </p>
        
        <h3>Basic Example</h3>
        
        <LanguageContent language="python">
          <div className="relative">
            <CopyButton code={basicPythonCode} />
            <SyntaxHighlighter 
              language="python" 
              style={atomDark}
              showLineNumbers={false}
              customStyle={{
                margin: 0,
                borderRadius: '0.75rem',
                background: '#1a1a1a',
                padding: '2rem',
              }}
            >
              {basicPythonCode}
            </SyntaxHighlighter>
          </div>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <div className="relative">
            <CopyButton code={basicTypescriptCode} />
            <SyntaxHighlighter 
              language="typescript" 
              style={atomDark}
              showLineNumbers={false}
              customStyle={{
                margin: 0,
                borderRadius: '0.75rem',
                background: '#1a1a1a',
                padding: '2rem',
              }}
            >
              {basicTypescriptCode}
            </SyntaxHighlighter>
          </div>
        </LanguageContent>
        
        <h3>Default Response</h3>
        
        <p>
          A successful query operation will return a JSON array containing the matching documents. 
          By default, the response includes the matched text chunks, their location in the document, similarity scores, and basic document metadata:
        </p>
        
        <div className="relative">
          <CopyButton code={jsonResponse} />
          <SyntaxHighlighter 
            language="json" 
            style={atomDark}
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              borderRadius: '0.75rem',
              background: '#1a1a1a',
              padding: '2rem',
            }}
          >
            {jsonResponse}
          </SyntaxHighlighter>
        </div>
        
        <p>
          By default, the system will:
        </p>
        <ul>
          <li>Use OpenAI's text-embedding-3-small as the embedding model</li>
          <li>Return the top 10 matching results</li>
          <li>Exclude the vector values from the response</li>
          <li>Return the whole document data, not just minimal metadata</li>
        </ul>
        
        <h2>Advanced Query Operation</h2>
        
        <p>
          For more control over your semantic searches, you can customize the query operation with additional parameters.
          These parameters allow you to fine-tune the search behavior, filter results, and specify what data to include in the response.
        </p>
        
        <h3>Advanced Example with Optional Parameters</h3>
        
        <LanguageContent language="python">
          <div className="relative">
            <CopyButton code={advancedPythonCode} />
            <SyntaxHighlighter 
              language="python" 
              style={atomDark}
              showLineNumbers={false}
              customStyle={{
                margin: 0,
                borderRadius: '0.75rem',
                background: '#1a1a1a',
                padding: '2rem',
              }}
            >
              {advancedPythonCode}
            </SyntaxHighlighter>
          </div>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <div className="relative">
            <CopyButton code={advancedTypescriptCode} />
            <SyntaxHighlighter 
              language="typescript" 
              style={atomDark}
              showLineNumbers={false}
              customStyle={{
                margin: 0,
                borderRadius: '0.75rem',
                background: '#1a1a1a',
                padding: '2rem',
              }}
            >
              {advancedTypescriptCode}
            </SyntaxHighlighter>
          </div>
        </LanguageContent>
        
        <h3>Detailed Response with Additional Parameters</h3>
        
        <p>
          When you customize the query with additional parameters like <code>include_values</code> or <code>projection</code>, 
          the response array can include more detailed information:
        </p>
        
        <div className="relative">
          <CopyButton code={jsonDetailedResponse} />
          <SyntaxHighlighter 
            language="json" 
            style={atomDark}
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              borderRadius: '0.75rem',
              background: '#1a1a1a',
              padding: '2rem',
            }}
          >
            {jsonDetailedResponse}
          </SyntaxHighlighter>
        </div>
        
        <h2>Parameters for Query Operations</h2>
        
        <table className="w-full border-collapse my-4">
          <thead>
            <tr>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Parameter</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>query</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                The text to be embedded and matched against stored EmbJSON fields. This parameter is required.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>filter</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                MongoDB-style query filter to apply to documents before semantic search. 
                This helps narrow down the document set before performing the semantic search.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>projection</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Specifies which fields to include or exclude in the returned documents.
                Format: <code>{"{"}"mode": "include", "fields": ["field1", "field2"]{"}"}</code> or 
                <code>{"{"}"mode": "exclude", "fields": ["field3"]{"}"}</code>.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>emb_model</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                The embedding model used for the query. Defaults to OpenAI's text-embedding-3-small. 
                Users can select from supported embedding models. 
                If the specified model does not match those used in the stored EmbJSON, only matching fields will be targeted.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>top_k</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                The maximum number of matches to return. Defaults to 10. Increase this value to get more results,
                decrease it to improve performance and reduce response size.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>include_values</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Whether to include the embedding vector values in the response. Defaults to false.
                Set to true if you need the raw vector data for further processing.
              </td>
            </tr>
          </tbody>
        </table>
        
        <h2>Common Use Cases</h2>
        
        <h3>1. Simple Semantic Search</h3>
        <p>
          When you need to quickly search for documents related to a concept:
        </p>
        <LanguageContent language="python">
          <SyntaxHighlighter 
            language="python" 
            style={atomDark}
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              borderRadius: '0.75rem',
              background: '#1a1a1a',
              padding: '1rem',
            }}
          >
            {`results = collection.query("climate change impact")`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <h3>2. Filtered Semantic Search</h3>
        <p>
          When you need to search within a specific category or subset of documents:
        </p>
        <LanguageContent language="python">
          <SyntaxHighlighter 
            language="python" 
            style={atomDark}
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              borderRadius: '0.75rem',
              background: '#1a1a1a',
              padding: '1rem',
            }}
          >
            {`results = collection.query(
    "renewable energy solutions",
    filter={"category": "science", "published": True}
)`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <h3>3. Limited Result Set</h3>
        <p>
          When you only need the top few most relevant matches:
        </p>
        <LanguageContent language="python">
          <SyntaxHighlighter 
            language="python" 
            style={atomDark}
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              borderRadius: '0.75rem',
              background: '#1a1a1a',
              padding: '1rem',
            }}
          >
            {`results = collection.query("machine learning techniques", top_k=3)`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <h3>4. Specific Fields Retrieval</h3>
        <p>
          When you need to include specific fields in the response:
        </p>
        <LanguageContent language="python">
          <SyntaxHighlighter 
            language="python" 
            style={atomDark}
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              borderRadius: '0.75rem',
              background: '#1a1a1a',
              padding: '1rem',
            }}
          >
            {`projection = {"mode": "include", "fields": ["title", "abstract", "author"]}
results = collection.query("quantum computing", projection=projection)`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <Feedback />
      </div>
    </DocLayout>
  );
} 