import { RootState } from "@/lib/store";
import { isTask, Task } from "@/types/task";
import { NeuroAxiosV2 } from "@/utils/neuro-axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export function useTask({
  fetchImmediately = true,
  taskId,
}: {
  fetchImmediately?: boolean;
  taskId?: string | null;
}) {
  const { items } = useSelector((state: RootState) => state.tasks);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const cachedTask = useMemo(() => {
    return items.find((task) => task.uuid === taskId);
  }, [items, taskId]);

  const fetchTask = useCallback(() => {
    const asyncFetchTask = async () => {
      try {
        if (cachedTask) {
          setTask(cachedTask);
          return;
        }
        if (!taskId) {
          return;
        }
        setFetching(true);
        const { data: task } = await NeuroAxiosV2.get(
          `/image-recognition/tasks/${taskId}`
        );
        if (!isTask(task)) {
          throw new Error("Invalid task");
        }
        setTask(task);
        setFetching(false);
      } catch (error) {
        setFetching(false);
        if (typeof error === "string") {
          setError(error);
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    asyncFetchTask();
  }, [cachedTask, taskId]);

  useEffect(() => {
    if (fetchImmediately && task === null && !taskId) {
      fetchTask();
    }
  }, [fetchImmediately, task, taskId, fetchTask]);

  return {
    task,
    fetchTask,
    fetching,
    error,
  };
}
