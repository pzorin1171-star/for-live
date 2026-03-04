import Link from 'next/link';
import Search from '@/components/ui/Search';
import Card from '@/components/ui/Card';
import { getAllTemplates } from '@/lib/search'; // будет ниже
import { getAllPosts } from '@/lib/blog'; // будет ниже
import type { Template } from '@/types/template';
import type { BlogPost } from '@/types/blog';
import { getAllTemplates } from '@/lib/search';
interface HomeProps {
  recentTemplates: Template[];
  recentPosts: BlogPost[];
}

export default function Home({ recentTemplates, recentPosts }: HomeProps) {
  return (
    <div>
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Шаблоны документов и ипотечный калькулятор
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Бесплатные типовые формы, статьи и удобный расчёт ипотеки
        </p>
        <div className="max-w-xl mx-auto">
          <Search placeholder="Поиск шаблонов..." />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Популярные категории</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold text-lg mb-2">Аренда и жильё</h3>
            <p className="text-gray-600">Договоры найма, акты, расписки</p>
            <Link href="/templates?category=rent" className="text-primary hover:underline mt-4 inline-block">
              Перейти →
            </Link>
          </Card>
          <Card>
            <h3 className="font-semibold text-lg mb-2">Долговые расписки</h3>
            <p className="text-gray-600">Расписки, договоры займа</p>
            <Link href="/templates?category=debt" className="text-primary hover:underline mt-4 inline-block">
              Перейти →
            </Link>
          </Card>
          <Card>
            <h3 className="font-semibold text-lg mb-2">Трудовые отношения</h3>
            <p className="text-gray-600">Заявления, договоры, объяснительные</p>
            <Link href="/templates?category=work" className="text-primary hover:underline mt-4 inline-block">
              Перейти →
            </Link>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Последние шаблоны</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentTemplates.slice(0, 4).map((template) => (
            <Card key={template.slug}>
              <h3 className="font-semibold text-lg mb-2">{template.title}</h3>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <Link href={`/templates/${template.slug}`} className="text-primary hover:underline">
                Подробнее →
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Последние статьи</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentPosts.slice(0, 2).map((post) => (
            <Card key={post.slug}>
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                Читать →
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  // Импортируем функции, которые будут читать JSON
  const templates = (await import('@/data/templates.json')).default;
  const posts = (await import('@/data/blog-posts.json')).default;

  return {
    props: {
      recentTemplates: templates,
      recentPosts: posts,
    },
  };
}
