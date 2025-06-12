import { NeuroAxiosV2 } from "@/utils/neuro-axios";
import { useCallback } from "react";
import { isNeuroResponseError } from "@/types/errort";

interface FetchCatalogItemsProps {
  limit?: number;
  offset?: number;
}

export function useFetchItems<T>({
  onStart,
  onSuccess,
  onFailure,
  url,
}: {
  onSuccess: (data: { items: T[]; total: number; offset: number }) => void;
  onFailure: (error: string) => void;
  onStart: () => void;
  url: string;
}) {
  const fetchItems = useCallback(
    async ({ limit = 10, offset = 0 }: FetchCatalogItemsProps) => {
      try {
        onStart();
        const response = await NeuroAxiosV2.get(
          `${url}?limit=${limit}&offset=${offset}`
        );
        onSuccess(response.data);
      } catch (error: unknown) {
        if (isNeuroResponseError(error)) {
          onFailure(error.detail.map((detail) => detail.msg).join(", "));
        } else {
          onFailure("Error fetching catalog items");
        }
      }
    },
    [onFailure, onStart, onSuccess, url]
  );

  return fetchItems;
}
