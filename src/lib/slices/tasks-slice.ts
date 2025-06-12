import { createSlice } from "@reduxjs/toolkit";
import { PaginatedStore } from "@/types/stores/paginated-store";
import { createPaginationReducer } from "./commonReducers/pagination";
import { Task } from "@/types/task";

const initialState: PaginatedStore<Task> = {
  items: [],
  isLoading: false,
  error: null,
  offset: 0,
  total: 0,
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    ...createPaginationReducer<PaginatedStore<Task>, Task>(),
  },
});

export const { fetchItems, fetchItemsFailure, fetchItemsSuccess } =
  taskSlice.actions;

export default taskSlice.reducer;
