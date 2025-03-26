'use client';

import React from 'react';
import DocLayout from '@/components/DocLayout';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Feedback from '@/components/Feedback';

export default function SupportedLLMModesPage() {
  return (
    <DocLayout>
      <h1 className="text-3xl font-bold mb-6">Supported LLM Modes</h1>
      
      <p className="mb-6">
        CapyDB supports various embedding models for both text and image data. This page provides an overview of the supported LLM modes for both EmbModels (text) and Vision Models (images).
      </p>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4" id="text-embedding-models">Text Embedding Models</h2>
        
        <p className="mb-4">
          CapyDB supports the following text embedding models:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Model</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Provider</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Dimensions</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Max Tokens</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">text-embedding-ada-002</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">OpenAI</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">1536</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">8191</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">Legacy model, still widely used</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">text-embedding-3-small</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">OpenAI</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">1536</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">8191</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">Newer model with improved performance</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">text-embedding-3-large</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">OpenAI</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">3072</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">8191</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">Highest quality embeddings</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">all-MiniLM-L6-v2</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">Sentence Transformers</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">384</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">512</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">Open-source, good balance of speed and quality</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">e5-large-v2</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">Microsoft</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">1024</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">512</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">Strong performance on retrieval tasks</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-3" id="text-embedding-example">Example Usage</h3>
        
        <p className="mb-4">
          Here's an example of how to specify a text embedding model when creating an EmbText object:
        </p>

        <div className="mb-6">
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="rounded-lg">
            {`// Using OpenAI's text-embedding-3-small model
const embText = new EmbText({
  text: "This is a sample text for embedding",
  model: "text-embedding-3-small"
});

// Using the default model (text-embedding-ada-002)
const embTextDefault = new EmbText({
  text: "This will use the default embedding model"
});`}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4" id="vision-models">Vision Models</h2>
        
        <p className="mb-4">
          For image embeddings, CapyDB supports the following vision models:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Model</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Provider</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Dimensions</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Max Resolution</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">clip-vit-base-patch32</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">OpenAI</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">512</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">224x224</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">Good balance of speed and quality</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">clip-vit-large-patch14</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">OpenAI</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">768</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">224x224</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">Higher quality embeddings</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">openai-vision</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">OpenAI</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">1024</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">2048x2048</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">Best quality, supports higher resolution</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">swin-base-patch4-window7-224</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">Microsoft</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">1024</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">224x224</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">Good for detailed image analysis</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-3" id="vision-model-example">Example Usage</h3>
        
        <p className="mb-4">
          Here's an example of how to specify a vision model when creating an EmbImage object:
        </p>

        <div className="mb-6">
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="rounded-lg">
            {`// Using OpenAI's CLIP model
const embImage = new EmbImage({
  url: "https://example.com/image.jpg",
  model: "clip-vit-large-patch14"
});

// Using the default model (clip-vit-base-patch32)
const embImageDefault = new EmbImage({
  url: "https://example.com/another-image.jpg"
});

// Using base64 encoded image with a specific model
const embImageWithModel = new EmbImage({
  url: "https://example.com/third-image.jpg",
  model: "openai-vision"
});`}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4" id="model-selection">Model Selection Guidelines</h2>
        
        <p className="mb-4">
          When choosing an embedding model, consider the following factors:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li className="text-gray-800 dark:text-gray-200">
            <strong>Quality vs. Speed:</strong> Larger models generally provide higher quality embeddings but may be slower and more expensive to use.
          </li>
          <li className="text-gray-800 dark:text-gray-200">
            <strong>Dimensions:</strong> Higher dimensional embeddings can capture more information but require more storage space.
          </li>
          <li className="text-gray-800 dark:text-gray-200">
            <strong>Token Limits:</strong> Consider the length of your text when choosing a model. Some models have lower token limits.
          </li>
          <li className="text-gray-800 dark:text-gray-200">
            <strong>Use Case:</strong> Different models may perform better for specific tasks (e.g., semantic search, classification, clustering).
          </li>
          <li className="text-gray-800 dark:text-gray-200">
            <strong>Cost:</strong> More powerful models typically cost more to use, especially with large volumes of data.
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4" id="custom-models">Using Custom Models</h2>
        
        <p className="mb-4">
          CapyDB also supports custom embedding models through our API. If you have specific requirements or want to use your own models, please contact our support team for integration options.
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
          <h4 className="text-amber-800 dark:text-amber-300 font-medium mb-2">Note</h4>
          <p className="text-amber-700 dark:text-amber-400 text-sm">
            Model availability may change over time as we add support for new embedding models. Check our documentation for the most up-to-date information on supported models.
          </p>
        </div>
      </div>
      
      <Feedback />
    </DocLayout>
  );
} 