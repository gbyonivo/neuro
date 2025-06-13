import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginatedStore } from "@/types/stores/paginated-store";
import { createPaginationReducer } from "./commonReducers/pagination";
import { Result } from "@/types/result";

interface ResultStore extends PaginatedStore<Result> {
  taskId?: string;
}

const initialState: ResultStore = {
  items: [],
  isLoading: false,
  error: null,
  offset: 0,
  total: 0,
};

export const resultSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    ...createPaginationReducer<ResultStore, Result>(),
    changeTaskForResults: (state, action: PayloadAction<string>) => {
      return {
        ...initialState,
        taskId: action.payload,
      };
    },
  },
});

export const {
  fetchItems,
  fetchItemsFailure,
  fetchItemsSuccess,
  changeTaskForResults,
} = resultSlice.actions;

export default resultSlice.reducer;
