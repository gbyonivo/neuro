import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { ListContainer, ListContainerProps } from "../list-container";

interface TestItem {
  id: string;
}

const onFetchMore = jest.fn();
const onRefresh = jest.fn();

const defaultProps: ListContainerProps<TestItem> = {
  list: [],
  total: 0,
  keyProp: "id",
  onFetchMore,
  onRefresh,
  loading: false,
  error: null,
};

describe("ListContainer", () => {
  it("should render empty state when list is empty", () => {
    const { container } = render(<ListContainer {...defaultProps} />);
    const emptyStateContainer = container.querySelector(
      "[data-testid='empty-state']"
    );
    expect(emptyStateContainer).toBeInTheDocument();
  });

  it("should disable fetch more button when loading is true", () => {
    const { container } = render(
      <ListContainer {...defaultProps} loading list={[{ id: "1" }]} total={2} />
    );
    const emptyStateContainer = container.querySelector(
      "[data-testid='empty-state']"
    );
    const fetchMoreButton = container.querySelector(
      "[data-testid='fetch-more-button']"
    );
    expect(fetchMoreButton).toBeDisabled();
    expect(emptyStateContainer).not.toBeInTheDocument();
  });

  test.each([
    [
      {
        error: "test error",
        list: [{ id: "1" }],
        total: 2,
        renderError: () => <div data-testid="error-message">test error</div>,
      },
      "error-message",
    ],
    [
      {
        error: "test error",
        list: [{ id: "1" }],
        total: 2,
      },
      "default-error-message",
    ],
  ])(
    "should should display error message when error is not null",
    (props, testId) => {
      const { container } = render(
        <ListContainer {...defaultProps} {...props} />
      );
      const errorMessage = container.querySelector(`[data-testid='${testId}']`);
      expect(errorMessage).toBeInTheDocument();
    }
  );

  it("should renderBetweenHeaderAndBody correctly", () => {
    const props = {
      error: "test error",
      list: [{ id: "1" }],
      total: 2,
      renderBetweenHeaderAndBody: () => (
        <div data-testid="between-header-and-body">test error</div>
      ),
    };
    const { container } = render(
      <ListContainer {...defaultProps} {...props} />
    );
    const betweenHeaderAndBody = container.querySelector(
      "[data-testid='between-header-and-body']"
    );
    expect(betweenHeaderAndBody).toBeInTheDocument();
  });

  test.each([
    [
      {
        renderGridCard: () => <div data-testid="grid-card">grid card</div>,
      },
      false,
    ],
    [
      {
        renderRow: () => (
          <tr>
            <td>row item</td>
          </tr>
        ),
      },
      false,
    ],
    [
      {
        renderRow: () => (
          <tr>
            <td>row item</td>
          </tr>
        ),
        renderGridCard: () => <div data-testid="grid-card">grid card</div>,
      },
      true,
    ],
  ])("should on hide or show switch ", (props, shown) => {
    const { container } = render(
      <ListContainer {...defaultProps} {...props} />
    );
    const switchButton = container.querySelector("[data-testid='grid-button']");
    if (shown) {
      expect(switchButton).toBeInTheDocument();
    } else {
      expect(switchButton).not.toBeInTheDocument();
    }
  });

  it("should render grid card correctly", async () => {
    const { container } = render(
      <ListContainer
        {...defaultProps}
        list={[{ id: "1" }]}
        total={1}
        renderGridCard={({ item }) => (
          <div data-testid={`grid-card-${item.id}`} key={item.id}>
            grid card
          </div>
        )}
        renderRow={({ item }) => (
          <tr data-testid={`row-item-${item.id}`} key={item.id}>
            <td>row item</td>
          </tr>
        )}
      />
    );
    const gridCard = container.querySelector("[data-testid='grid-card-1']");
    const tableButton = container.querySelector("[data-testid='table-button']");
    const gridButton = container.querySelector("[data-testid='grid-button']");
    expect(gridCard).toBeInTheDocument();
    await act(async () => {
      if (tableButton) {
        fireEvent.click(tableButton);
      }
    });

    await waitFor(() => {
      const rowItem = container.querySelector("[data-testid='row-item-1']");
      expect(gridCard).not.toBeInTheDocument();
      expect(rowItem).toBeInTheDocument();
    });

    await act(async () => {
      if (gridButton) {
        fireEvent.click(gridButton);
      }
    });

    await waitFor(() => {
      const rowItem = container.querySelector("[data-testid='row-item-1']");
      const gridCard = container.querySelector("[data-testid='grid-card-1']");
      expect(rowItem).not.toBeInTheDocument();
      expect(gridCard).toBeInTheDocument();
    });
  });
});
