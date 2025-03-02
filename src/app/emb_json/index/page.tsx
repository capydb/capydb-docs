import DocLayout from '@/components/DocLayout';
import Link from 'next/link';

export default function EmbJsonIndexPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Embedded JSON (EmbJSON)</h1>
        
        <p>
          Embedded JSON (EmbJSON) is a format for embedding structured data within unstructured text. 
          It allows you to combine the best of both worlds: the readability and flexibility of natural 
          language with the precision and machine-readability of structured data.
        </p>
        
        <h2>Overview</h2>
        
        <p>EmbJSON uses a simple syntax to embed JSON objects within text:</p>
        
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
          <code>This is regular text with an embedded JSON object: {'{{"type": "example", "value": 42}}'}</code>
        </pre>
        
        <p>
          The double curly braces <code>{'{{'}</code>...<code>{'}}'}</code> indicate an embedded JSON object. 
          The content inside must be valid JSON.
        </p>
        
        <h2>Key Features</h2>
        
        <ul>
          <li><strong>Seamless Integration</strong>: Embed structured data directly within natural language text</li>
          <li><strong>Machine-Readable</strong>: Easy to parse and extract structured data</li>
          <li><strong>Human-Readable</strong>: Maintains the readability of the surrounding text</li>
          <li><strong>Flexible</strong>: Can be used in any text-based format (markdown, plain text, etc.)</li>
          <li><strong>Simple Syntax</strong>: Minimal overhead for embedding JSON objects</li>
        </ul>
        
        <h2>Use Cases</h2>
        
        <ul>
          <li><strong>Enhanced Documentation</strong>: Include machine-readable examples and metadata</li>
          <li><strong>Semantic Markup</strong>: Add structured meaning to natural language</li>
          <li><strong>Data Enrichment</strong>: Augment text with structured data points</li>
          <li><strong>Configuration</strong>: Combine explanatory text with configuration settings</li>
          <li><strong>Annotations</strong>: Add structured annotations to text</li>
        </ul>
        
        <h2>Getting Started</h2>
        
        <p>To use EmbJSON, simply wrap valid JSON objects in double curly braces within your text:</p>
        
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
          <code>Here's a configuration example: {'{{"server": "production", "timeout": 30, "retries": 3}}'}</code>
        </pre>
        
        <p>You can then use our parser to extract and process these embedded objects.</p>
        
        <h2>Learn More</h2>
        
        <p>Explore our documentation to learn more about EmbJSON and how to use it in your projects:</p>
        
        <ul>
          <li><Link href="/emb_json/syntax" className="text-blue-600 dark:text-blue-400 hover:underline">Syntax Guide</Link></li>
          <li><Link href="/emb_json/parser" className="text-blue-600 dark:text-blue-400 hover:underline">Parser Implementation</Link></li>
          <li><Link href="/emb_json/advanced" className="text-blue-600 dark:text-blue-400 hover:underline">Advanced Usage</Link></li>
          <li><Link href="/emb_json/examples" className="text-blue-600 dark:text-blue-400 hover:underline">Examples</Link></li>
        </ul>
      </div>
    </DocLayout>
  );
} 