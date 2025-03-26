import DocLayout from '@/components/DocLayout';
import Feedback from '@/components/Feedback';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CopyButton from '@/components/CopyButton';

export default function EmbTextPage() {
  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>EmbText</h1>
        
        <h2>Overview</h2>
        
        <p>
          CapyDB uses vector embeddings to understand the meaning of text beyond simple keyword matching. 
          By wrapping your text in <code>EmbText</code>, you unlock the ability to query documents based on 
          conceptual and contextual relevance, rather than just literal keyword occurrences.
        </p>
        
        <p><strong>Key Points</strong>:</p>
        
        <ul>
          <li><strong>Automatic Chunking</strong>: Large text is split into smaller pieces (chunks) for more efficient embeddings and semantic searches.</li>
          <li><strong>Asynchronous Embedding</strong>: After the text is stored, embeddings are generated in the background without blocking your application.</li>
          <li><strong>Semantic Indexing</strong>: The final vector representations are indexed for fast semantic lookups.</li>
        </ul>
        
        <h2>Basic Usage</h2>
        
        <p>Below is the simplest way to use <code>EmbText</code>:</p>
        
        <div className="relative">
          <CopyButton code={`from capydb import EmbText

# Storing a single text field that you want to embed.
{
  "field_name": EmbText("Alice is a data scientist with expertise in AI and machine learning. She has led several projects in natural language processing.")
}`} />
          <SyntaxHighlighter 
            language="python" 
            style={atomDark} 
            customStyle={{
              borderRadius: '0.75rem',
              padding: '2rem'
            }}
          >
            {`from capydb import EmbText

# Storing a single text field that you want to embed.
{
  "field_name": EmbText("Alice is a data scientist with expertise in AI and machine learning. She has led several projects in natural language processing.")
}`}
          </SyntaxHighlighter>
        </div>
        
        <p>
          This snippet creates an <code>EmbText</code> object containing <code>"text_to_embed"</code>. 
          By default, it uses the <code>text-embedding-3-small</code> model and sensible defaults for chunking and overlap.
        </p>
        
        <hr className="my-6" />
        
        <h2>Customized Usage with Parameters</h2>
        
        <p>
          If you have specific requirements (e.g., a different embedding model or particular chunking strategy), 
          customize <code>EmbText</code> by specifying additional parameters:
        </p>
        
        <div className="relative">
          <CopyButton code={`from capydb import EmbText, EmbModels

{
    "field_name": EmbText(
        text="Alice is a data scientist with expertise in AI and machine learning. She has led several projects in natural language processing.",
        emb_model=EmbModels.TEXT_EMBEDDING_3_LARGE,  # Change the default model
        max_chunk_size=200,                          # Configure chunk sizes
        chunk_overlap=20,                            # Overlap between chunks
        is_separator_regex=False,                    # Are separators plain strings or regex?
        separators=[
            "\\n\\n",
            "\\n",
        ],
        keep_separator=False,                        # Keep or remove the separator in chunks
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
            {`from capydb import EmbText, EmbModels

{
    "field_name": EmbText(
        text="Alice is a data scientist with expertise in AI and machine learning. She has led several projects in natural language processing.",
        emb_model=EmbModels.TEXT_EMBEDDING_3_LARGE,  # Change the default model
        max_chunk_size=200,                          # Configure chunk sizes
        chunk_overlap=20,                            # Overlap between chunks
        is_separator_regex=False,                    # Are separators plain strings or regex?
        separators=[
            "\\n\\n",
            "\\n",
        ],
        keep_separator=False,                        # Keep or remove the separator in chunks
    )
}`}
          </SyntaxHighlighter>
        </div>
        
        <h2>After Saving</h2>
        
        <p>
          CapyDB saves data by splitting each EmbText into chunks, embedding them, and indexing while preserving 
          their relationships with vector data. It also automatically adds a 'chunks' field to each EmbText for seamless access.
        </p>
        
        <div className="relative">
          <CopyButton code={`{
    "field_name": EmbText(
        text="Alice is a data scientist with expertise in AI and machine learning. She has led several projects in natural language processing.",
        chunks=["Alice is a data scientist", "with expertise in AI", "and machine learning.", "She has led several projects", "in natural language processing."],
        emb_model=EmbModels.TEXT_EMBEDDING_3_LARGE,  # Change the default model
        max_chunk_size=200,                          # Configure chunk sizes
        chunk_overlap=20,                            # Overlap between chunks
        is_separator_regex=False,                    # Are separators plain strings or regex?
        separators=[
            "\\n\\n",
            "\\n",
        ],
        keep_separator=False,                        # Keep or remove the separator in chunks
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
    "field_name": EmbText(
        text="Alice is a data scientist with expertise in AI and machine learning. She has led several projects in natural language processing.",
        chunks=["Alice is a data scientist", "with expertise in AI", "and machine learning.", "She has led several projects", "in natural language processing."],
        emb_model=EmbModels.TEXT_EMBEDDING_3_LARGE,  # Change the default model
        max_chunk_size=200,                          # Configure chunk sizes
        chunk_overlap=20,                            # Overlap between chunks
        is_separator_regex=False,                    # Are separators plain strings or regex?
        separators=[
            "\\n\\n",
            "\\n",
        ],
        keep_separator=False,                        # Keep or remove the separator in chunks
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
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>text</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">The core content for <code>EmbText</code>. This text is automatically chunked and embedded for semantic search.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>emb_model</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Which embedding model to use. Defaults to <code>text-embedding-3-small</code>. You can choose from other supported models, such as <code>text-embedding-3-large</code>.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>max_chunk_size</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Maximum character length of each chunk. Larger chunks reduce the total chunk count but may reduce search efficiency (due to bigger embeddings).</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>chunk_overlap</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Overlapping character count between consecutive chunks, useful for preserving context at chunk boundaries.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>is_separator_regex</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Whether to treat each separator in <code>separators</code> as a regular expression. Defaults to <code>False</code>.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>separators</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">A list of separator strings (or regex patterns) used to split the text. For instance, <code>["\n\n", "\n"]</code> can split paragraphs or single lines.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>keep_separator</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">If <code>True</code>, separators remain in the chunked text. If <code>False</code>, they are stripped out.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>chunks</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>Auto-generated by the database</strong> after the text is processed. It is <strong>not</strong> set by the user, and is available only after embedding completes.</td>
            </tr>
          </tbody>
        </table>
        
        <hr className="my-6" />
        
        <h2>How It Works: Asynchronous Processing</h2>
        
        <p>
          Whenever you insert a document containing <code>EmbText</code> into CapyDB, three main steps happen <strong>asynchronously</strong>:
        </p>
        
        <ol>
          <li>
            <p><strong>Chunking</strong></p>
            <p>The text is divided into chunks based on <code>max_chunk_size</code>, <code>chunk_overlap</code>, and any specified <code>separators</code>. This ensures the text is broken down into optimally sized segments.</p>
          </li>
          <li>
            <p><strong>Embedding</strong></p>
            <p>Each chunk is transformed into a vector representation using the specified <code>emb_model</code>. This step captures the semantic essence of the text.</p>
          </li>
          <li>
            <p><strong>Indexing</strong></p>
            <p>The embeddings are indexed for efficient semantic search. Because these steps occur in the background, you get immediate responses to your write operations, but actual query availability may lag slightly behind the write.</p>
          </li>
        </ol>
        
        <hr className="my-6" />
        
        <h2>Querying</h2>
        
        <p>
          Once the <strong>Embedding</strong> and <strong>Indexing</strong> steps are complete, your <code>EmbText</code> fields become searchable. 
          To do this, use 'query' operation. Please also refer <a href="/document/query" className="text-blue-600 dark:text-blue-400 hover:underline"><strong>Query page</strong></a>
        </p>
        
        <h2>Examples</h2>
        
        <h3>Accessing Generated Chunks</h3>
        
        <p>
          The <code>chunks</code> attribute is <strong>auto-added</strong> by the database after the text finishes embedding and indexing. For instance:
        </p>
        
        <div className="relative">
          <CopyButton code={`emb_text: EmbText  # Assume this EmbText has been inserted and processed

print(emb_text.text)
# "Alice is a data scientist with expertise in AI and machine learning. She has led several projects in natural language processing."

print(emb_text.chunks)
# [
#   "Alice is a data scientist",
#   "with expertise in AI",
#   "and machine learning.",
#   "She has led several projects",
#   "in natural language processing."
# ]`} />
          <SyntaxHighlighter 
            language="python" 
            style={atomDark}
            customStyle={{
              borderRadius: '0.75rem',
              padding: '2rem'
            }}
          >
            {`emb_text: EmbText  # Assume this EmbText has been inserted and processed

print(emb_text.text)
# "Alice is a data scientist with expertise in AI and machine learning. She has led several projects in natural language processing."

print(emb_text.chunks)
# [
#   "Alice is a data scientist",
#   "with expertise in AI",
#   "and machine learning.",
#   "She has led several projects",
#   "in natural language processing."
# ]`}
          </SyntaxHighlighter>
        </div>
        
        <h3>Usage in Nested Fields</h3>
        
        <p><code>EmbText</code> can be embedded anywhere in your document, including nested objects:</p>
        
        <div className="relative">
          <CopyButton code={`{
  "profile": {
    "name": "Bob",
    "bio": EmbText(
      "Bob has over a decade of experience in AI, focusing on neural networks and deep learning."
    )
  }
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
  "profile": {
    "name": "Bob",
    "bio": EmbText(
      "Bob has over a decade of experience in AI, focusing on neural networks and deep learning."
    )
  }
}`}
          </SyntaxHighlighter>
        </div>
        
        <h3>How can we improve this documentation?</h3>
        
        <Feedback />
        
        <h3>Got question? <a href="mailto:hello@capydb.com" className="text-blue-600 dark:text-blue-400 hover:underline">Email us</a></h3>
      </div>
    </DocLayout>
  );
} 