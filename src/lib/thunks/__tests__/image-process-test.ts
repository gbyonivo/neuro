// import { ProcessStatus } from "@/types/stores/image-processing-store";
import { uploadImage } from "../image-process";

jest.mock("@/utils/neuro-axios");
jest.mock("@/utils/image-helper");
jest.mock("@/lib/slices/image-processing-slice");
jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("123"),
}));

describe("imageProcess", () => {
  // TODO: complete this test
  it("should upload an image", async () => {
    const image = new File([], "image.png");
    const taskUuid = "123";
    const dispatch = jest.fn();
    // @ts-expect-error - test
    await uploadImage({ image, taskUuid })(dispatch);

    expect(dispatch).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
