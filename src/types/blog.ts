export interface BlogPost {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  content: string; // HTML или Markdown
  coverImage?: string;
}
