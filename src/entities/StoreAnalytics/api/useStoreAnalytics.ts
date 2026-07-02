import { useEffect, useState } from "react";
import { httpClient } from "shared/api/httpClient";
import type { StoreAnalytics } from "../model/types";

type State = {
  data: StoreAnalytics[];
  loading: boolean;
  error: string | null;
};

const useStoreAnalytics = (): State => {
  const [state, setState] = useState<State>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await httpClient("/data.json", {
          signal: controller.signal,
        });
        const data: StoreAnalytics[] = await res.json();
        setState({ data, loading: false, error: null });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : "Unknown error",
        }));
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return state;
};

export default useStoreAnalytics;
