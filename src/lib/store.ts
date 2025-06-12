import { configureStore } from "@reduxjs/toolkit";
import catalogItemReducer from "./slices/catalog-item-slice";
import taskReducer from "./slices/tasks-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      catalogItems: catalogItemReducer,
      tasks: taskReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
