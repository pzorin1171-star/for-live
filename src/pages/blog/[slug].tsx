import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import type { BlogPost } from '@/types/blog';

interface BlogPostProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostProps) {
  return (
    <div>
      <div className="mb-4">
        <Link href="/blog" className="text-primary hover:underline">
          ← Назад к списку
        </Link>
      </div>

      <article className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 mb-6">{post.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);
  if (!post) return { notFound: true };
  return { props: { post } };
};
