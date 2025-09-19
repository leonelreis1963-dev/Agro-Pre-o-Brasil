import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { FuturePrice } from '../types';

interface FuturePricesChartProps {
  data: FuturePrice[];
}

const parsePrice = (price: string): number => {
  const cleanedPrice = price.replace(/R\$\s?/, '').replace(/\./g, '').replace(',', '.');
  const value = parseFloat(cleanedPrice);
  return isNaN(value) ? 0 : value;
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
        <p className="font-bold text-gray-800">{`${label}`}</p>
        <p className="text-sky-600">{`Preço: R$ ${payload[0].value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</p>
      </div>
    );
  }
  return null;
};

export const FuturePricesChart: React.FC<FuturePricesChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    period: item.period,
    price: parsePrice(item.price),
  }));

  return (
    <div className="w-full h-72">
        <ResponsiveContainer>
            <LineChart
                data={chartData}
                margin={{
                    top: 5, right: 20, left: 10, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="period" 
                  tick={{ fill: '#6b7280', fontSize: 12 }} 
                  stroke="#a1a1aa"
                />
                <YAxis
                    tickFormatter={(value) => `R$ ${value}`}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    stroke="#a1a1aa"
                    domain={['dataMin - 20', 'dataMax + 20']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '14px' }} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  name="Preço Futuro (BRL)" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: '#0284c7' }} 
                  dot={{ r: 4, fill: '#0ea5e9' }}
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
  );
};