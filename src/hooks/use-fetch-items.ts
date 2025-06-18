import { NeuroAxiosV2 } from "@/utils/neuro-axios";
import { useCallback } from "react";
import { isNeuroResponseError } from "@/types/error";
import {
  isPaginatedResponse,
  PaginatedResponse,
} from "@/types/paginated-response";

interface FetchItemsProps {
  limit?: number;
  offset?: number;
}

/**
 * This hook is used to fetch items from the backend
 * I had used this before installing thunks
 * Also like the thunks, redux and hooks we can create shared libraries for both mobile and web
 **/
export function useFetchItems<T>({
  onStart,
  onSuccess,
  onFailure,
  url,
}: {
  onSuccess: (data: PaginatedResponse<T>) => void;
  onFailure: (error: string) => void;
  onStart: () => void;
  url: string;
}) {
  const fetchItems = useCallback(
    ({ limit = 10, offset = 0 }: FetchItemsProps) => {
      const fetchData = async () => {
        try {
          onStart();
          const response = await NeuroAxiosV2.get(
            `${url}?limit=${limit}&offset=${offset}`
          );
          if (isPaginatedResponse(response.data)) {
            onSuccess(response.data as PaginatedResponse<T>);
          } else {
            onFailure("Invalid response format");
          }
        } catch (error: unknown) {
          if (isNeuroResponseError(error)) {
            onFailure(error.detail.map((detail) => detail.msg).join(", "));
          } else {
            onFailure("Error fetching items");
          }
        }
      };

      fetchData();
    },
    [onFailure, onStart, onSuccess, url]
  );

  return fetchItems;
}
