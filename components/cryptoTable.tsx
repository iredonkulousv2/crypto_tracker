'use client';

import { useState } from 'react';
import Link from 'next/link';

type Coin = {
  id: string;
  rank: string;
  name: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
  changePercent24Hr: string;
};

type Props = {
  coins: Coin[];
};

type SortKey = 'priceUsd' | 'marketCapUsd' | 'changePercent24Hr';

export default function CryptoTable({ coins }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('marketCapUsd');
  const [sortAsc, setSortAsc] = useState(false);

  const sortedCoins = [...coins].sort((a, b) => {
    const aValue = parseFloat(a[sortKey]);
    const bValue = parseFloat(b[sortKey]);
    return sortAsc ? aValue - bValue : bValue - aValue;
  });

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const sortArrow = (key: SortKey) =>
    sortKey === key ? (sortAsc ? '↑' : '↓') : '';

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 text-left text-gray-900">
            <th className="p-3 border-b border-gray-300 dark:border-gray-600">#</th>
            <th className="p-3 border-b border-gray-300 dark:border-gray-600">Name</th>
            <th
              className="p-3 border-b border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-300 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white transition"
              onClick={() => handleSort('priceUsd')}
            >
              Price {sortArrow('priceUsd')}
            </th>
            <th
              className="p-3 border-b border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-300 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white transition hidden sm:table-cell"
              onClick={() => handleSort('marketCapUsd')}
            >
              Market Cap {sortArrow('marketCapUsd')}
            </th>
            <th
              className="p-3 border-b border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-300 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white transition"
              onClick={() => handleSort('changePercent24Hr')}
            >
              % 24h {sortArrow('changePercent24Hr')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCoins.map((coin) => (
            <tr
              key={coin.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-400 transition cursor-pointer"
            >
              <td className="p-3 border-b border-gray-300 dark:border-gray-600  ">
                {coin.rank}
              </td>
              <td className="p-3 border-b border-gray-300 dark:border-gray-600  hover:underline">
                <Link href={`/coin/${coin.id}`}>
                  {coin.name} ({coin.symbol})
                </Link>
              </td>
              <td className="p-3 border-b border-gray-300 dark:border-gray-600 ">
                ${parseFloat(coin.priceUsd).toFixed(2)}
              </td>
              <td className="p-3 border-b border-gray-300 dark:border-gray-600  hidden sm:table-cell">
                ${(Number(coin.marketCapUsd) / 1_000_000_000).toFixed(2)}B
              </td>
              <td
                className={`p-3 border-b border-gray-300 dark:border-gray-600 ${
                  parseFloat(coin.changePercent24Hr) >= 0
                    ? 'text-green-500 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {parseFloat(coin.changePercent24Hr).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
