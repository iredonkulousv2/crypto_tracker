#  Crypto Tracker

A responsive cryptocurrency tracker built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. This app fetches real-time data from the CoinCap API and allows users to view, sort, and inspect detailed information about top cryptocurrencies.

## 🚀 Features

- Live data for top cryptocurrencies
- Sortable table (by price, market cap, 24h % change)
- Clickable rows to navigate to detailed coin pages
- Responsive and clean UI with Tailwind CSS
- Dark mode support

---

## 🛠 Setup Instructions

### 1. Clone the repository

```bash
1. Clone the repository
git clone https://github.com/iredonkulousv2/crypto-tracker.git
cd crypto-tracker
2. Install dependencies
npm install
3. Run the development server
npm run dev
Open http://localhost:3000 in your browser to see the app.

🧱 Architecture & Approach
Tech Stack
Next.js 14 (App Router)

TypeScript

Tailwind CSS

Structure
app/: Main application pages using Next.js App Router

components/: Reusable UI components like CryptoTable

store/: Manages global application state using Redux Toolkit, including store configuration, slices, and related utilities.

Data Flow
Data is fetched from the CoinCap API

Crypto table supports client-side sorting

Navigation to detail pages is handled using Next.js dynamic routes

📐 Assumptions & Trade-offs
Client-Side Sorting: All sorting is handled client-side for speed and simplicity. This may become inefficient with very large datasets.

Public API Usage: The app directly queries the public CoinCap API with no caching or rate-limiting safeguards.

No Authentication: The app is open to all users with no login or personalization features.

Mobile Responsiveness: Tailwind ensures the UI is responsive on mobile devices, but more testing could improve polish across breakpoints.


