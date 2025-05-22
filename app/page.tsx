
import CryptoTable from '../components/cryptoTable';
import ThemeToggle from '@/components/ThemeToggle';

export type Coin = {
  id: string;
  rank: string;
  name: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
  changePercent24Hr: string;
};

async function getTopCoins(): Promise<Coin[]> {


  const res = await fetch('https://rest.coincap.io/v3/assets?limit=20', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    next: {
      revalidate: 60, 
    }, 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch top coins');
  }

  const data = await res.json();
  return data.data;
}

export default async function HomePage() {
  const coins = await getTopCoins();


  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ThemeToggle/>
      <h1 className="text-3xl font-bold mb-6 text-center">Top 20 Cryptocurrencies</h1>
      <CryptoTable coins={coins} />
    </div>
  );
}
