import { resultSlice, changeTaskForResults } from "../results-slice";

const initialState = {
  items: [],
  total: 0,
  offset: 0,
  isLoading: false,
  error: null,
};

describe("resultSlice", () => {
  test("should return the correct initial state", () => {
    expect(resultSlice.getInitialState()).toEqual(initialState);
  });

  test("changeTaskForResults should change the taskId", () => {
    const state = resultSlice.getInitialState();
    const newState = resultSlice.reducer(state, changeTaskForResults("123"));
    expect(newState).toEqual({
      ...initialState,
      taskId: "123",
    });
  });
});
