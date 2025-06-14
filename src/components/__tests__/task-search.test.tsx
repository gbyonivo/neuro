import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { TaskSearch } from "../task-search";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("TaskSearch", () => {
  it("should render component with input and button", () => {
    const { container } = render(<TaskSearch />);
    const input = container.querySelector("[data-testid='task-id-input']");
    const button = container.querySelector("[data-testid='search-button']");
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("should render component with input and button", async () => {
    const { container } = render(<TaskSearch />);
    const input = container.querySelector("[data-testid='task-id-input']");
    const button = container.querySelector("[data-testid='search-button']");

    await act(async () => {
      if (input && button) {
        fireEvent.change(input, { target: { value: "123" } });
        fireEvent.click(button);
      }
    });

    await waitFor(() => {
      const errorMessage = container.querySelector(
        "[data-testid='task-id-input-error-message']"
      );
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Invalid Task ID");
    });

    await act(async () => {
      if (input && button) {
        fireEvent.change(input, { target: { value: "13" } });
      }
    });

    await waitFor(() => {
      const errorMessage = container.querySelector(
        "[data-testid='task-id-input-error-message']"
      );
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  it("should render component with input and button", async () => {
    const { container } = render(<TaskSearch />);
    const input = container.querySelector("[data-testid='task-id-input']");
    const button = container.querySelector("[data-testid='search-button']");

    await act(async () => {
      if (input && button) {
        fireEvent.change(input, {
          target: { value: "aa4ef927-d317-42cb-bda2-3065a7d4b507" },
        });
        fireEvent.click(button);
      }
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        "/tasks/aa4ef927-d317-42cb-bda2-3065a7d4b507/results"
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
