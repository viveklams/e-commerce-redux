import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state for the shopping products slice
const initialState = {
  isLoading: false,
  productList: [],
  error: null,
};

// Async thunk to fetch all filtered products
export const fetchAllFilteredProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/shop/products/get"
      );
      return response.data; // Return the data directly from the response
    } catch (error) {
      // Handle errors and return a meaningful message
      return rejectWithValue(
        error.response?.data || "Failed to fetch products."
      );
    }
  }
);

// Create the slice for shopping products
const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    resetProducts: (state) => {
      // Action to reset the product list and loading state
      state.productList = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true; // Set loading state
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false; // Reset loading state
        state.productList = action.payload.data; // Set product list to fetched data
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false; // Reset loading state
        state.error = action.payload; // Set error message
      });
  },
});

// Export the reset action
export const { resetProducts } = shoppingProductSlice.actions;

// Export the reducer
export default shoppingProductSlice.reducer;
