import { renderWithProviders } from "@/utils/test-utils/redux-provider";
import { TasksPage } from "../tasks-page";
import { NeuroAxiosV2 } from "@/utils/neuro-axios";
import { waitFor } from "@testing-library/dom";

const defaultState = {
  tasks: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
    offset: 0,
  },
};

jest.mock("@/utils/neuro-axios");
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    query: {
      offset: 0,
    },
    push: jest.fn(),
  }),
}));

describe("TasksPage", () => {
  it("should fetch tasks when mounted and render them", async () => {
    jest.spyOn(NeuroAxiosV2, "get").mockImplementation(() =>
      Promise.resolve({
        data: {
          items: [
            {
              uuid: "1",
              name: "Task 1",
              description: "Description 1",
            },
          ],
          total: 1,
          offset: 0,
          limit: 10,
        },
      })
    );

    const { container } = renderWithProviders(<TasksPage />, {
      preloadedState: {
        ...defaultState,
      },
    });

    await waitFor(() => {
      expect(NeuroAxiosV2.get).toHaveBeenCalledWith(
        "/image-recognition/tasks?limit=10&offset=0"
      );
      const task = container.querySelector("[data-testid='task-1']");
      expect(task).toBeInTheDocument();
    });
  });

  it("should show empty state when no tasks are found", async () => {
    jest.spyOn(NeuroAxiosV2, "get").mockImplementation(() =>
      Promise.resolve({
        data: {
          items: [],
          total: 0,
          offset: 0,
          limit: 10,
        },
      })
    );

    const { container } = renderWithProviders(<TasksPage />, {
      preloadedState: {
        ...defaultState,
      },
    });

    await waitFor(() => {
      expect(NeuroAxiosV2.get).toHaveBeenCalledWith(
        "/image-recognition/tasks?limit=10&offset=0"
      );
      const emptyState = container.querySelector("[data-testid='empty-state']");
      expect(emptyState).toBeInTheDocument();
    });
  });

  it("should show error state when error is thrown", async () => {
    jest
      .spyOn(NeuroAxiosV2, "get")
      .mockImplementation(() => Promise.reject("Error fetching tasks"));

    const { container } = renderWithProviders(<TasksPage />, {
      preloadedState: {
        ...defaultState,
      },
    });

    await waitFor(() => {
      expect(NeuroAxiosV2.get).toHaveBeenCalledWith(
        "/image-recognition/tasks?limit=10&offset=0"
      );
      const errorState = container.querySelector(
        "[data-testid='default-error-message']"
      );
      expect(errorState).toBeInTheDocument();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
