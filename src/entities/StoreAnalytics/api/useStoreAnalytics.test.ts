import { renderHook, waitFor } from "@testing-library/react";
import useStoreAnalytics from "./useStoreAnalytics";
import { httpClient } from "shared/api/httpClient";
import type { StoreAnalytics } from "../model/types";

jest.mock("shared/api/httpClient");

const mockHttpClient = httpClient as jest.MockedFunction<typeof httpClient>;

const mockData: StoreAnalytics[] = [
  {
    id: 1,
    name: "Clash of Clans",
    icon: "https://example.com/icon.png",
    data: [["2024-01-01", 1000, 50000]],
  },
];

function makeMockResponse(data: unknown): Response {
  return {
    ok: true,
    json: () => Promise.resolve(data),
  } as unknown as Response;
}

describe("useStoreAnalytics", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("starts with loading=true and empty data", () => {
    mockHttpClient.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useStoreAnalytics());
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("returns data on success", async () => {
    mockHttpClient.mockResolvedValue(makeMockResponse(mockData));
    const { result } = renderHook(() => useStoreAnalytics());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("sets error on fetch failure", async () => {
    mockHttpClient.mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useStoreAnalytics());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Network error");
    expect(result.current.data).toEqual([]);
  });

  it("sets generic error message for non-Error throws", async () => {
    mockHttpClient.mockRejectedValue("something went wrong");
    const { result } = renderHook(() => useStoreAnalytics());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Unknown error");
  });

  it("calls httpClient with /data.json", async () => {
    mockHttpClient.mockResolvedValue(makeMockResponse(mockData));
    renderHook(() => useStoreAnalytics());

    await waitFor(() =>
      expect(mockHttpClient).toHaveBeenCalledWith(
        "/data.json",
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      )
    );
  });

  it("aborts the request on unmount", () => {
    const abortSpy = jest.spyOn(AbortController.prototype, "abort");
    mockHttpClient.mockReturnValue(new Promise(() => {}));

    const { unmount } = renderHook(() => useStoreAnalytics());
    unmount();

    expect(abortSpy).toHaveBeenCalled();
    abortSpy.mockRestore();
  });

  it("ignores AbortError after unmount", async () => {
    const abortError = new DOMException("Aborted", "AbortError");
    mockHttpClient.mockRejectedValue(abortError);

    const { result } = renderHook(() => useStoreAnalytics());

    await waitFor(() =>
      expect(mockHttpClient).toHaveBeenCalled()
    );

    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(true);
  });
});
