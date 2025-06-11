import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CatalogItemsStore } from "@/types/stores/catalog-items-store";
import { CatalogItem } from "@/types/catalog-item";

const initialState: CatalogItemsStore = {
  catalogItems: [],
  isLoading: false,
  error: null,
  offset: 0,
  total: 0,
};

export const catalogItemSlice = createSlice({
  name: "catalogItem",
  initialState,
  reducers: {
    fetchCatalogItems: (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    fetchCatalogItemsSuccess: (
      state,
      action: PayloadAction<{
        items: CatalogItem[];
        total: number;
        offset: number;
      }>
    ) => ({
      ...state,
      catalogItems:
        action.payload.offset === 0
          ? action.payload.items
          : [...state.catalogItems, ...action.payload.items],
      total: action.payload.total,
      isLoading: false,
      offset: action.payload.offset,
    }),
    fetchCatalogItemsFailure: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },
});

export const {
  fetchCatalogItems,
  fetchCatalogItemsFailure,
  fetchCatalogItemsSuccess,
} = catalogItemSlice.actions;

export default catalogItemSlice.reducer;
