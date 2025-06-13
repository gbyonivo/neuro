import { taskSlice } from "../tasks-slice";

const initialState = {
  items: [],
  total: 0,
  offset: 0,
  isLoading: false,
  error: null,
};

describe("tasksSlice", () => {
  test("should return the correct initial state", () => {
    expect(taskSlice.getInitialState()).toEqual(initialState);
  });
});
