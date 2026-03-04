import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ placeholder = 'Поиск...', onSearch }) => {
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
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Найти
      </button>
    </form>
  );
};

export default Search;
