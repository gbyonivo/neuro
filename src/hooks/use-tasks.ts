import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  fetchItems,
  fetchItemsFailure,
  fetchItemsSuccess,
} from "@/lib/slices/tasks-slice";
import { useCallback, useEffect } from "react";
import { useFetchItems } from "./use-fetch-items";
import { Task } from "@/types/task";

export const useTasks = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error, offset, total } = useSelector(
    (state: RootState) => state.tasks
  );

  // pass in a function to check the response contains tasks
  const fetchTasks = useFetchItems<Task>({
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
    url: "/image-recognition/tasks",
  });

  useEffect(() => {
    if (items.length === 0) {
      fetchTasks({ limit: 10, offset: 0 });
    }
  }, [items.length, fetchTasks]);

  return { items, fetchTasks, isLoading, error, offset, total };
};
