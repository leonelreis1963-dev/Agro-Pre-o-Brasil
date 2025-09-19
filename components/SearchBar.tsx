
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="mt-8">
      <div className="flex rounded-full shadow-lg bg-white overflow-hidden border-2 border-transparent focus-within:border-emerald-500 transition-colors">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: Soja, Milho, Café Arábica..."
          className="w-full px-6 py-4 text-gray-700 placeholder-gray-500 focus:outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !query}
          className="bg-emerald-600 text-white px-6 py-4 font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 disabled:bg-emerald-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
    </form>
  );
};
