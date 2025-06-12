import { PaginatedStore } from "@/types/stores/catalog-items-store";
import { PayloadAction } from "@reduxjs/toolkit";

export function createPaginationReducer<
  StateT extends PaginatedStore<ItemT>,
  ItemT
>() {
  return {
    fetchItems: (state: StateT) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    fetchItemsSuccess: (
      state: StateT,
      action: PayloadAction<{
        items: ItemT[];
        total: number;
        offset: number;
      }>
    ) => ({
      ...state,
      items:
        action.payload.offset === 0
          ? action.payload.items
          : [...state.items, ...action.payload.items],
      total: action.payload.total,
      isLoading: false,
      offset: action.payload.offset,
    }),
    fetchItemsFailure: (state: StateT, action: PayloadAction<string>) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  };
}
