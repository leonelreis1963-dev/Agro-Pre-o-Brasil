
import React from 'react';
import type { PriceData } from '../types';
import { BRLIcon } from './icons/BRLIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { ChartIcon } from './icons/ChartIcon';

interface ResultsDisplayProps {
  data: PriceData;
}

const InfoCard: React.FC<{
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  colorClass: string;
}> = ({ title, value, subtitle, icon, colorClass }) => (
    <div className={`p-4 rounded-lg flex items-center ${colorClass}`}>
        <div className="p-3 bg-white/30 rounded-full mr-4">{icon}</div>
        <div>
            <p className="text-sm font-medium text-white/80">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-white/80">{subtitle}</p>
        </div>
    </div>
);


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg animate-fade-in">
      <header className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800">{data.productName}</h2>
        <p className="text-md text-gray-500">{data.unit}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <InfoCard 
            title="Preço de Hoje" 
            value={`R$ ${data.currentPrice.price}`} 
            subtitle={data.currentPrice.location} 
            icon={<BRLIcon />}
            colorClass="bg-emerald-500"
        />
        <InfoCard 
            title="Primeiro Vencimento Futuro" 
            value={`R$ ${data.futurePrices[0]?.price || 'N/A'}`} 
            subtitle={data.futurePrices[0]?.period || ''}
            icon={<CalendarIcon />}
            colorClass="bg-sky-500"
        />
      </div>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
            <ChartIcon />
            <span className="ml-2">Contratos Futuros</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead className="bg-slate-100 text-gray-600">
              <tr>
                <th className="p-3 font-semibold text-sm">Vencimento</th>
                <th className="p-3 font-semibold text-sm">Preço (BRL)</th>
              </tr>
            </thead>
            <tbody>
              {data.futurePrices.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-slate-50">
                  <td className="p-3 font-medium text-gray-700">{item.period}</td>
                  <td className="p-3 font-mono text-gray-800">R$ {item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Análise Rápida</h3>
        <p className="text-gray-600 bg-slate-50 p-4 rounded-lg border border-slate-200">{data.analysis}</p>
      </section>
    </div>
  );
};