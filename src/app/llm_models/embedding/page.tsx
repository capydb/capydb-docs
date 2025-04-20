'use client';
import DocLayout from '@/components/DocLayout';
import Feedback from '@/components/Feedback';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';
import ContactUs from '@/components/ContactUs';
export default function EmbeddingModelsPage() {
  const pythonExample = `from capydb import EmbText, EmbModels

{
    "description": EmbText(
        "This is a sample text that will be embedded.",
        emb_model=EmbModels.TEXT_EMBEDDING_3_LARGE
    )
}`;

  const typescriptExample = `import { EmbText, EmbModels } from "capydb";

{
    description: new EmbText(
        "This is a sample text that will be embedded.",
        { embModel: EmbModels.TEXT_EMBEDDING_3_LARGE }
    )
}`;

  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Embedding Models</h1>
        
        <LanguageToggle />
        
        <p>
          Embedding models transform text into vector representations, enabling semantic search capabilities 
          in CapyDB. These vectors capture the meaning and context of text, allowing you to find documents 
          based on semantic similarity rather than exact keyword matches.
        </p>
        
        <p>
          When working with <Link href="/emb_json/emb_text" className="text-blue-600 dark:text-blue-400 hover:underline">EmbText</Link> in CapyDB, 
          you can specify which embedding model to use via the <code>emb_model</code> parameter.
        </p>
        
        <h2>Supported Embedding Models</h2>
        
        <table className="w-full border-collapse my-4">
          <thead>
            <tr>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800"><strong>Model</strong></th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800"><strong>Provider</strong></th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800"><strong>Dimensions</strong></th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800"><strong>Description</strong></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">text-embedding-3-small</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">OpenAI</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1536</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Smaller, faster model with excellent performance-to-cost ratio</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">text-embedding-3-large</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">OpenAI</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">3072</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Highest quality model for the most demanding use cases</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">text-embedding-ada-002</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">OpenAI</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">1536</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Legacy model with good performance for general use cases</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Using Embedding Models in CapyDB</h2>
        
        <p>
          To specify an embedding model when working with <code>EmbText</code>, use the <code>emb_model</code> parameter:
        </p>
        
        <LanguageContent language="python">
          <CodeBlock
            code={pythonExample}
            language="python"
          />
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <CodeBlock
            code={typescriptExample}
            language="typescript"
          />
        </LanguageContent>
        
        <LanguageContent language="python">
          <p>
            In the example above, we're using the <code>TEXT_EMBEDDING_3_LARGE</code> model from OpenAI to embed the text.
          </p>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <p>
            In the example above, we're using the <code>TEXT_EMBEDDING_3_LARGE</code> model from OpenAI to embed the text.
            Note that in TypeScript, we use camelCase for parameter names.
          </p>
        </LanguageContent>
        
        <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4 my-4">
          <p className="text-blue-700 dark:text-blue-300">
            <strong>Note:</strong> CapyDB does not charge for LLM usage directly. Instead, you pay the LLM providers via CapyDB, 
            which facilitates the payment process for your convenience.
          </p>
        </div>
        
        <h2>Best Practices</h2>
        
        <ul>
          <li>Use <code>text-embedding-3-small</code> for most general-purpose applications where cost-efficiency is important.</li>
          <li>Choose <code>text-embedding-3-large</code> for applications requiring the highest quality embeddings, such as complex semantic retrieval tasks.</li>
          <li>Consider using the same embedding model throughout your application for consistent results.</li>
          <li>For text fields that don't require semantic search, you can omit the embedding model to save on processing costs.</li>
        </ul>
        
        <hr className="my-6" />
        
        <h2>How can we improve this documentation?</h2>
        
        <Feedback />
        
        <ContactUs />
      </div>
    </DocLayout>
  );
} 