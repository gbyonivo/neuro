import { ProcessStatus } from "@/types/stores/image-processing-store";
import {
  addProcess,
  imageProcessingSlice,
  updateProcessStatus,
} from "../image-processing-slice";

describe("imageProcessingSlice", () => {
  it("should return the correct initial state", () => {
    expect(imageProcessingSlice.getInitialState()).toEqual({
      processes: [],
    });
  });

  it("should add a process", () => {
    const state = imageProcessingSlice.getInitialState();
    const newState = imageProcessingSlice.reducer(
      state,
      addProcess({
        taskUuid: "123",
        status: ProcessStatus.PROCESSING,
        imageUrl: "imageUrl",
        error: null,
        id: "123",
      })
    );

    expect(newState).toEqual({
      processes: [
        {
          taskUuid: "123",
          status: ProcessStatus.PROCESSING,
          imageUrl: "imageUrl",
          error: null,
          id: "123",
        },
      ],
    });
  });

  it("should replace a process with same taskUuid", () => {
    const state = imageProcessingSlice.getInitialState();
    const secondState = imageProcessingSlice.reducer(
      state,
      addProcess({
        taskUuid: "123",
        status: ProcessStatus.COMPLETED,
        imageUrl: "imageUrl",
        error: null,
        id: "123",
      })
    );
    const newState = imageProcessingSlice.reducer(
      secondState,
      addProcess({
        taskUuid: "123",
        status: ProcessStatus.PROCESSING,
        imageUrl: "imageUrl",
        error: null,
        id: "123",
      })
    );

    expect(newState).toEqual({
      processes: [
        {
          taskUuid: "123",
          status: ProcessStatus.PROCESSING,
          imageUrl: "imageUrl",
          error: null,
          id: "123",
        },
      ],
    });
  });

  it("should update a process status with same taskUuid", () => {
    const state = imageProcessingSlice.getInitialState();
    const secondState = imageProcessingSlice.reducer(
      state,
      addProcess({
        taskUuid: "123",
        status: ProcessStatus.COMPLETED,
        imageUrl: "imageUrl",
        error: null,
        id: "123",
      })
    );
    const newState = imageProcessingSlice.reducer(
      secondState,
      updateProcessStatus({
        taskUuid: "123",
        status: ProcessStatus.FAILED,
      })
    );

    expect(newState).toEqual({
      processes: [
        {
          taskUuid: "123",
          status: ProcessStatus.FAILED,
          imageUrl: "imageUrl",
          error: null,
          id: "123",
        },
      ],
    });
  });
});
