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
        updateProcessStatus({ processId, status: ProcessStatus.COMPLETED })
      );
      toast.success("Image uploaded successfully");
      console.log("image uploaded successfully");
    } catch (e) {
      thunkAPI.dispatch(
        updateProcessStatus({ processId, status: ProcessStatus.FAILED })
      );
      toast.error("Image upload failed");
      console.log("error", e);
    }
  }
);
