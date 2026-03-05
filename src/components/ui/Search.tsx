import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const Search: React.FC<SearchProps> = ({
  placeholder = 'Поиск шаблонов...',
  onSearch,
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      router.push(`/templates?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-5 py-3 pl-12 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
      />
      <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-md hover:bg-primary-dark transition-colors text-sm font-medium"
      >
        Найти
      </button>
    </form>
  );
};

export default Search;
