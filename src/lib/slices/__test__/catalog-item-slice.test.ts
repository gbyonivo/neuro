import { catalogItemSlice } from "../catalog-item-slice";

const initialState = {
  items: [],
  total: 0,
  offset: 0,
  isLoading: false,
  error: null,
};

describe("catalogItemSlice", () => {
  test("should return the correct initial state", () => {
    expect(catalogItemSlice.getInitialState()).toEqual(initialState);
  });
});
