import { createPaginationReducer } from "../pagination";

const initialState = {
  items: [],
  total: 0,
  offset: 0,
  isLoading: false,
  error: null,
};

describe("createPaginationReducer", () => {
  test("should return the correct initial state", () => {
    const reducer = createPaginationReducer();
    expect(reducer.fetchItems(initialState)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
  test("should return the correct state when fetchItemsSuccess is called", () => {
    const reducer = createPaginationReducer();
    expect(
      reducer.fetchItemsSuccess(
        { ...initialState, isLoading: true },
        {
          payload: {
            items: [{ id: 1, name: "Item 1" }],
            total: 1,
            offset: 0,
          },
          type: "fetchItemsSuccess",
        }
      )
    ).toEqual({
      ...initialState,
      items: [{ id: 1, name: "Item 1" }],
      total: 1,
      isLoading: false,
    });
  });
  test("should return the correct state when fetchItemsError is called", () => {
    const reducer = createPaginationReducer();
    expect(
      reducer.fetchItemsFailure(
        { ...initialState, isLoading: true },
        {
          payload: "Error",
          type: "fetchItemsFailure",
        }
      )
    ).toEqual({
      ...initialState,
      error: "Error",
      isLoading: false,
    });
  });
});
