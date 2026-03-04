import Link from 'next/link';
import Image from 'next/image';
import { getAllTemplates } from '@/lib/search';
import { getAllPosts } from '@/lib/blog';
import Search from '@/components/ui/Search';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import type { Template } from '@/types/template';
import type { BlogPost } from '@/types/blog';
import {
  HomeIcon,
  DocumentTextIcon,
  CalculatorIcon,
  NewspaperIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

interface HomeProps {
  recentTemplates: Template[];
  recentPosts: BlogPost[];
}

// Иконки для категорий
const categoryIcons: Record<string, React.ReactNode> = {
  rent: '🏠',
  debt: '💰',
  work: '💼',
  services: '🔧',
  power: '📝',
  business: '🏢',
  government: '🏛️',
  transport: '🚗',
  finance: '📊',
  pension: '👵',
  social: '🤝',
  housing: '🏘️',
  insurance: '🛡️',
  court: '⚖️',
  other: '📁',
};

export default function Home({ recentTemplates, recentPosts }: HomeProps) {
  return (
    <div className="space-y-20">
      {/* Hero секция с градиентом */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-custom py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Шаблоны документов<br />и ипотечный калькулятор
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
            Бесплатные типовые формы, полезные статьи и удобный расчёт ипотеки в одном месте
          </p>
          <div className="max-w-2xl mx-auto">
            <Search placeholder="Например, договор аренды..." />
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-blue-200">
            <span className="flex items-center"><DocumentTextIcon className="h-5 w-5 mr-1" /> 80+ шаблонов</span>
            <span className="flex items-center"><CalculatorIcon className="h-5 w-5 mr-1" /> Точный расчёт</span>
            <span className="flex items-center"><NewspaperIcon className="h-5 w-5 mr-1" /> Полезные статьи</span>
          </div>
        </div>
      </section>

      {/* Популярные категории */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Популярные категории</h2>
          <Link href="/templates" className="text-primary hover:text-blue-700 font-medium flex items-center">
            Все шаблоны <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            { id: 'rent', name: 'Аренда и жильё', count: 12 },
            { id: 'debt', name: 'Долговые расписки', count: 8 },
            { id: 'work', name: 'Трудовые отношения', count: 15 },
            { id: 'services', name: 'Бытовые услуги', count: 10 },
            { id: 'power', name: 'Доверенности', count: 7 },
          ].map((cat) => (
            <Link key={cat.id} href={`/templates?category=${cat.id}`}>
              <Card className="text-center p-6 hover:scale-105 cursor-pointer transition-transform">
                <div className="text-4xl mb-3">{categoryIcons[cat.id] || '📄'}</div>
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{cat.count} шаблонов</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Последние шаблоны */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Новые шаблоны</h2>
          <Link href="/templates" className="text-primary hover:text-blue-700 font-medium flex items-center">
            Смотреть все <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTemplates.slice(0, 6).map((template) => (
            <Link key={template.slug} href={`/templates/${template.slug}`}>
              <Card hover className="h-full flex flex-col">
                <span className="text-xs font-medium text-primary bg-blue-50 px-3 py-1 rounded-full self-start mb-3">
                  {template.categoryName}
                </span>
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{template.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{template.description}</p>
                <div className="flex items-center text-primary font-medium mt-auto">
                  Перейти к шаблону <ArrowRightIcon className="h-4 w-4 ml-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Баннер с ипотечным калькулятором */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-10 md:p-16 shadow-2xl">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Рассчитайте ипотеку за минуту</h2>
          <p className="text-lg md:text-xl text-purple-100 mb-8">
            Узнайте ежемесячный платёж, переплату и получите график погашения с учётом ваших параметров.
          </p>
          <Link href="/calculator">
            <Button variant="primary" size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
              Перейти к калькулятору
            </Button>
          </Link>
        </div>
      </section>

      {/* Последние статьи */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Полезные статьи</h2>
          <Link href="/blog" className="text-primary hover:text-blue-700 font-medium flex items-center">
            Все статьи <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentPosts.slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card hover className="h-full">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center text-primary font-medium">
                  Читать статью <ArrowRightIcon className="h-4 w-4 ml-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA секция */}
      <section className="bg-gray-900 text-white rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Не нашли нужный шаблон?</h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Напишите нам, и мы добавим недостающий документ в нашу коллекцию.
        </p>
        <Button variant="primary" size="lg" className="bg-primary hover:bg-blue-700">
          Предложить шаблон
        </Button>
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
