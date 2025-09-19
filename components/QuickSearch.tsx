
import React from 'react';

interface QuickSearchProps {
  products: string[];
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const QuickSearch: React.FC<QuickSearchProps> = ({ products, onSearch, isLoading }) => {
  const handleQuickSearch = (product: string) => {
    onSearch(product);
  };

  return (
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600 mb-3">Ou tente uma busca rápida:</p>
      <div className="flex justify-center items-center gap-3 flex-wrap">
        {products.map((product) => (
          <button
            key={product}
            onClick={() => handleQuickSearch(product)}
            disabled={isLoading}
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-full text-sm font-medium hover:bg-emerald-100 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {product}
          </button>
        ))}
      </div>
    </div>
  );
};
