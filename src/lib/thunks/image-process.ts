import { fileToBinary } from "@/utils/image-helper";
import { toast } from "react-toastify";
import { NeuroAxiosV2 } from "@/utils/neuro-axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProcess,
  updateProcessStatus,
} from "../slices/image-processing-slice";
import { v4 as uuidv4 } from "uuid";
import { ProcessStatus } from "@/types/stores/image-processing-store";

/**
 * The reason I use thunk here is because I want to dispatch the result to the store
 * and also i want to handle the result without depending on the component being mounted or unmounted
 * And it;s generally cleaner using thunks for API calls, if not for anything for testability
 */

export const uploadImage = createAsyncThunk(
  "users/fetchByIdStatus",
  async ({ image, taskUuid }: { image: File; taskUuid: string }, thunkAPI) => {
    const processId = uuidv4();
    try {
      const binaryData = await fileToBinary(image);
      thunkAPI.dispatch(
        addProcess({
          id: processId,
          status: ProcessStatus.PROCESSING,
          imageUrl: URL.createObjectURL(image),
          error: null,
          taskUuid,
        })
      );
      await NeuroAxiosV2.post(
        `/image-recognition/tasks/${taskUuid}/images`,
        {
          images: binaryData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      thunkAPI.dispatch(
        updateProcessStatus({ taskUuid, status: ProcessStatus.COMPLETED })
      );
      // console.log("response", response.data);
      // if (isResult(response.data)) {
      //   thunkAPI.dispatch(
      //     addResult({ result: response.data, taskId: taskUuid })
      //   );
      // }
      toast.success("Image uploaded successfully");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      thunkAPI.dispatch(
        updateProcessStatus({ taskUuid, status: ProcessStatus.FAILED })
      );
      toast.error("Image upload failed");
      // console.log("error", e);
    }
  }
);
