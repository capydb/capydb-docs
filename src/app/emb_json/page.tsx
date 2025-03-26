import DocLayout from '@/components/DocLayout';
import Feedback from '@/components/Feedback';

export default function EmbJsonPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>CapyDB Extended JSON (EmbJSON)</h1>
        
        <p>
          <strong>CapyDB Extended JSON (EmbJSON)</strong> is a powerful data format designed to simplify database indexing pipelines, 
          allowing developers to use a single database for most LLM applications. EmbJSON provides a versatile and efficient solution 
          for handling data, making it easier to implement advanced AI features without the overhead of managing multiple databases. 
          This streamlined approach enables developers to focus on building intelligent applications rather than dealing with complex data architecture.
        </p>
        
        <h2>Key Features of EmbJSON</h2>
        
        <ul>
          <li><strong>Custom Embedding Models</strong>: Specify an embedding model using the <code>emb_model</code> parameter to fine-tune how your data is represented in vector space.</li>
          <li><strong>LLM Optimization</strong>: Built for efficient text embeddings and vector-based queries, EmbJSON is ideal for semantic search.</li>
          <li><strong>Flexible Indexing</strong>: Customize data indexing to optimize embedding and retrieval based on your specific needs.</li>
          <li><strong>Asynchronous Processing</strong>: All EmbJSON data types are processed asynchronously by default, allowing client applications to continue running smoothly while embedding and indexing take place in the background.</li>
        </ul>
        
        <h2>Overview of EmbJSON Data Types</h2>
        
        <ul>
          <li><strong>EmbText</strong>: Designed for storing and embedding text data. EmbText can handle everything from single words to lengthy documents, embedding and indexing content automatically for semantic search.</li>
          <li><strong>EmbImage</strong>: Supports image URLs, enabling semantic text search capabilities for images.</li>
          <li><strong>EmbVideo</strong> (Future Release): Will handle video data, enabling semantic embedding and search within video content.</li>
          <li><strong>EmbFile</strong> (Future Release): A generic type for managing a variety of file formats, including PDFs, Word documents, and more, allowing for semantic embedding and search across different types of content.</li>
          <li><strong>Other Data Types</strong>: Additional data types like <strong>EmbAudio</strong> and <strong>Emb3D</strong> are also planned for future releases, aimed at enabling semantic embeddings for audio files and 3D models.</li>
        </ul>
        
        <h2>Why Choose CapyDB Extended JSON?</h2>
        
        <ul>
          <li><strong>Streamlined Embedding</strong>: Select and customize embedding models to suit your needs.</li>
          <li><strong>Optimized Data Retrieval</strong>: Efficient indexing makes semantic search fast and reliable.</li>
          <li><strong>Simple Data Management</strong>: Seamlessly manage complex data types like embeddings.</li>
          <li><strong>Unified Database Solution</strong>: EmbJSON abstracts the complexity of database architecture for LLM applications, meaning you only need one database for most of your AI needs.</li>
        </ul>
        
        <p>To explore how EmbJSON can elevate your AI projects, check out the detailed documentation and guides available.</p>
        
        <h3>How can we improve this documentation?</h3>
        
        <Feedback />
        
        <h3>Got question? <a href="mailto:hello@capydb.com" className="text-blue-600 dark:text-blue-400 hover:underline">Email us</a></h3>
      </div>
    </DocLayout>
  );
} 