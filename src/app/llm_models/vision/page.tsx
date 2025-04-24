'use client';
import DocLayout from '@/components/DocLayout';
import Feedback from '@/components/Feedback';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';
import ContactUs from '@/components/ContactUs';
export default function VisionModelsPage() {
  const pythonBasicExample = `from capydb import EmbImage, VisionModels

{
    "product_image": EmbImage(
        data="base64_encoded_image_data",
        mime_type="image/jpeg",
        vision_model=VisionModels.GPT_4O
    )
}`;

  const typescriptBasicExample = `import { EmbImage, VisionModels } from "capydb";

{
    product_image: new EmbImage(
        "base64_encoded_image_data",
        [],
        null,
        VisionModels.GPT_4O,
        "image/jpeg"
    )
}`;

  const pythonCombinedExample = `from capydb import EmbImage, EmbModels, VisionModels

{
    "product_image": EmbImage(
        data="base64_encoded_image_data",
        mime_type="image/jpeg",
        vision_model=VisionModels.GPT_4O,
        emb_model=EmbModels.TEXT_EMBEDDING_3_LARGE
    )
}`;

  const typescriptCombinedExample = `import { EmbImage, EmbModels, VisionModels } from "capydb";

{
    product_image: new EmbImage(
        "base64_encoded_image_data",
        [],
        EmbModels.TEXT_EMBEDDING_3_LARGE,
        VisionModels.GPT_4O,
        "image/jpeg"
    )
}`;

  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Vision Models</h1>
        
        <LanguageToggle />
        
        <p>
          Vision models enable CapyDB to process and understand image content, creating semantic 
          representations that can be used for advanced image search and analysis. These models 
          extract features and context from images, similar to how embedding models work with text.
        </p>
        
        <p>
          When working with <Link href="/emb_json/emb_image" className="text-blue-600 dark:text-blue-400 hover:underline">EmbImage</Link> in CapyDB, 
          you can specify which vision model to use via the <code>vision_model</code> parameter.
        </p>
        
        <h2>Supported Vision Models</h2>
        
        <table className="w-full border-collapse my-4">
          <thead>
            <tr>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800"><strong>Model</strong></th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800"><strong>Provider</strong></th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800"><strong>Description</strong></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">GPT-4o</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">OpenAI</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">High-quality multimodal model capable of understanding images with excellent detail recognition and contextual understanding</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">GPT-4o-mini</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">OpenAI</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Smaller, more cost-effective version of GPT-4o with good performance for most image processing tasks</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">GPT-4-turbo</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">OpenAI</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Tuned for efficiency while maintaining high-quality image understanding capabilities</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">O1</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">OpenAI</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Advanced vision model optimized for high-fidelity understanding of complex visual content</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Using Vision Models in CapyDB</h2>
        
        <p>
          To specify a vision model when working with <code>EmbImage</code>, use the <code>vision_model</code> parameter:
        </p>
        
        <LanguageContent language="python">
          <CodeBlock
            code={pythonBasicExample}
            language="python"
          />
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <CodeBlock
            code={typescriptBasicExample}
            language="typescript"
          />
        </LanguageContent>
        
        <LanguageContent language="python">
          <p>
            In the example above, we're using the <code>GPT_4O</code> model from OpenAI to process and understand the image content.
          </p>
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <p>
            In the example above, we're using the <code>GPT_4O</code> model from OpenAI to process and understand the image content.
            Note that in TypeScript, we use camelCase for parameter names and pass parameters as an object.
          </p>
        </LanguageContent>
        
        <h2>Combined Usage with Embedding Models</h2>
        
        <p>
          You can use both vision models and embedding models together with <code>EmbImage</code> to get the benefits of both:
        </p>
        
        <LanguageContent language="python">
          <CodeBlock
            code={pythonCombinedExample}
            language="python"
          />
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <CodeBlock
            code={typescriptCombinedExample}
            language="typescript"
          />
        </LanguageContent>
        
        <p>
          This combination allows CapyDB to extract both visual features (via the vision model) and encode textual descriptions 
          (via the embedding model) for comprehensive multimodal search capabilities.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4 my-4">
          <p className="text-blue-700 dark:text-blue-300">
            <strong>Note:</strong> CapyDB does not charge for LLM usage directly. Instead, you pay the LLM providers via CapyDB, 
            which facilitates the payment process for your convenience.
          </p>
        </div>
        
        <h2>Best Practices</h2>
        
        <ul>
          <li>Use <code>GPT-4o-mini</code> for cost-efficient image processing where the highest level of detail recognition is not required.</li>
          <li>Choose <code>GPT-4o</code> for high-quality image understanding in production applications.</li>
          <li>Consider <code>O1</code> for applications that require the most advanced image understanding capabilities.</li>
          <li>When working with a large number of images, be mindful of processing costs and consider using a more economical vision model for initial processing.</li>
        </ul>
        
        <hr className="my-6" />
        
        <h2>How can we improve this documentation?</h2>
        
        <Feedback />
        
        <ContactUs />
      </div>
    </DocLayout>
  );
} 