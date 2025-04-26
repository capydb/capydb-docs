'use client';
import DocLayout from '@/components/DocLayout';
import Feedback from '@/components/Feedback';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';
import CodeBlock from '@/components/CodeBlock';
import ContactUs from '@/components/ContactUs';
export default function EmbImagePage() {
  const basicPythonCode = `from capydb import EmbImage

# Storing a single image field to embed.
{
  "field_name": EmbImage(
    data="base64_encoded_image_data",
    mime_type="image/jpeg"
  )
}`;

  const basicTypescriptCode = `import { EmbImage } from "capydb";

// Storing a single image field to embed.
{
  field_name: new EmbImage(
    "base64_encoded_image_data",
    [],
    null,
    null,
    "image/jpeg"
  )
}`;

  const customizedPythonCode = `from capydb import EmbImage, EmbModels, VisionModels

{
    "field_name": EmbImage(
        data="base64_encoded_image_data",                   # Base64-encoded image
        mime_type="image/jpeg",                             # Required: specify the image format
        emb_model=EmbModels.TEXT_EMBEDDING_3_LARGE,         # Optionally specify an embedding model
        vision_model=VisionModels.GPT_4O,                   # Optionally specify a vision model
        max_chunk_size=200,                                 # Configure chunk sizes
        chunk_overlap=20,                                   # Overlap between chunks
        is_separator_regex=False,                           # Are separators plain strings or regex?
        separators=[
            "\\n\\n",
            "\\n",
        ],
        keep_separator=False                                # Keep or remove the separator in chunks
    )
}`;

  const customizedTypescriptCode = `import { EmbImage, EmbModels, VisionModels } from "capydb";

{
    field_name: new EmbImage(
        "base64_encoded_image_data",                         // Base64-encoded image data
        [],                                                  // chunks (empty at creation time)
        EmbModels.TEXT_EMBEDDING_3_LARGE,                    // embModel
        VisionModels.GPT_4O,                                 // visionModel
        "image/jpeg",                                        // mimeType
        200,                                                 // maxChunkSize
        20,                                                  // chunkOverlap
        false,                                               // isSeparatorRegex
        ["\\n\\n", "\\n"],                                   // separators
        false                                                // keepSeparator
    )
}`;

  const afterSavingPythonCode = `{
    "field_name": EmbImage(
        # Original base64 data is removed and replaced with a URL
        url="https://media.capydb.com/your-project/your-db/your-collection/doc-id/field_name.jpg",
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
}`;

  const afterSavingTypescriptCode = `{
    field_name: new EmbImage(
        null,                                           // original base64 data is removed
        ["chunk1", "chunk2", "chunk3"],                 // chunks (populated after processing)
        EmbModels.TEXT_EMBEDDING_3_LARGE,
        VisionModels.GPT_4O,
        "image/jpeg",
        200,
        20,
        false,
        ["\\n\\n", "\\n"],
        false,
        "https://media.capydb.com/your-project/your-db/your-collection/doc-id/field_name.jpg" // URL to the stored image
    )
}`;

  const accessingImagePythonCode = `from capydb import CapyDBClient, EmbImage

# Get document with an EmbImage
client = CapyDBClient("your_api_key")
collection = client.database("project_id", "db_name").collection("collection_name")
document = collection.find_one({"_id": "document_id"})

# Access EmbImage properties
if "image" in document and isinstance(document["image"], EmbImage):
    # Access the URL (added by server after processing)
    image_url = document["image"].url
    print(f"Image URL: {image_url}")
    
    # Access processed chunks (added by server after processing)
    chunks = document["image"].chunks
    print(f"First chunk: {chunks[0] if chunks else 'No chunks yet'}")`;

  const accessingImageTypescriptCode = `import { CapyDBClient, EmbImage } from "capydb";

// Get document with an EmbImage
const client = new CapyDBClient("your_api_key");
const collection = client.database("project_id", "db_name").collection("collection_name");

// Access EmbImage properties
collection.findOne({ _id: "document_id" }).then(document => {
  if (document.image instanceof EmbImage) {
    // Access the URL (added by server after processing)
    const imageUrl = document.image.url;
    console.log("Image URL:", imageUrl);
    
    // Access processed chunks (added by server after processing)
    const chunks = document.image.chunks;
    console.log("First chunk:", chunks.length > 0 ? chunks[0] : "No chunks yet");
  }
});`;

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
          <li><strong>Image Data Handling</strong>: Provide your image data in base64 format. Note that <code>EmbImage</code> <strong>only</strong> accepts binary data (base64 encoded) and does <strong>not</strong> accept image file paths.</li>
          <li><strong>Dual-Model Support</strong>: Optionally use an embedding model and a vision model to generate rich, multi-modal representations.</li>
          <li><strong>Asynchronous Processing</strong>: Image embeddings and chunking occur in the background, ensuring a responsive write experience.</li>
          <li><strong>Automatic Chunking</strong>: Images are internally processed (and chunked, if applicable) for efficient embedding and indexing.</li>
        </ul>
        
        <h2>Basic Usage</h2>
        
        <LanguageToggle />
        
        <p>Below is the simplest way to use <code>EmbImage</code>:</p>
        
        <LanguageContent language="python">
          <CodeBlock
            code={basicPythonCode}
            language="python"
          />
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <CodeBlock
            code={basicTypescriptCode}
            language="typescript"
          />
        </LanguageContent>
        
        <p>
          This snippet creates an <code>EmbImage</code> object containing your base64 encoded image data. 
          The <code>mime_type</code> parameter is required to specify the image format.
          By default, no specific models are set and all other parameters remain optional.
        </p>
        
        <hr className="my-6" />
        
        <h2>Customized Usage with Parameters</h2>
        
        <p>
          If you have specific requirements (e.g., using a particular embedding or vision model), 
          customize <code>EmbImage</code> by specifying additional parameters:
        </p>
        
        <LanguageContent language="python">
          <CodeBlock
            code={customizedPythonCode}
            language="python"
          />
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <CodeBlock
            code={customizedTypescriptCode}
            language="typescript"
          />
        </LanguageContent>
        
        <h2>After Saving</h2>
        
        <p>
          CapyDB processes your image data asynchronously. Once processed, several important changes happen:
        </p>
        
        <ol>
          <li><strong>The original base64 image data is removed</strong> to save space and bandwidth</li>
          <li>A public <strong>URL</strong> is assigned to access the stored image</li>
          <li>A <strong>chunks</strong> field is added containing the generated text descriptions/representations</li>
        </ol>
        
        <p>
          This significantly reduces document size while providing convenient access to both the image and its processed text representations.
        </p>
        
        <LanguageContent language="python">
          <CodeBlock
            code={afterSavingPythonCode}
            language="python"
          />
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <CodeBlock
            code={afterSavingTypescriptCode}
            language="typescript"
          />
        </LanguageContent>
        
        <h2>Accessing EmbImage Properties</h2>
        
        <p>
          After retrieving a document with an EmbImage field, you can access its properties like the URL and chunks.
          The following examples demonstrate how to work with EmbImage objects in your application:
        </p>
        
        <LanguageContent language="python">
          <CodeBlock
            code={accessingImagePythonCode}
            language="python"
          />
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <CodeBlock
            code={accessingImageTypescriptCode}
            language="typescript"
          />
        </LanguageContent>
        
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>data</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The base64 encoded image data. This image is processed and embedded for semantic search. <strong>Note:</strong> After processing, this data is removed from the document and replaced with a URL. <strong>Important:</strong> EmbImage only accepts base64 encoded binary data and does not support image file paths.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>url</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>Auto-generated by the database</strong> after processing the image. This URL provides access to the stored image and replaces the original base64 data in the document.</td>
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Which vision model to use for processing the image. Defaults to <code>None</code> if not provided. Supported vision models include <code>GPT_4O_MINI</code>, <code>GPT_4O</code>, <code>GPT_4_TURBO</code>, and <code>O1</code>.</td>
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
            <p>The image is retrieved from the provided base64 encoded data.</p>
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
        
        <ContactUs />
      </div>
    </DocLayout>
  );
} 