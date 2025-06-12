import { createSlice } from "@reduxjs/toolkit";
import { PaginatedStore } from "@/types/stores/paginated-store";
import { CatalogItemType } from "@/types/catalog-item";
import { createPaginationReducer } from "./commonReducers/pagination";

const initialState: PaginatedStore<CatalogItemType> = {
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
    ...createPaginationReducer<
      PaginatedStore<CatalogItemType>,
      CatalogItemType
    >(),
  },
});

export const { fetchItems, fetchItemsFailure, fetchItemsSuccess } =
  catalogItemSlice.actions;

export default catalogItemSlice.reducer;
