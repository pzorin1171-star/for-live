import postsData from '@/data/blog-posts.json';
import type { BlogPost } from '@/types/blog';

const posts = postsData as BlogPost[];

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug);
}
