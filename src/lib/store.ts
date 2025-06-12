import { configureStore } from "@reduxjs/toolkit";
import catalogItemReducer from "./slices/catalog-item-slice";
import taskReducer from "./slices/tasks-slice";
import imageProcessingReducer from "./slices/image-processing-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      catalogItems: catalogItemReducer,
      tasks: taskReducer,
      imageProcessing: imageProcessingReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
