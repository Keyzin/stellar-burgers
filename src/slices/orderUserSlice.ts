import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '../utils/burger-api';

type TOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

export const initialState: TOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const userOrders = createAsyncThunk('user/orders', async () => {
  const data = await getOrdersApi();
  return data;
});

const orderUserSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(userOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(userOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка';
      });
  },
  selectors: {
    selectorUserOrder: (state) => state.orders
  }
});

export const { selectorUserOrder } = orderUserSlice.selectors;
export const { clearOrders } = orderUserSlice.actions;
export default orderUserSlice.reducer;
