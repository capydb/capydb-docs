import DocLayout from '@/components/DocLayout';
import Feedback from '@/components/Feedback';

export default function ModelsPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Supported LLM Models for EmbJSON</h1>
        
        <p>
          CapyDB supports a variety of <strong>embedding models</strong> for use with <strong>EmbJSON</strong> data types. 
          These models help convert text data into embeddings, enabling powerful semantic search capabilities with just a few configurations.
        </p>
        
        <p>
          To specify an embedding model in your <strong>EmbJSON</strong> fields, use the <strong>emb_model</strong> parameter for text embeddings. 
          CapyDB provides seamless integration with leading LLM providers, making it easy to get started.
        </p>
        
        <h2>Embedding Models</h2>
        
        <p>These models are available for embedding text data in <strong>EmbJSON</strong> fields such as <strong>EmbText</strong>:</p>
        
        <table className="w-full border-collapse my-4">
          <thead>
            <tr>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800"><strong>Model</strong></th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800"><strong>Provider</strong></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">text-embedding-3-small</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">OpenAI</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">text-embedding-3-large</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">OpenAI</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">ada v2</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">OpenAI</td>
            </tr>
          </tbody>
        </table>
        
        <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4 my-4">
          <p className="text-blue-700 dark:text-blue-300">
            More options will be added in the future. CapyDB is continuously evolving, and we are working to expand our list of supported embedding models to provide even more flexibility and performance for your applications.
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4 my-4">
          <p className="text-blue-700 dark:text-blue-300">
            <strong>CapyDB does not charge for LLM usage directly</strong>. Instead, users pay the LLM providers via CapyDB, which facilitates the payment process for convenience. This allows you to leverage the best available models without worrying about hidden costs or extra fees from CapyDB.
          </p>
        </div>
        
        <h3>How can we improve this documentation?</h3>
        
        <Feedback />
        
        <h3>Got question? <a href="mailto:hello@capydb.com" className="text-blue-600 dark:text-blue-400 hover:underline">Email us</a></h3>
      </div>
    </DocLayout>
  );
} 