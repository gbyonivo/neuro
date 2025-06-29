import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ImageProcessingStore,
  ProcessStatus,
  SingleProcessState,
} from "@/types/stores/image-processing-store";

const initialState: ImageProcessingStore = {
  processes: [],
};

export const imageProcessingSlice = createSlice({
  name: "imageProcessing",
  initialState,
  reducers: {
    addProcess: (state, action: PayloadAction<SingleProcessState>) => {
      return {
        ...state,
        processes: [
          ...state.processes.filter(
            (process) => process.taskUuid !== action.payload.taskUuid
          ),
          action.payload,
        ],
      };
    },
    updateProcessStatus: (
      state,
      action: PayloadAction<{ taskUuid: string; status: ProcessStatus }>
    ) => {
      return {
        ...state,
        processes: state.processes.map((process) =>
          // for now one process per taskUuid
          process.taskUuid === action.payload.taskUuid
            ? { ...process, status: action.payload.status }
            : process
        ),
      };
    },
  },
});

export const { addProcess, updateProcessStatus } = imageProcessingSlice.actions;

export default imageProcessingSlice.reducer;
