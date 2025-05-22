import Link from 'next/link';
import CoinGraph from './CoinGraph';

type Coin = {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  changePercent24Hr: string;
  rank: string;
  supply: string;
};

type CoinPageProps = {
  params: Promise<{ id: string }>
};

async function getCoin(id: string): Promise<Coin> {


  const res = await fetch(`https://rest.coincap.io/v3/assets/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.MY_API_KEY}`,
    },
    next: {
      revalidate: 60, 
    },  
  });

  if (!res.ok) {
    throw new Error('Failed to fetch coin data');
  }

  const data = await res.json();
  return data.data;
}

export default async function CoinPage({ params }: CoinPageProps) {
  const { id } = await params;
  const coin = await getCoin(id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      <Link href="/">
        <button className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          ← Back to Home
        </button>
      </Link>

      <h1 className="text-3xl font-bold mb-4">{coin.name} ({coin.symbol})</h1>
      <CoinGraph id={coin.id} initialPrice={coin.priceUsd} />

      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
        <div><strong>Rank:</strong> {coin.rank}</div>
        <div><strong>Market Cap:</strong> ${(+coin.marketCapUsd / 1_000_000_000).toFixed(2)}B</div>
        <div><strong>Volume (24h):</strong> ${(+coin.volumeUsd24Hr / 1_000_000_000).toFixed(2)}B</div>
        <div>
          <strong>Change (24h):</strong>
          <span className={+coin.changePercent24Hr >= 0 ? 'text-green-600' : 'text-red-500'}>
            {' '}{parseFloat(coin.changePercent24Hr).toFixed(2)}%
          </span>
        </div>
        <div><strong>Supply:</strong> {(+coin.supply).toLocaleString()}</div>
      </div>
    </div>
  );
}
