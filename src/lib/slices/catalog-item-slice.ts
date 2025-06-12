import { createSlice } from "@reduxjs/toolkit";
import { PaginatedStore } from "@/types/stores/catalog-items-store";
import { CatalogItem } from "@/types/catalog-item";
import { createPaginationReducer } from "./commonReducers/pagination";

const initialState: PaginatedStore<CatalogItem> = {
  items: [],
  isLoading: false,
  error: null,
  offset: 0,
  total: 0,
};

export const catalogItemSlice = createSlice({
  name: "catalogItem",
  initialState,
  reducers: {
    ...createPaginationReducer<PaginatedStore<CatalogItem>, CatalogItem>(),
  },
});

export const { fetchItems, fetchItemsFailure, fetchItemsSuccess } =
  catalogItemSlice.actions;

export default catalogItemSlice.reducer;
