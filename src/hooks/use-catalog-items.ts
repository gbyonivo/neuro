import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { NeuroAxiosV2 } from "@/utils/neuro-axios";
import {
  fetchCatalogItemsFailure,
  fetchCatalogItemsSuccess,
  fetchCatalogItems,
} from "@/lib/slices/catalog-item-slice";
import { useCallback, useEffect } from "react";

interface FetchCatalogItemsProps {
  limit?: number;
  offset?: number;
}

export const useCatalogItems = () => {
  const dispatch = useDispatch();
  const { catalogItems, isLoading, error, offset, total } = useSelector(
    (state: RootState) => state.catalogItems
  );

  const fetchCatalog = useCallback(
    async ({ limit = 10, offset = 0 }: FetchCatalogItemsProps) => {
      try {
        dispatch(fetchCatalogItems());
        const response = await NeuroAxiosV2.get(
          `/catalog-items?limit=${limit}&offset=${offset}`
        );
        dispatch(fetchCatalogItemsSuccess(response.data));
      } catch (error) {
        dispatch(fetchCatalogItemsFailure(error));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (catalogItems.length === 0) {
      fetchCatalog({ limit: 10, offset: 0 });
    }
  }, [catalogItems.length, fetchCatalog]);

  return { catalogItems, fetchCatalog, isLoading, error, offset, total };
};
