import { combineReducers, configureStore } from "@reduxjs/toolkit";
import catalogItemReducer from "./slices/catalog-item-slice";
import taskReducer from "./slices/tasks-slice";
import imageProcessingReducer from "./slices/image-processing-slice";
import resultReducer from "./slices/results-slice";

export const rootReducer = combineReducers({
  catalogItems: catalogItemReducer,
  tasks: taskReducer,
  imageProcessing: imageProcessingReducer,
  results: resultReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
