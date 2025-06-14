import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskImageUpload } from "../task-image-upload";
import { renderWithProviders } from "@/utils/test-utils/redux-provider";
import { ProcessStatus } from "@/types/stores/image-processing-store";
import { updateProcessStatus } from "@/lib/slices/image-processing-slice";

const imageFile = new File(["dummy-content"], "photo.png", {
  type: "image/png",
});

global.URL.createObjectURL = jest
  .fn()
  .mockReturnValue(
    "https://storage.googleapis.com/zia-web-public/staging/orgs/b11cfcd0-398a-48a5-9c89-86c47e80eff5/image-recognition/aa4ef927-d317-42cb-bda2-3065a7d4b507/ZDcY2okELfoi8u2v"
  );

describe("TaskImageUpload", () => {
  it("upload button should be disabled when no file is selected", async () => {
    renderWithProviders(
      <TaskImageUpload
        taskId="test-task-id"
        containerClassName="test-class"
        hideViewAllResults={false}
      />,
      {
        preloadedState: {
          imageProcessing: {
            processes: [],
            taskUuid: "test-task-id",
          },
        },
      }
    );
    const uploadButton = screen.getByTestId("upload-button");

    expect(screen.queryByTestId("selected-image")).not.toBeInTheDocument();
    expect(uploadButton).toBeDisabled();
  });

  it("upload button should be disabled when it is processing", async () => {
    renderWithProviders(
      <TaskImageUpload
        taskId="test-task-id"
        containerClassName="test-class"
        hideViewAllResults={false}
      />,
      {
        preloadedState: {
          imageProcessing: {
            processes: [
              {
                id: "1",
                status: ProcessStatus.PROCESSING,
                imageUrl: "imageUrl",
                error: null,
                taskUuid: "test-task-id",
              },
            ],
            taskUuid: "test-task-id",
          },
        },
      }
    );
    const selectFileButton = screen.getByTestId("upload-file-label");
    await userEvent.upload(selectFileButton, imageFile);
    const uploadButton = screen.getByTestId("upload-button");
    expect(uploadButton).toBeDisabled();
  });

  it("upload button should be enabled when it is not processing and file is selected", async () => {
    renderWithProviders(
      <TaskImageUpload
        taskId="test-task-id"
        containerClassName="test-class"
        hideViewAllResults={false}
      />,
      {
        preloadedState: {
          imageProcessing: {
            processes: [],
            taskUuid: "test-task-id",
          },
        },
      }
    );
    const selectFileButton = screen.getByTestId("upload-file-label");
    await userEvent.upload(selectFileButton, imageFile);
    const uploadButton = screen.getByTestId("upload-button");
    const selectedImage = screen.getByTestId("selected-image");
    expect(selectedImage).toBeInTheDocument();
    expect(uploadButton).toBeEnabled();
  });

  it("it should show success message when process is completed", async () => {
    const { store } = renderWithProviders(
      <TaskImageUpload
        taskId="test-task-id"
        containerClassName="test-class"
        hideViewAllResults={false}
      />,
      {
        preloadedState: {
          imageProcessing: {
            processes: [
              {
                id: "1",
                status: ProcessStatus.PROCESSING,
                imageUrl: "imageUrl",
                taskUuid: "test-task-id",
              },
            ],
            taskUuid: "test-task-id",
          },
        },
      }
    );
    expect(
      screen.queryByTestId("upload-success-message")
    ).not.toBeInTheDocument();

    await act(async () => {
      await store.dispatch(
        updateProcessStatus({
          taskUuid: "test-task-id",
          status: ProcessStatus.COMPLETED,
        })
      );
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId("upload-success-message")
      ).toBeInTheDocument();
    });
  });
});
