import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getAllCategories, searchTemplates, getTemplatesByCategory } from '@/lib/search';
import TemplateCard from '@/components/templates/TemplateCard';
import Search from '@/components/ui/Search';
import type { Template } from '@/types/template';
import type { GetServerSideProps } from 'next';

interface TemplatesPageProps {
  templates: Template[];
  categories: { id: string; name: string }[];
  currentCategory: string;
  searchQuery: string;
}

export default function TemplatesPage({
  templates,
  categories,
  currentCategory,
  searchQuery,
}: TemplatesPageProps) {
  const router = useRouter();
  const [query, setQuery] = useState(searchQuery);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    router.push({
      pathname: '/templates',
      query: newQuery ? { search: newQuery } : {},
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    router.push({
      pathname: '/templates',
      query: categoryId ? { category: categoryId } : {},
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Библиотека шаблонов</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Боковая панель с категориями */}
        <aside className="md:w-64 flex-shrink-0">
          <h2 className="font-semibold text-lg mb-3">Категории</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleCategoryChange('')}
                className={`text-left w-full px-3 py-2 rounded-md ${
                  !currentCategory ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`}
              >
                Все шаблоны
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`text-left w-full px-3 py-2 rounded-md ${
                    currentCategory === cat.id ? 'bg-primary text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Основной контент */}
        <div className="flex-1">
          <div className="mb-6">
            <Search onSearch={handleSearch} placeholder="Поиск по названию или описанию..." />
          </div>

          {templates.length === 0 ? (
            <p className="text-gray-600">Ничего не найдено.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {templates.map((template) => (
                <TemplateCard key={template.slug} template={template} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category, search } = context.query;
  const categories = getAllCategories();

  let templates: Template[];
  if (search && typeof search === 'string') {
    templates = searchTemplates(search);
  } else if (category && typeof category === 'string') {
    templates = getTemplatesByCategory(category);
  } else {
    templates = getAllTemplates();
  }

  return {
    props: {
      templates,
      categories,
      currentCategory: category || '',
      searchQuery: search || '',
    },
  };
};
