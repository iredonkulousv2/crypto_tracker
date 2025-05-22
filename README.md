# 🪙 Crypto Tracker App

A modern cryptocurrency tracker that displays the top 20 cryptocurrencies by market cap. Built with **Next.js (App Router)**, **Tailwind CSS**, and **Redux Toolkit**, this app supports server-side rendering, client-side interactivity, and real-time graph updates.

---

## 🚀 Features

- Server-rendered homepage using the App Router
- Sortable table (client component)
- Dark Mode Support
- Modern web stack: Next.js (App Router), Tailwind CSS, Redux Toolkit

---

## 🛠 Setup Instructions

### 1. Clone the repository

```bash
1. Clone the repository
git clone https://github.com/iredonkulousv2/crypto-tracker.git
cd crypto-tracker
2. Install dependencies
npm install
3.Set up environment variables
NEXT_PUBLIC_API_URL= Your Api Key from coincap.io
3. Run the development server
npm run dev
Open http://localhost:3000 in your browser to see the app.

🏗️ Architecture & Approach
📁 Folder Structure (App Router)
app/
Root of the routing system using the new App Router.

page.tsx – Homepage server component using fetch() for SSR

coin/[id]/page.tsx – Dynamic coin pages that fetch and display real-time data


⚙️ Data Fetching
Homepage (app/page.tsx):
A Server Component that fetches the top 20 cryptocurrencies using the native fetch() API. Data is passed down to a Client Component (<CryptoTable />) that enables sorting.

Coin Page (app/coin/[id]/page.tsx):
A Server Component for static structure. It includes a Client Component that sets up polling (every 2s) to fetch live price data and render an updating chart.

📐 Assumptions & Trade-offs
Real-time updates:
Implemented using polling (setInterval) every 2 second. WebSockets would be more efficient, but polling simplifies deployment and avoids a custom backend.

**Redux may be overkill for this app:**  
  Given the small size and simplicity of the app, especially with data only being passed one level down (from page to table), using Redux for global state management added unnecessary complexity. Prop drilling would have sufficed for managing the coin data, and using lightweight state management (like `useState` or `useContext`) could simplify the codebase.


