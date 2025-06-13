import { getDate } from "../date";
import * as dateFns from "date-fns";

jest.mock("date-fns", () => ({
  format: jest.fn(),
}));

describe("getDate cache system", () => {
  test("should retreive date from cache", () => {
    // @ts-expect-error - test
    dateFns.format.mockImplementation(() => {
      return "2022-05-11 00:00:00";
    });

    const date = "2022-05-11T00:00:00Z";
    const result1 = getDate(date);
    const result2 = getDate(date);
    expect(result1).toBe("2022-05-11 00:00:00");
    expect(result2).toBe("2022-05-11 00:00:00");
    expect(dateFns.format).toHaveBeenNthCalledWith(
      1,
      date,
      "yyyy-MM-dd HH:mm:ss"
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
