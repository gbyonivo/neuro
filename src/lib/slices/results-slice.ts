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
    addResult: (
      state,
      action: PayloadAction<{ result: Result; taskId: string }>
    ) => {
      if (state.taskId !== action.payload.taskId) {
        return state;
      }
      return {
        ...state,
        items: [
          action.payload.result,
          ...state.items.slice(0, state.items.length - 1),
        ],
      };
    },
  },
});

export const {
  fetchItems,
  fetchItemsFailure,
  fetchItemsSuccess,
  changeTaskForResults,
  addResult,
} = resultSlice.actions;

export default resultSlice.reducer;
