import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  fetchItems,
  fetchItemsFailure,
  fetchItemsSuccess,
} from "@/lib/slices/catalog-item-slice";
import { useCallback, useEffect } from "react";
import { useFetchItems } from "./use-fetch-items";
import { CatalogItemType } from "@/types/catalog-item";
import { LIMIT } from "@/utils/constants";

export const useCatalogItems = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error, offset, total } = useSelector(
    (state: RootState) => state.catalogItems
  );

  const fetchCatalog = useFetchItems<CatalogItemType>({
    onSuccess: useCallback(
      (data) => dispatch(fetchItemsSuccess(data)),
      [dispatch]
    ),
    onFailure: useCallback(
      (error) => dispatch(fetchItemsFailure(error)),
      [dispatch]
    ),
    onStart: useCallback(() => {
      dispatch(fetchItems());
    }, [dispatch]),
    url: "/catalog-items",
  });

  useEffect(() => {
    if (items.length === 0) {
      fetchCatalog({ limit: LIMIT, offset: 0 });
    }
  }, [items.length, fetchCatalog]);

  return { items, fetchCatalog, isLoading, error, offset, total };
};
