import { getDate } from "../date";

describe("getDate", () => {
  test.each([
    ["2021-01-01T00:00:00Z", "2021-01-01 00:00:00"],
    ["Geez man, this is not a date", "Invalid date"],
  ])("should return the date in the correct format", (date, expected) => {
    const result = getDate(date);
    expect(result).toBe(expected);
  });
});
