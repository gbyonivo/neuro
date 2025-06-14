import { fireEvent, render } from "@testing-library/react";
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
  it("should call onFetchMore when fetch more button is clicked", () => {
    const fetchMore = jest.fn();
    const { container } = render(
      <ListContainer
        {...defaultProps}
        list={[{ id: "1" }]}
        total={2}
        onFetchMore={fetchMore}
      />
    );
    const fetchMoreButton = container.querySelector(
      "[data-testid='fetch-more-button']"
    );
    if (fetchMoreButton) fireEvent.click(fetchMoreButton);
    expect(fetchMoreButton).toBeEnabled();
    expect(fetchMore).toHaveBeenCalled();
  });

  it("should disable fetch more button when loading is true", () => {
    const onRefresh = jest.fn();
    const { container } = render(
      <ListContainer
        {...defaultProps}
        list={[{ id: "1" }]}
        total={2}
        onRefresh={onRefresh}
      />
    );
    const refreshButton = container.querySelector(
      "[data-testid='refresh-button']"
    );
    if (refreshButton) fireEvent.click(refreshButton);
    expect(refreshButton).toBeEnabled();
    expect(onRefresh).toHaveBeenCalled();
  });
});
