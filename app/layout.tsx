import type { Metadata } from "next";

import "./globals.css";

import './globals.css';
import { CryptoProvider } from '../components/cryptoProvider';
import ThemeLoader from "../components/theme-loader";


export const metadata: Metadata = {
  title: 'Crypto Tracker – Live Cryptocurrency Prices & Market Data',
  description: 'Track real-time cryptocurrency prices, charts, and market data for Bitcoin, Ethereum, and top altcoins using the CoinCap API. Stay updated with the latest trends in the crypto market.',
  keywords: [
    'crypto tracker',
    'real-time cryptocurrency prices',
    'Bitcoin price',
    'Ethereum price',
    'altcoin prices',
    'live crypto charts',
    'cryptocurrency market data',
    'CoinCap API',
    'crypto app',
    'crypto market trends'
  ],

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CryptoProvider >
          <ThemeLoader />
          {children}
        </CryptoProvider>
      </body>
    </html>
  );
}