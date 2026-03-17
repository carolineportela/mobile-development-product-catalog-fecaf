import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '../types';
import { productService } from '../services/api';

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (categories: string[]) => {
    const promises = categories.map(cat => productService.getProductsByCategory(cat));
    const results = await Promise.all(promises);
    return results.flat();
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id: number) => {
    return await productService.getProductById(id);
  }
);

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
  selectedProduct: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product details';
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
