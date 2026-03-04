import Link from 'next/link';
import Card from '@/components/ui/Card';
import type { Template } from '@/types/template';

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <Card>
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
          <p className="text-gray-600 mb-2">{template.description}</p>
          <p className="text-sm text-gray-500">Категория: {template.categoryName}</p>
          {template.source && (
            <p className="text-xs text-gray-400 mt-2">Источник: {template.source}</p>
          )}
        </div>
        <div className="mt-4 md:mt-0">
          <Link href={`/templates/${template.slug}`}>
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700">
              Перейти к шаблону
            </button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default TemplateCard;
