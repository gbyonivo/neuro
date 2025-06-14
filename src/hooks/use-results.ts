import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  changeTaskForResults,
  fetchItems,
  fetchItemsFailure,
  fetchItemsSuccess,
} from "@/lib/slices/results-slice";
import { useCallback, useEffect } from "react";
import { useFetchItems } from "./use-fetch-items";
import { useParams } from "next/navigation";
import { Result } from "@/types/result";

export const useResults = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, isLoading, error, offset, total, taskId } = useSelector(
    (state: RootState) => state.results
  );

  const fetchResults = useFetchItems<Result>({
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
    url: `/image-recognition/tasks/${id}/results`,
  });

  useEffect(() => {
    if (id === taskId) {
      return;
    }
    dispatch(changeTaskForResults(id as string));
  }, [id, dispatch, taskId]);

  useEffect(() => {
    if (items.length === 0 && id === taskId) {
      fetchResults({ limit: 10, offset: 0 });
    }
  }, [items.length, fetchResults, id, taskId]);

  return { items, fetchResults, isLoading, error, offset, total, taskId };
};
