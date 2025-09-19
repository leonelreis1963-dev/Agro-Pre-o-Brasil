import React, { useState, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { PriceData } from './types';
import { fetchAgriculturalPrices } from './services/geminiService';
import { QuickSearch } from './components/QuickSearch';

const App: React.FC = () => {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (product: string) => {
    if (!product) return;

    setIsLoading(true);
    setError(null);
    setPriceData(null);

    try {
      const data = await fetchAgriculturalPrices(product);
      setPriceData(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setPriceData(null);
    setError(null);
  }, []);

  const HeroContent: React.FC = () => (
    <div className="text-center">
        <img src="https://picsum.photos/seed/agriculture/1200/300" alt="Campo agrícola" className="w-full h-48 object-cover rounded-lg mb-6 shadow-lg" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Agro Preço Marola</h1>
        <p className="text-lg text-gray-600">Cotações de commodities agrícolas com o poder da IA.</p>
    </div>
  );

  const popularProducts = ['Soja Uberlândia', 'Milho Uberlândia', 'Boi Gordo Uberlândia'];

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {!priceData && !isLoading && !error && <HeroContent />}
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          
          {!priceData && !isLoading && !error && (
            <QuickSearch 
              products={popularProducts}
              onSearch={handleSearch}
              isLoading={isLoading}
            />
          )}

          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {priceData && <ResultsDisplay data={priceData} onReset={handleReset} />}
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-gray-500">
        <p>Potencializado por IA | Dados para fins ilustrativos.</p>
      </footer>
    </div>
  );
};

export default App;