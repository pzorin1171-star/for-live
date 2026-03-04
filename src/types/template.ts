export interface TemplateField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'textarea';
}

export interface Template {
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  description: string;
  source?: string;
  preview: string; // текст с плейсхолдерами {{field}}
  fields?: TemplateField[]; // если есть форма для заполнения
  staticFiles: {
    docx: string;
    pdf: string;
  };
}

export type Category = {
  id: string;
  name: string;
};
