import { renderHook } from "@testing-library/react";
import { NeuroAxiosV2 } from "@/utils/neuro-axios";
import { useFetchItems } from "../use-fetch-items";
import { LIMIT } from "@/utils/constants";

jest.mock("@/utils/neuro-axios");

const onSuccess = jest.fn();
const onFailure = jest.fn();
const onStart = jest.fn();

describe("useFetchItems", () => {
  it("should fetch items successfully", async () => {
    jest.spyOn(NeuroAxiosV2, "get").mockImplementation(() =>
      Promise.resolve({
        data: {
          items: [],
          total: 0,
          offset: 0,
          limit: LIMIT,
        },
      })
    );
    const { result } = renderHook(() =>
      useFetchItems({
        onSuccess,
        onFailure,
        onStart,
        url: "/items",
      })
    );

    await result.current({ limit: LIMIT, offset: 0 });

    expect(onStart).toHaveBeenCalled();
    expect(NeuroAxiosV2.get).toHaveBeenCalledWith("/items?limit=10&offset=0");
    expect(onSuccess).toHaveBeenCalledWith({
      items: [],
      total: 0,
      offset: 0,
      limit: LIMIT,
    });
  });

  it("should fail if the response is not a paginated response", async () => {
    jest.spyOn(NeuroAxiosV2, "get").mockImplementation(() =>
      Promise.resolve({
        data: {
          items: [],
          total: 0,
          offset: 0,
        },
      })
    );
    const { result } = renderHook(() =>
      useFetchItems({
        onSuccess,
        onFailure,
        onStart,
        url: "/items",
      })
    );

    await result.current({ limit: LIMIT, offset: 0 });

    expect(onStart).toHaveBeenCalled();
    expect(NeuroAxiosV2.get).toHaveBeenCalledWith("/items?limit=10&offset=0");
    expect(onFailure).toHaveBeenCalledWith("Invalid response format");
  });

  it("should fail if the response is an error", async () => {
    jest
      .spyOn(NeuroAxiosV2, "get")
      .mockImplementation(() =>
        Promise.reject(new Error("Error fetching items"))
      );
    const { result } = renderHook(() =>
      useFetchItems({
        onSuccess,
        onFailure,
        onStart,
        url: "/items",
      })
    );

    await result.current({ limit: LIMIT, offset: 0 });

    expect(onStart).toHaveBeenCalled();
    expect(NeuroAxiosV2.get).toHaveBeenCalledWith("/items?limit=10&offset=0");
    expect(onFailure).toHaveBeenCalledWith("Error fetching items");
  });

  it("should fail if the response is an error", async () => {
    jest.spyOn(NeuroAxiosV2, "get").mockImplementation(() =>
      Promise.reject({
        detail: [
          {
            loc: ["path", "to", "error"],
            msg: "wrong url",
            type: "error",
          },
          {
            loc: ["path", "to", "error"],
            msg: "Wrong 2nd thing",
            type: "error",
          },
        ],
      })
    );
    const { result } = renderHook(() =>
      useFetchItems({
        onSuccess,
        onFailure,
        onStart,
        url: "/items",
      })
    );

    await result.current({ limit: LIMIT, offset: 0 });

    expect(onStart).toHaveBeenCalled();
    expect(NeuroAxiosV2.get).toHaveBeenCalledWith("/items?limit=10&offset=0");
    expect(onFailure).toHaveBeenCalledWith("wrong url, Wrong 2nd thing");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
