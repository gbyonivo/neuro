import { renderWithProviders } from "@/utils/test-utils/redux-provider";
import { ResultsPage } from "../results-page";
import { NeuroAxiosV2 } from "@/utils/neuro-axios";
import { waitFor } from "@testing-library/dom";
import { Result, ResultStatus } from "@/types/result";

const defaultState = {
  results: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
    offset: 0,
    taskId: undefined,
  },
};

jest.mock("@/utils/neuro-axios");
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({
    id: "1",
  }),
}));

const fetchedResults: Result[] = [
  {
    uuid: "1",
    task_uuid: "1",
    image_url: "https://example.com/image.jpg",
    created_at: "2021-01-01",
    updated_at: "2021-01-01",
    status: ResultStatus.PROCESSED,
  },
];

describe("ResultsPage", () => {
  test.each([[undefined, true]])(
    "should fetch results when mounted and render them",
    async (initialTaskId, shouldHaveBeenCalled) => {
      jest.spyOn(NeuroAxiosV2, "get").mockImplementation(() =>
        Promise.resolve({
          data: {
            items: fetchedResults,
            total: 1,
            offset: 0,
            limit: 10,
          },
        })
      );

      const { container } = renderWithProviders(<ResultsPage />, {
        preloadedState: {
          ...{
            ...defaultState,
            results: { ...defaultState.results, taskId: initialTaskId },
          },
        },
      });

      await waitFor(() => {
        if (shouldHaveBeenCalled) {
          expect(NeuroAxiosV2.get).toHaveBeenCalledWith(
            "/image-recognition/tasks/1/results?limit=10&offset=0"
          );
          const result = container.querySelector("[data-testid='result-1']");
          expect(result).toBeInTheDocument();
        } else {
          expect(NeuroAxiosV2.get).not.toHaveBeenCalled();
        }
      });
    }
  );

  it("should show empty state when no results are found", async () => {
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

    const { container } = renderWithProviders(<ResultsPage />, {
      preloadedState: {
        ...defaultState,
      },
    });

    await waitFor(() => {
      expect(NeuroAxiosV2.get).toHaveBeenCalledWith(
        "/image-recognition/tasks/1/results?limit=10&offset=0"
      );
      const emptyState = container.querySelector("[data-testid='empty-state']");
      expect(emptyState).toBeInTheDocument();
    });
  });

  it("should show error state when error is thrown", async () => {
    jest
      .spyOn(NeuroAxiosV2, "get")
      .mockImplementation(() => Promise.reject("Error fetching results"));

    const { container } = renderWithProviders(<ResultsPage />, {
      preloadedState: {
        ...defaultState,
      },
    });

    await waitFor(() => {
      expect(NeuroAxiosV2.get).toHaveBeenCalledWith(
        "/image-recognition/tasks/1/results?limit=10&offset=0"
      );
      const errorState = container.querySelector(
        "[data-testid='results-error-message']"
      );
      expect(errorState).toBeInTheDocument();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
