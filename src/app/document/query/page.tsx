import DocLayout from '@/components/DocLayout';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';
import Feedback from '@/components/Feedback';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from 'next/link';

export default function QueryPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Query</h1>
        
        <LanguageToggle />
        
        <p>
          This guide explains how to perform <strong>semantic queries</strong> on documents in CapybaraDB. 
          Semantic queries retrieve documents by matching the meaning of the provided query text with <strong>EmbJSONs</strong> in the database.
        </p>
        
        <p>
          <strong>The query operation returns a list of matched chunks from EmbJSONs in the collection. 
          Only EmbJSONs with the same emb_model as the query text are included in the semantic search.</strong> 
          EmbJSONs with differing <code>emb_model</code> are excluded from the semantic search.
        </p>
        
        <h3>Example Code for <code>query</code> Operation</h3>
        
        <LanguageContent language="python">
          <p>
            Below is an example of how to perform a semantic query using Python. 
            This example includes <strong>EmbJSON</strong> fields that align with the type of data you may have inserted previously:
          </p>
          
          <SyntaxHighlighter language="python" style={atomDark} showLineNumbers>
            {`query_text = "Software engineer with expertise in AI"

response = collection.query(query)`}
          </SyntaxHighlighter>
          
          <p>Alternatively, you can use an advanced query with optional parameters like so:</p>
          
          <SyntaxHighlighter language="python" style={atomDark} showLineNumbers>
            {`query_text = "Software engineer with expertise in AI"
emb_model = "text-embedding-3-small" # Optional
top_k = 3 # Optional
include_values = True # Optional
projection = {
    "mode": "include",
    "fields": ["name", "bio"]
} # Optional

response = collection.query(query, emb_model=emb_model, top_k=top_k, include_values=include_values, projection=projection)`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <p>
            Below is an example of how to perform a semantic query using TypeScript. 
            This example includes <strong>EmbJSON</strong> fields that align with the type of data you may have inserted previously:
          </p>
          
          <SyntaxHighlighter language="typescript" style={atomDark} showLineNumbers>
            {`const queryText = "Software engineer with expertise in AI";

const response = collection.query(query);`}
          </SyntaxHighlighter>
          
          <p>Alternatively, you can use an advanced query with optional parameters like so:</p>
          
          <SyntaxHighlighter language="typescript" style={atomDark} showLineNumbers>
            {`const query = "Software engineer with expertise in AI";
const embModel = "text-embedding-3-small"; // Optional
const topK = 3; // Optional
const includeValues = true; // Optional
const projection = {
  mode: "include",
  fields: ["name", "bio"],
}; // Optional

const response = collection.query(query, {
  embModel,
  topK,
  includeValues,
  projection,
});`}
          </SyntaxHighlighter>
        </LanguageContent>
        
        <h3>Default Response</h3>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "matches": [
    {
      "chunk": "John is a software engineer with expertise in AI.",
      "path": "bio", # the path of this chunk in the document
      "chunk_n": 0, # the index number of this chunk in the EmbJSON
      "score": 0.95,
      "document": {
        "_id": ObjectId("64d2f8f01234abcd5678ef90"),
      }
    },
    {
      "chunk": "Alice is a data scientist with a background in machine learning.",
      "path": "bio",
      "chunk_n": 1,
      "score": 0.89,
      "document": {
        "_id": ObjectId("64d2f8f01234abcd5678ef91"),
      }
    }
  ]
}`}
        </SyntaxHighlighter>
        
        <p>
          The matches field contains an array of documents that were semantically matched, 
          with additional metadata about the matched chunks, such as path, chunk, score, and values if requested. 
          Note that only documents containing <strong>EmbJSON</strong> fields are returned in the response.
        </p>
        
        <h3>Detailed Response with Additional Parameters</h3>
        
        <p>
          If you use additional parameters such as <code>include_values</code> or <code>projection</code>, 
          the response will include more details.
        </p>
        
        <SyntaxHighlighter language="json" style={atomDark} showLineNumbers>
          {`{
  "matches": [
    {
      "path": "bio",
      "chunk": "John is a software engineer with expertise in AI.",
      "chunk_n": 0,
      "score": 0.95,
      "values": [
        0.123, 0.456, 0.789, ...
      ], # Vector values of this chunk. (include_values = True)
      "document": {
        "_id": ObjectId("64d2f8f01234abcd5678ef90"),
        "name": "John Doe",
        "bio": EmbText("John is a software engineer with expertise in AI.")
      }, # Specified fields in the projection will be returned
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
      },
    }
  ]
}`}
        </SyntaxHighlighter>
        
        <p>
          In this response, only the _id field is included in the document since the projection parameter was not specified.
        </p>
        
        <h3>Query Parameters</h3>
        
        <table className="w-full border-collapse my-4">
          <thead>
            <tr>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Parameter</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Description</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Data Type / Format</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>query</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                The text to be embedded and matched against stored EmbJSON fields. This parameter is required.
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>emb_model</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                The embedding model used for the query. Defaults to OpenAI's text-embedding-3-small. 
                Users can select from supported embedding models listed at /models. 
                Refer to <Link href="/models" className="text-blue-600 dark:text-blue-400 hover:underline">Supported Embedding Models</Link> for more details. 
                If the specified model does not match those used in the stored EmbJSON, only matching fields will be targeted.
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>top_k</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Specifies the maximum number of top-matching chunks to return, sorted by semantic similarity. 
                Default is 10. Use <strong>top_k</strong> to control how many chunks are returned, 
                ensuring you receive the most relevant semantic matches.
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">integer</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>include_values</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Boolean flag to include vector values for each matched chunk in the response. 
                Default is false. Set <strong>include_values</strong> to true to include the actual vector values 
                of each matched chunk in the response.
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">boolean</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>projection</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Defines which fields to return in the response. The default value is <code>{`{ "mode": "exclude" }`}</code>. 
                Accepts a required <code>mode</code> (include or exclude) and an optional <code>fields</code> list. 
                See the table below for how different values of <code>projection</code> affect the response.
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">JSON object</td>
            </tr>
          </tbody>
        </table>
        
        <div className="p-4 my-4 border-l-4 rounded-r-md bg-blue-50 border-blue-500 dark:bg-blue-900/30 dark:border-blue-400">
          <h3>Format of <code>projection</code> Parameter</h3>
          
          <table className="w-full border-collapse my-4">
            <thead>
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Key</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Description</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Format</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>mode</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <strong>Required.</strong> Specifies whether to include or exclude certain fields in the response.
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  string (<code>"include"</code> or <code>"exclude"</code>)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>fields</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <strong>Optional.</strong> A list of specific fields to include or exclude based on the <code>mode</code> setting.
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  list of strings (<code>{`["field1", "field2"]`}</code>)
                </td>
              </tr>
            </tbody>
          </table>
          
          <h3>Projection Parameter Scenarios</h3>
          
          <table className="w-full border-collapse my-4">
            <thead>
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Example Projection Value</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>{`{ "mode": "include" }`}</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  The entire document is returned.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>{`{ "mode": "include", "fields": ["title", "author"] }`}</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Only the <code>title</code> and <code>author</code> fields are returned.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>{`{ "mode": "exclude" }`}</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Only the <code>_id</code> field is returned.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>{`{ "mode": "exclude", "fields": ["title", "author"] }`}</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  All fields except <code>title</code> and <code>author</code> are returned.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3>How can we improve this documentation?</h3>
        
        <Feedback />
        
        <h3>Got question? <a href="mailto:hello@capybaradb.co" className="text-blue-600 dark:text-blue-400 hover:underline">Email us</a></h3>
      </div>
    </DocLayout>
  );
} 