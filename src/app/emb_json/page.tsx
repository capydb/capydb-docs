import DocLayout from '@/components/DocLayout';
import Feedback from '@/components/Feedback';
import ContactUs from '@/components/ContactUs';
import CodeBlock from '@/components/CodeBlock';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';

export default function EmbJsonPage() {
  const basicPythonExample = `from capydb import EmbText, EmbImage

# Create a document with embedded fields
document = {
    "title": "My First Document",
    # EmbText automatically embeds the text for semantic search
    "description": EmbText("This is a detailed description that will be embedded for semantic search"),
    # EmbImage embeds the image data (base64 encoded)
    "thumbnail": EmbImage(
        data="base64_encoded_image_data",
        mime_type="image/jpeg"
    )
}

# Store in CapyDB - embedding and indexing happens automatically
collection.insert_one(document)

# Later, search semantically across all embedded fields
results = collection.find({"$semanticSearch": "design principles"})`;

  const basicTypescriptExample = `import { EmbText, EmbImage } from "capydb";

// Create a document with embedded fields
const document = {
    title: "My First Document",
    // EmbText automatically embeds the text for semantic search
    description: new EmbText("This is a detailed description that will be embedded for semantic search"),
    // EmbImage embeds the image data (base64 encoded)
    thumbnail: new EmbImage(
        "base64_encoded_image_data",
        [],
        null,
        null,
        "image/jpeg"
    )
};

// Store in CapyDB - embedding and indexing happens automatically
await collection.insertOne(document);

// Later, search semantically across all embedded fields
const results = await collection.find({"$semanticSearch": "design principles"});`;

  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>CapyDB Extended JSON (EmbJSON)</h1>
        
        <p>
          <strong>CapyDB Extended JSON (EmbJSON)</strong> is a set of special data types that make working with AI and embeddings 
          simple. With EmbJSON, you can store text, images, and other media in your database and have them automatically 
          embedded for semantic search—without setting up separate vector databases or pipelines.
        </p>
        
        <h2>What EmbJSON Does For You</h2>
        
        <ul>
          <li><strong>Automatic Embedding</strong>: Just wrap your content in an EmbJSON type, and CapyDB handles the embedding process</li>
          <li><strong>Simple Semantic Search</strong>: Query your data using natural language and similarity search</li>
          <li><strong>No Pipeline Management</strong>: Skip complex data processing workflows—embedding happens behind the scenes</li>
          <li><strong>Background Processing</strong>: Embeddings are generated asynchronously, keeping your app responsive</li>
        </ul>
        
        <h2>Quick Example</h2>
        
        <p>See how easy it is to use EmbJSON in your applications:</p>
        
        <LanguageToggle />
        
        <LanguageContent language="python">
          <CodeBlock
            code={basicPythonExample}
            language="python"
          />
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <CodeBlock
            code={basicTypescriptExample}
            language="typescript"
          />
        </LanguageContent>
        
        <h2>Available EmbJSON Types</h2>
        
        <ul>
          <li><a href="/emb_json/emb_text" className="text-blue-600 dark:text-blue-400 hover:underline"><strong>EmbText</strong></a>: For text data ranging from short phrases to long documents</li>
          <li><a href="/emb_json/emb_image" className="text-blue-600 dark:text-blue-400 hover:underline"><strong>EmbImage</strong></a>: For images (accepts base64 encoded binary data only)</li>
          <li><strong>Coming Soon</strong>: EmbVideo, EmbFile, EmbAudio, and Emb3D for additional media types</li>
        </ul>
        
        <h2>Why Use EmbJSON?</h2>
        
        <p>
          Traditional approaches require separate systems for storing data and embeddings. EmbJSON unifies them, 
          eliminating the need to maintain vector databases alongside document stores. Write your data once, query it semantically.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md my-4">
          <p className="m-0"><strong>Pro Tip:</strong> EmbJSON types handle customization options like chunk sizes and embedding models. 
          Start simple and refine as your needs evolve.</p>
        </div>
        
        <h3>How can we improve this documentation?</h3>
        
        <Feedback />
        
        <ContactUs />
      </div>
    </DocLayout>
  );
} 