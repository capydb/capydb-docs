import DocLayout from '@/components/DocLayout';
import Image from 'next/image';

export default function OverviewPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Overview</h1>
        
        <div className="w-full">
          <Image
            src="https://capydb.com/images/capybara02.png"
            width={1000}
            height={1000}
            alt="CapyDB Logo"
            className="w-full h-auto"
          />
        </div>
        
        <p>
          CapyDB is a <strong>high-level database</strong> built specifically for Large Language Model (LLM) applications. 
          It unifies multiple database architectures—NoSQL, vector, and object storage—within a single platform, 
          allowing seamless storage, indexing, and retrieval of structured, unstructured, and vector-based data. 
          This makes CapyDB the ideal choice for AI-driven projects, particularly those focused on natural 
          language processing and data analysis.
        </p>
        
        <h2>What is a High-Level Database?</h2>
        
        <p>
          Much like how high-level programming languages like Python abstract away technical complexities to simplify development, 
          CapyDB abstracts the complexities of different database architectures. By integrating NoSQL, vector, and object 
          storage under one system, it provides developers with an accessible, powerful platform to manage the diverse data 
          needs of LLM applications—without requiring expertise in multiple types of databases.
        </p>
        
        <h3>Benefits of a High-Level Database</h3>
        
        <p>CapyDB offers several key advantages for developers:</p>
        
        <ul>
          <li>
            <strong>Cost Efficiency</strong>: No need to maintain separate servers or databases—CapyDB handles these tasks, 
            reducing infrastructure costs and making it more affordable.
          </li>
          <li>
            <strong>Time Savings</strong>: Built-in solutions streamline setup and management, allowing developers to focus on 
            building applications instead of managing backends.
          </li>
          <li>
            <strong>Ease of Use</strong>: Industry-leading data processing pipelines reduce the need for specialized knowledge, 
            saving time and avoiding the need for additional hires.
          </li>
        </ul>
        
        <h2>Components of CapyDB</h2>
        
        <h3>1. NoSQL (Document) Database</h3>
        
        <p>
          CapyDB includes a Mongo-compatible NoSQL database for flexible document-based storage and querying, 
          making it easy for developers familiar with MongoDB tools.
        </p>
        
        <h3>2. Vector Database</h3>
        
        <p>CapyDB integrates a high-performance vector database that supports:</p>
        
        <ul>
          <li>
            <strong>Vector Storage in Documents</strong>: Embedding vector data (e.g., text embeddings) directly within 
            documents for efficient management.
          </li>
          <li>
            <strong>Semantic Indexing</strong>: Advanced retrieval and similarity searches, crucial for LLM and AI applications.
          </li>
        </ul>
        
        <h3>3. Object Storage</h3>
        
        <p>
          CapyDB's object storage manages unstructured data like files and images, complementing its structured and 
          vector data capabilities.
        </p>
        
        <h2>EmbJSON (Extended JSON Types)</h2>
        
        <p>
          CapyDB extends the standard <strong>BSON (Binary JSON)</strong> format with <strong>EmbJSON (CapyDB Extended JSON)</strong>, 
          which simplifies managing and querying complex data structures like text embeddings. EmbJSON is key to CapyDB's 
          database abstraction and is explained further in <a href="/emb_json" className="text-blue-600 dark:text-blue-400 hover:underline">EmbJSON Overview</a>.
        </p>
      </div>
    </DocLayout>
  );
} 