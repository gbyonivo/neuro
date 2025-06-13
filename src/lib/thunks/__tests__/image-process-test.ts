// import { ProcessStatus } from "@/types/stores/image-processing-store";
import {
  addProcess,
  updateProcessStatus,
} from "@/lib/slices/image-processing-slice";
import { uploadImage } from "../image-process";
import { ProcessStatus } from "@/types/stores/image-processing-store";
import { NeuroAxiosV2 } from "@/utils/neuro-axios";

jest.mock("@/utils/neuro-axios");
jest.mock("@/utils/image-helper");
// jest.mock("@/lib/slices/image-processing-slice");
jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("123"),
}));

global.URL.createObjectURL = jest.fn().mockReturnValue("imageUrl");

describe("imageProcess", () => {
  // TODO: complete this test
  it("should upload an image and update the process status", async () => {
    const image = new File([], "image.png");
    const taskUuid = "123";
    const dispatch = jest.fn();
    // @ts-expect-error - test
    await uploadImage({ image, taskUuid })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      addProcess({
        id: "123",
        status: ProcessStatus.PROCESSING,
        imageUrl: "imageUrl",
        error: null,
        taskUuid,
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      updateProcessStatus({
        status: ProcessStatus.COMPLETED,
        taskUuid,
      })
    );
  });

  it("should fail and upate status to failed", async () => {
    const image = new File([], "image.png");
    jest
      .spyOn(NeuroAxiosV2, "post")
      .mockImplementation(() =>
        Promise.reject(new Error("Failed to upload image"))
      );
    const taskUuid = "123";
    const dispatch = jest.fn();
    // @ts-expect-error - test
    await uploadImage({ image, taskUuid })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      addProcess({
        id: "123",
        status: ProcessStatus.PROCESSING,
        imageUrl: "imageUrl",
        error: null,
        taskUuid,
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      updateProcessStatus({
        status: ProcessStatus.FAILED,
        taskUuid,
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
