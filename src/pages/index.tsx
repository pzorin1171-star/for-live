import Link from 'next/link';
import { getAllTemplates } from '@/lib/search';
import { getAllPosts } from '@/lib/blog';
import Search from '@/components/ui/Search';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import type { Template } from '@/types/template';
import type { BlogPost } from '@/types/blog';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface HomeProps {
  recentTemplates: Template[];
  recentPosts: BlogPost[];
}

export default function Home({ recentTemplates, recentPosts }: HomeProps) {
  return (
    <div className="space-y-16">
      {/* Hero секция */}
      <section className="bg-primary rounded-2xl text-white py-16 px-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Шаблоны документов и ипотечный калькулятор
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Бесплатные типовые формы, полезные статьи и удобный расчёт ипотеки
        </p>
        <div className="max-w-xl mx-auto">
          <Search placeholder="Например, договор аренды..." />
        </div>
      </section>

      {/* Категории */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Категории</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Аренда и жильё', slug: 'rent' },
            { name: 'Долговые расписки', slug: 'debt' },
            { name: 'Трудовые отношения', slug: 'work' },
            { name: 'Бытовые договоры', slug: 'services' },
            { name: 'Доверенности', slug: 'power' },
            { name: 'Бизнес', slug: 'business' },
            { name: 'Госуслуги', slug: 'government' },
            { name: 'Транспорт', slug: 'transport' },
          ].map((cat) => (
            <Link key={cat.slug} href={`/templates?category=${cat.slug}`}>
              <Card className="text-center p-4 hover:shadow-card-hover transition-shadow cursor-pointer">
                <h3 className="font-medium text-gray-900">{cat.name}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Последние шаблоны */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Новые шаблоны</h2>
          <Link href="/templates" className="text-primary hover:text-primary-dark font-medium flex items-center text-sm">
            Все шаблоны <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTemplates.slice(0, 6).map((template) => (
            <Link key={template.slug} href={`/templates/${template.slug}`}>
              <Card hover className="h-full flex flex-col">
                <span className="text-xs font-medium text-primary bg-blue-50 px-2 py-1 rounded self-start mb-2">
                  {template.categoryName}
                </span>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{template.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{template.description}</p>
                <div className="flex items-center text-primary text-sm font-medium mt-auto">
                  Подробнее <ArrowRightIcon className="h-4 w-4 ml-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Баннер калькулятора */}
      <section className="bg-gray-100 rounded-xl p-8 md:p-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-3">Ипотечный калькулятор</h2>
          <p className="text-gray-700 mb-6">
            Рассчитайте ежемесячный платёж, переплату и получите график погашения.
          </p>
          <Link href="/calculator">
            <Button variant="primary" size="lg">
              Перейти к калькулятору
            </Button>
          </Link>
        </div>
      </section>

      {/* Статьи */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Полезные статьи</h2>
          <Link href="/blog" className="text-primary hover:text-primary-dark font-medium flex items-center text-sm">
            Все статьи <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentPosts.slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card hover className="h-full">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Читать <ArrowRightIcon className="h-4 w-4 ml-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const templates = getAllTemplates();
  const posts = getAllPosts();

  return {
    props: {
      recentTemplates: templates,
      recentPosts: posts,
    },
  };
}
