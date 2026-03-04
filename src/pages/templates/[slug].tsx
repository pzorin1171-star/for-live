import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { getTemplateBySlug, getAllTemplates } from '@/lib/search';
import TemplateForm from '@/components/templates/TemplateForm';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import type { Template } from '@/types/template';

interface TemplatePageProps {
  template: Template;
}

export default function TemplatePage({ template }: TemplatePageProps) {
  return (
    <div>
      <div className="mb-4">
        <Link href="/templates" className="text-primary hover:underline">
          ← Назад к списку
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">{template.title}</h1>
      <p className="text-gray-600 mb-4">{template.description}</p>

      {template.source && (
        <p className="text-sm text-gray-500 mb-4">Источник: {template.source}</p>
      )}

      {/* Дисклеймер */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-sm text-yellow-700">
          <strong>Важно:</strong> Данный документ является типовым и носит информационный характер. Он не является юридической консультацией. Рекомендуется обратиться к специалисту для адаптации под вашу конкретную ситуацию.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Предпросмотр */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Предпросмотр документа</h2>
          <div className="bg-gray-50 p-4 rounded-md font-mono text-sm whitespace-pre-wrap">
            {template.preview}
          </div>
        </Card>

        {/* Форма для заполнения и скачивания */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Заполнить и скачать</h2>
          {template.fields && template.fields.length > 0 ? (
            <TemplateForm template={template} />
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                Скачайте готовый шаблон и заполните его вручную.
              </p>
              <div className="flex space-x-4">
                <a href={template.staticFiles.docx} download>
                  <Button variant="primary">Скачать DOCX</Button>
                </a>
                <a href={template.staticFiles.pdf} download>
                  <Button variant="outline">Скачать PDF</Button>
                </a>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const templates = getAllTemplates();
  const paths = templates.map((t) => ({
    params: { slug: t.slug },
  }));

  return {
    paths,
    fallback: false, // если шаблона нет – 404
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const template = getTemplateBySlug(slug);

  if (!template) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      template,
    },
  };
};
