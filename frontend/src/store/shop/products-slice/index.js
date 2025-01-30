import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state for the shopping products slice
const initialState = {
  isLoading: false,
  productList: [],
  error: null,
  productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");

    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
    );

    console.log(result);

    return result?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
    );

    return result?.data;
  }
);

// Create the slice for shopping products
const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
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
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true; // Set loading state
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false; // Reset loading state
        state.productDetails = action.payload.data; // Set product list to fetched data
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false; // Reset loading state
        state.productDetails = null; // Set error message
      });
  },
});

// Export the reset action
export const { setProductDetails, resetProducts } =
  shoppingProductSlice.actions;

// Export the reducer
export default shoppingProductSlice.reducer;
