import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';
import { RootState } from 'src/services/store';

type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch ingredients';
      });
  },
  selectors: {
    selectIngridients: (state) => state.ingredients,
    selectLoading: (state) => state.loading
  }
});

export default ingredientsSlice.reducer;
export const { selectIngridients, selectLoading } = ingredientsSlice.selectors;
