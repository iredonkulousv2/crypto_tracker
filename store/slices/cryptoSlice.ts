import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const fetchTopCoins = createAsyncThunk('crypto/fetchTopCoins', async () => {
  const res = await fetch('https://rest.coincap.io/v3/assets?limit=20', {
    headers: {
      Authorization: `Bearer ${process.env.MY_API_KEY}`,
    },
    cache: 'no-store', 
  });
  if (!res.ok) {
    throw new Error('Failed to fetch top coins');
  }

  const data = await res.json();
  return data.data;
});

export type Coin = {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
  changePercent24Hr: string;
};

type CryptoState = {
  coins: Coin[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: CryptoState = {
  coins: [],
  status: 'idle',
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<Coin[]>) => {
      state.coins = action.payload;
      state.status = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopCoins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopCoins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coins = action.payload;
      })
      .addCase(fetchTopCoins.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setCoins } = cryptoSlice.actions;
export default cryptoSlice.reducer;
