'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  id: string;
  initialPrice: string;
};

type PricePoint = {
  time: string;
  price: number;
};

export default function CoinDetailsClient({ id, initialPrice }: Props) {
  const [priceData, setPriceData] = useState<PricePoint[]>([
    {
      time: new Date().toLocaleTimeString(),
      price: parseFloat(initialPrice),
    },
  ]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          `https://rest.coincap.io/v3/assets/${id}?apiKey=999e1c6f1dec7528b047efec72a6158fed584a1ef50c38450e1e5c19899a4070`,
          { cache: 'no-store' }
        );

        const data = await res.json();
        const newPrice = parseFloat(data.data.priceUsd);

        setPriceData((prev) => [
          ...prev.slice(-19),
          {
            time: new Date().toLocaleTimeString(),
            price: newPrice,
          },
        ]);
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    };

    const interval = setInterval(fetchPrice, 5000);
    return () => clearInterval(interval);
  }, [id]);

  const latestPrice = priceData[priceData.length - 1]?.price;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-1">Real-Time Price Chart</h2>
      <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-3">
        ${latestPrice.toFixed(2)}
      </p>
      <div className="h-64 w-full bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData}>
            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
            <YAxis
              domain={['auto', 'auto']}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => `$${value.toFixed(2)}`}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
