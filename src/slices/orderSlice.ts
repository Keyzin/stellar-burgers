import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import { orderBurgerApi } from '../utils/burger-api';

type TOrderState = {
  order: TOrder | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
};

export const initialState: TOrderState = {
  order: null,
  orderRequest: false,
  orderModalData: null,
  isLoading: false
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
    return data.order;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.orderModalData = null;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.isLoading = false;
      });
  },
  selectors: {
    selectorOrder: (state) => state.orderModalData,
    selectorIsLoadingOrder: (state) => state.isLoading
  }
});

export const { clearOrder } = orderSlice.actions;
export const { selectorOrder, selectorIsLoadingOrder } = orderSlice.selectors;
export default orderSlice.reducer;
