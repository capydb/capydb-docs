'use client';
import DocLayout from '@/components/DocLayout';
import LanguageToggle from '@/components/LanguageToggle';
import LanguageContent from '@/components/LanguageContent';
import Feedback from '@/components/Feedback';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';

export default function FindPage() {
  const pythonCode = `# Filter to match the document(s)
filter_criteria = {
    "age": {"$gt": 25}
}

# Optional projection, sort, limit, and skip parameters
projection = {
    "name": 1,
    "age": 1,
    "_id": 0  # Exclude _id
}

sort = {
    "age": -1  # Sort by age in descending order
}

limit = 5
skip = 0

# Sending the request
response = collection.find(filter_criteria, projection, sort, limit, skip)

# Process the results - response is now a list of documents
for doc in response:
    print(f"Name: {doc['name']}, Age: {doc['age']}")`;

  const typescriptCode = `// Filter to match the document(s)
const filter = {
  age: { $gt: 25 },
};

// Optional projection, sort, limit, and skip parameters
const projection = {
  name: 1,
  age: 1,
  _id: 0, // Exclude _id
};

const sort = {
  age: -1, // Sort by age in descending order
};

const limit = 5;
const skip = 0;

const response = collection.find(filter, projection, sort, limit, skip);

// Process the results - response is now an array of documents
response.forEach(doc => {
  console.log(\`Name: \${doc.name}, Age: \${doc.age}\`);
});`;

  const jsonResponse = `[
  {
    "name": "Alice Smith",
    "age": 29
  },
  {
    "name": "Bob Johnson",
    "age": 40
  }
]`;

  return (
    <DocLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Find</h1>
        
        <LanguageToggle />
        
        <p>
          CapyDB allows you to query and retrieve documents from a collection using operations similar to MongoDB's <code>find()</code> functionality. 
          You can use filters to match specific documents, and optionally, specify projection fields, sort order, and pagination options.
        </p>
        
        <h2>Find Operation</h2>
        
        <p>
          The <code>find</code> operation is used to query multiple documents in a collection based on a filter. 
          You can optionally include projection, sort, limit, and skip parameters for more advanced queries.
        </p>
        
        <h3>Example Python Code for <code>find</code></h3>
        
        <p>Here's how you can query documents using Python, by applying a filter, projection, and sort operation:</p>
        
        <LanguageContent language="python">
          <CodeBlock code={pythonCode} language="python" />
        </LanguageContent>
        
        <LanguageContent language="typescript">
          <CodeBlock code={typescriptCode} language="typescript" />
        </LanguageContent>
        
        <h3>Find Response</h3>
        
        <p>
          A successful find operation will return a JSON array containing the matching documents in the collection. 
          Here's an example response:
        </p>
        
        <CodeBlock code={jsonResponse} language="json" />
        
        <h2>Parameters for Find Operations</h2>
        
        <table className="w-full border-collapse my-4">
          <thead>
            <tr>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Parameter</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>filter</strong></td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                A query object to match the documents to retrieve. This works the same way as MongoDB filters, 
                allowing you to specify conditions to find the documents. For more details, refer to the 
                <Link href="/syntax/filter" className="text-blue-600 dark:text-blue-400 hover:underline"> filter operator syntax</Link>.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>projection</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                A field specification object to control which fields are returned in the result set. 
                Use <code>1</code> to include and <code>0</code> to exclude fields. For more details, refer to the 
                <Link href="/syntax/projection" className="text-blue-600 dark:text-blue-400 hover:underline"> projection operator syntax</Link>.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>sort</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                An object specifying the sort order for the result set (e.g., <code>{`{ "age": 1 }`}</code> to sort by <code>age</code> in ascending order, 
                or <code>{`{ "age": -1 }`}</code> for descending).
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>limit</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                A number to limit the number of documents returned.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2"><strong>skip</strong> (optional)</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                A number to skip the first <code>n</code> documents in the result set, useful for pagination.
              </td>
            </tr>
          </tbody>
        </table>
        
        <h3>How can we improve this documentation?</h3>
        
        <Feedback />
        
        <h3>Got question? <a href="mailto:hello@capydb.com" className="text-blue-600 dark:text-blue-400 hover:underline">Email us</a></h3>
      </div>
    </DocLayout>
  );
} 