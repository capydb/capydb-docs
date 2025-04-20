import DocLayout from '@/components/DocLayout';
import Feedback from '@/components/Feedback';
import Link from 'next/link';
import ContactUs from '@/components/ContactUs';

export default function LLMModelsPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>LLM Models</h1>
        
        <p>
          CapyDB seamlessly integrates with various language models to provide powerful AI capabilities. 
          These models help convert data into embeddings, enable semantic search, and process images and text.
        </p>
        
        <p>
          This section provides detailed information about the supported models in CapyDB:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Link href="/llm_models/embedding" className="block p-6 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Embedding Models</h3>
            <p>
              Learn about text embedding models that convert text into vector representations for semantic search capabilities.
            </p>
          </Link>
          
          <Link href="/llm_models/vision" className="block p-6 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Vision Models</h3>
            <p>
              Explore vision models that process and understand image content for advanced image search and analysis.
            </p>
          </Link>
        </div>
        
        <hr className="my-6" />
        
        <h2>How can we improve this documentation?</h2>
        
        <Feedback />
        
        <ContactUs variant="with-a" />
      </div>
    </DocLayout>
  );
} 