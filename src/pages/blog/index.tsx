import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import Card from '@/components/ui/Card';
import type { BlogPost } from '@/types/blog';
import type { GetStaticProps } from 'next';

interface BlogIndexProps {
  posts: BlogPost[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Блог</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card key={post.slug}>
            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
              Читать далее →
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: { posts },
  };
};
