import { MDXRemote } from 'next-mdx-remote/rsc';
import DocLayout from '@/components/DocLayout';
import MDXComponents from '@/components/MDXComponents';
import fs from 'fs';
import path from 'path';

export default async function EmbJsonIndexPage() {
  // Read the MDX content from the content directory
  const mdxPath = path.join(process.cwd(), 'src/content/emb_json/index.mdx');
  const mdxContent = fs.readFileSync(mdxPath, 'utf8');
  
  // Remove the imports at the top of the file if any
  const contentWithoutImports = mdxContent.replace(/import.*?;(\r?\n|\r)/g, '');
  
  return (
    <DocLayout>
      <MDXRemote 
        source={contentWithoutImports} 
        components={MDXComponents as any} 
      />
    </DocLayout>
  );
} 