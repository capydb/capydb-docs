import DocLayout from '@/components/DocLayout';
import Feedback from '@/components/Feedback';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CopyButton from '@/components/CopyButton';

export default function EmbImagePage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>EmbImage</h1>
        
        <h2>Overview</h2>
        
        <p>
          CapyDB now supports image embeddings as well. By wrapping your base64 encoded image data in <code>EmbImage</code>, 
          you can leverage both text and vision models to extract meaningful features from your images. 
          This allows for semantic searches that go beyond traditional keyword matching.
        </p>
        
        <p><strong>Key Points</strong>:</p>
        
        <ul>
          <li><strong>Image Data Handling</strong>: Provide your image data in base64 format.</li>
          <li><strong>Dual-Model Support</strong>: Optionally use an embedding model and a vision model to generate rich, multi-modal representations.</li>
          <li><strong>Asynchronous Processing</strong>: Image embeddings and chunking occur in the background, ensuring a responsive write experience.</li>
          <li><strong>Automatic Chunking</strong>: Images are internally processed (and chunked, if applicable) for efficient embedding and indexing.</li>
        </ul>
        
        <h2>Basic Usage</h2>
        
        <p>Below is the simplest way to use <code>EmbImage</code>:</p>
        
        <div className="relative">
          <CopyButton code={`from capydb import EmbImage

# Storing a single image field to embed.
{
  "field_name": EmbImage("https://example.com/image.jpg", mime_type="image/jpeg")
}`} />
          <SyntaxHighlighter 
            language="python" 
            style={atomDark}
            customStyle={{
              borderRadius: '0.75rem',
              padding: '2rem'
            }}
          >
            {`from capydb import EmbImage

# Storing a single image field to embed.
{
  "field_name": EmbImage("https://example.com/image.jpg", mime_type="image/jpeg")
}`}
          </SyntaxHighlighter>
        </div>
        
        <p>
          This snippet creates an <code>EmbImage</code> object containing your image URL. 
          The <code>mime_type</code> parameter is required to specify the image format.
          By default, no specific models are set and all other parameters remain optional.
        </p>
        
        <hr className="my-6" />
        
        <h2>Customized Usage with Parameters</h2>
        
        <p>
          If you have specific requirements (e.g., using a particular embedding or vision model), 
          customize <code>EmbImage</code> by specifying additional parameters:
        </p>
        
        <div className="relative">
          <CopyButton code={`from capydb import EmbImage, EmbModels, VisionModels

{
    "field_name": EmbImage(
        url="https://example.com/image.jpg",  # URL to the image
        mime_type="image/jpeg",                # Required: specify the image format
        emb_model=EmbModels.TEXT_EMBEDDING_3_LARGE,  # Optionally specify an embedding model
        vision_model=VisionModels.GPT_4O,             # Optionally specify a vision model
        max_chunk_size=200,                           # Configure chunk sizes
        chunk_overlap=20,                             # Overlap between chunks
        is_separator_regex=False,                     # Are separators plain strings or regex?
        separators=[
            "\\n\\n",
            "\\n",
        ],
        keep_separator=False                          # Keep or remove the separator in chunks
    )
}`} />
          <SyntaxHighlighter 
            language="python" 
            style={atomDark}
            customStyle={{
              borderRadius: '0.75rem',
              padding: '2rem'
            }}
          >
            {`from capydb import EmbImage, EmbModels, VisionModels

{
    "field_name": EmbImage(
        url="https://example.com/image.jpg",  # URL to the image
        mime_type="image/jpeg",                # Required: specify the image format
        emb_model=EmbModels.TEXT_EMBEDDING_3_LARGE,  # Optionally specify an embedding model
        vision_model=VisionModels.GPT_4O,             # Optionally specify a vision model
        max_chunk_size=200,                           # Configure chunk sizes
        chunk_overlap=20,                             # Overlap between chunks
        is_separator_regex=False,                     # Are separators plain strings or regex?
        separators=[
            "\\n\\n",
            "\\n",
        ],
        keep_separator=False                          # Keep or remove the separator in chunks
    )
}`}
          </SyntaxHighlighter>
        </div>
        
        <h2>After Saving</h2>
        
        <p>
          CapyDB processes your image data asynchronously. Once processed, it automatically adds a <code>chunks</code> field 
          to each <code>EmbImage</code> for easy access to the internal representations.
        </p>
        
        <div className="relative">
          <CopyButton code={`{
    "field_name": EmbImage(
        url="https://example.com/image.jpg",
        mime_type="image/jpeg",
        chunks=["chunk1", "chunk2", "chunk3"],
        emb_model=EmbModels.TEXT_EMBEDDING_3_LARGE,
        vision_model=VisionModels.GPT_4O,
        max_chunk_size=200,
        chunk_overlap=20,
        is_separator_regex=False,
        separators=["\\n\\n", "\\n"],
        keep_separator=False
    )
}`} />
          <SyntaxHighlighter 
            language="python" 
            style={atomDark}
            customStyle={{
              borderRadius: '0.75rem',
              padding: '2rem'
            }}
          >
            {`{
    "field_name": EmbImage(
        url="https://example.com/image.jpg",
        mime_type="image/jpeg",
        chunks=["chunk1", "chunk2", "chunk3"],
        emb_model=EmbModels.TEXT_EMBEDDING_3_LARGE,
        vision_model=VisionModels.GPT_4O,
        max_chunk_size=200,
        chunk_overlap=20,
        is_separator_regex=False,
        separators=["\\n\\n", "\\n"],
        keep_separator=False
    )
}`}
          </SyntaxHighlighter>
        </div>
        
        <h3>Parameter Reference</h3>
        
        <table className="w-full border-collapse my-4">
          <thead>
            <tr>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800"><strong>Parameter</strong></th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800"><strong>Description</strong></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>url</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The URL to the image. This image is processed and embedded for semantic search.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>mime_type</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The MIME type of the image (e.g., "image/jpeg", "image/png"). This parameter is required. Supported types include <code>image/jpeg</code>, <code>image/jpg</code>, <code>image/png</code>, <code>image/gif</code>, and <code>image/webp</code>.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>emb_model</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Which embedding model to use. Defaults to <code>None</code> if not provided. Supported models include <code>text-embedding-3-small</code>, <code>text-embedding-3-large</code>, and <code>text-embedding-ada-002</code>.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>vision_model</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Which vision model to use for processing the image. Defaults to <code>None</code> if not provided. Supported vision models include <code>GPT_4O_MINI</code>, <code>GPT_4O</code>, <code>GPT_4O_TURBO</code>, and <code>GPT_O1</code>.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>max_chunk_size</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Maximum size for each chunk. Depending on your image processing, this parameter can control the granularity of the embedded segments.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>chunk_overlap</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Overlapping size between consecutive chunks, useful for preserving context between segmented image parts.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>is_separator_regex</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Whether to treat each separator in <code>separators</code> as a regular expression. Defaults to <code>False</code>.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>separators</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">A list of separator strings (or regex patterns) used during processing. While more common in text, these may also apply to image metadata or descriptions if present.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>keep_separator</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">If <code>True</code>, separators remain in the processed data. If <code>False</code>, they are removed.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>chunks</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>Auto-generated by the database</strong> after processing the image. It is <strong>not</strong> set by the user, and is available only after embedding completes.</td>
            </tr>
          </tbody>
        </table>
        
        <hr className="my-6" />
        
        <h2>How It Works: Asynchronous Processing</h2>
        
        <p>
          Whenever you insert a document containing <code>EmbImage</code> into CapyDB, the following steps occur <strong>asynchronously</strong>:
        </p>
        
        <ol>
          <li>
            <p><strong>Image Retrieval</strong></p>
            <p>The image is retrieved from the provided URL.</p>
          </li>
          <li>
            <p><strong>Chunking (if applicable)</strong></p>
            <p>Depending on your configuration, the image may be internally segmented into chunks for finer-grained processing.</p>
          </li>
          <li>
            <p><strong>Embedding</strong></p>
            <p>The image (or its chunks) is transformed into vector representations using the specified embedding and/or vision model. This step extracts the semantic and visual features.</p>
          </li>
          <li>
            <p><strong>Indexing</strong></p>
            <p>The resulting embeddings are indexed for efficient, semantic searches. These steps happen in the background, so while write operations are fast, query availability may have a slight delay.</p>
          </li>
        </ol>
        
        <hr className="my-6" />
        
        <h2>Querying</h2>
        
        <p>
          Once the <strong>Embedding</strong> and <strong>Indexing</strong> steps are complete, your <code>EmbImage</code> fields become searchable. 
          To perform semantic queries on image data, use the standard query operations. Please refer to the <a href="/document/query" className="text-blue-600 dark:text-blue-400 hover:underline"><strong>Query page</strong></a> for details.
        </p>
        
        <hr className="my-6" />
        
        <h2>How can we improve this documentation?</h2>
        
        <Feedback />
        
        <h3>Got a question? <a href="mailto:hello@capydb.com" className="text-blue-600 dark:text-blue-400 hover:underline">Email us</a></h3>
      </div>
    </DocLayout>
  );
} 