import Fuse from 'fuse.js';
import templatesData from '@/data/templates.json';
import type { Template } from '@/types/template';

const templates = templatesData as Template[];

// Настройки поиска Fuse.js
const fuseOptions = {
  keys: ['title', 'description', 'categoryName'],
  threshold: 0.3,
};

const fuse = new Fuse(templates, fuseOptions);

export function searchTemplates(query: string): Template[] {
  if (!query) return templates;
  const results = fuse.search(query);
  return results.map(r => r.item);
}

export function getTemplatesByCategory(category: string): Template[] {
  if (!category) return templates;
  return templates.filter(t => t.category === category);
}

export function getAllTemplates(): Template[] {
  return templates;
}

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find(t => t.slug === slug);
}

export function getAllCategories(): { id: string; name: string }[] {
  const categoriesMap = new Map();
  templates.forEach(t => {
    if (!categoriesMap.has(t.category)) {
      categoriesMap.set(t.category, t.categoryName);
    }
  });
  return Array.from(categoriesMap.entries()).map(([id, name]) => ({ id, name }));
}
