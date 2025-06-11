import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TConstructorItems } from '@utils-types';
import { createOrder } from './orderSlice';

type TConstructorState = {
  constructorItems: TConstructorItems;
  orderModalData: TOrder | null;
};

export const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderModalData: null
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer(
        state,
        action: PayloadAction<{ ingredient: TIngredient; id: string }>
      ) {
        if (action.payload.ingredient.type === 'bun') {
          state.constructorItems.bun = action.payload.ingredient;
        } else {
          state.constructorItems.ingredients.push({
            ...action.payload.ingredient,
            id: action.payload.id
          });
          console.log(state.constructorItems.ingredients[0]);
        }
      },
      prepare(ingredient: TIngredient) {
        return {
          payload: {
            ingredient,
            id: crypto.randomUUID()
          }
        };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item._id !== action.payload
        );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const item = state.constructorItems.ingredients[fromIndex];
      state.constructorItems.ingredients.splice(fromIndex, 1);
      state.constructorItems.ingredients.splice(toIndex, 0, item);
    },
    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    });
  },
  selectors: {
    selectorConstructorItems: (state) => state.constructorItems
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;

export const { selectorConstructorItems } = constructorSlice.selectors;
export default constructorSlice.reducer;
