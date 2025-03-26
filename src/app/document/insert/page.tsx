'use client';

import DocLayout from '@/components/DocLayout';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';
import Feedback from '@/components/Feedback';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CopyButton from '@/components/CopyButton';

export default function InsertPage() {
  const pythonCode = `from capydb import EmbText

docs = [{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "age": 30,
    "bio": EmbText("John is a software engineer with expertise in AI.")
}]


# Sending the request
response = collection.insert(docs)`;

  const typescriptCode = `import { EmbText } from "capydb";

const docs = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    age: 30,
    bio: new EmbText("John is a software engineer with expertise in AI."),
  },
];

response = collection.insert(docs);`;

  const jsonResponse = `{
  "inserted_ids": [
    "64d2f8f01234abcd5678ef90",
    "64d2f8f01234abcd5678ef91",
    "64d2f8f01234abcd5678ef92"
  ],
  "task_id": "abc123xyz" // or \`null\` if all processes were synchronously completed
}`;

  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Insert</h1>
        
        <LanguageToggle />
        
        <p>
          CapyDB supports <strong>MongoDB Extended JSON</strong> and <strong>EmbJSON</strong> (CapyDB Extended JSON). 
          This guide explains how to insert documents into CapyDB.
        </p>
        
        <h3>Example Code for <code>insert</code> Operation</h3>
        
        <LanguageContent language="python">
          <p>
            Here's an example of how to insert documents using Python. You can insert a single document or multiple 
            documents using the same endpoint. This example includes documents with Object IDs and <strong>EmbJSON</strong> fields:
          </p>
          
          <div className="relative">
            <CopyButton code={pythonCode} />
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
              {pythonCode}
            </SyntaxHighlighter>
          </div>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <p>
            Here's an example of how to insert documents using TypeScript with the <code>fetch</code> API. 
            You can insert a single document or multiple documents using the same endpoint. 
            This example includes documents with Object IDs and <strong>EmbJSON</strong> fields:
          </p>
          
          <div className="relative">
            <CopyButton code={typescriptCode} />
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
              {typescriptCode}
            </SyntaxHighlighter>
          </div>
        </LanguageContent>
        
        <h3>Insert Response</h3>
        
        <p>A successful insert operation will return the following JSON response:</p>
        
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
          The <code>inserted_ids</code> field contains the IDs of the successfully inserted documents. 
          The <code>task_id</code> field will have a value if there is an asynchronous task related to EmbJSON. 
          If <code>task_id</code> is <code>null</code>, it indicates that all processes, including embedding and indexing, 
          were completed synchronously.
        </p>
        
        <h3>How can we improve this documentation?</h3>
        
        <Feedback />
        
        <h3>Got question? <a href="mailto:hello@capydb.com">Email us</a></h3>
      </div>
    </DocLayout>
  );
} 