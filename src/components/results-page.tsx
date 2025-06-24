"use client";

import { ListContainer, ListContainerMode } from "./list-container";
import Link from "next/link";
import { useResults } from "@/hooks/use-results";
import { ResultItem } from "./result-item";
import { TaskImageUpload } from "./task-image-upload";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useTask } from "@/hooks/use-task";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import { LIMIT } from "@/utils/constants";
import { Result } from "@/types/result";

export function ResultsPage() {
  const { items, fetchResults, isLoading, error, offset, total } = useResults();
  const { id } = useParams();
  const taskId = id ? (id as string) : null;

  const { task } = useTask({
    fetchImmediately: true,
    taskId,
  });

  const renderGridCard = useCallback(
    ({ item }: { item: Result }) => <ResultItem item={item} key={item.uuid} />,
    []
  );

  const onFetchMore = useCallback(() => {
    fetchResults({ limit: LIMIT, offset: offset + LIMIT });
  }, [fetchResults, offset]);

  const onUploaded = useCallback(() => {
    fetchResults({ limit: LIMIT, offset: 0 });
  }, [fetchResults]);

  const renderBetweenHeaderAndBody = useCallback(() => {
    if (taskId && !error && !isLoading) {
      return (
        <TaskImageUpload
          taskId={taskId}
          containerClassName="flex justify-center space-x-4 -mt-8 flex-col items-center"
          hideViewAllResults
          onUploaded={onUploaded}
        />
      );
    }
    return null;
  }, [taskId, error, isLoading, onUploaded]);

  const renderError = useCallback((error: string) => {
    return (
      <div data-testid="results-error-message">
        <p className="text-red-500">Error: {error}</p>
        <p className="text-sm">
          <Link href="/tasks" className="text-blue-500 text-sm underline">
            View List of Tasks
          </Link>
        </p>
      </div>
    );
  }, []);

  return (
    <div className="text-black dark:text-white p-8">
      <ListContainer
        list={items}
        loading={isLoading}
        error={error}
        onRefresh={() => fetchResults({ limit: LIMIT, offset: 0 })}
        renderGridCard={renderGridCard}
        renderBetweenHeaderAndBody={renderBetweenHeaderAndBody}
        onFetchMore={onFetchMore}
        total={total}
        keyProp="uuid"
        initialMode={ListContainerMode.GRID}
        title={task?.name ?? "Results"}
        subtitle={
          <Link
            href="/tasks"
            className="text-blue-500 text-sm flex cursor-pointer justify-center"
          >
            <ArrowLeftIcon className="w-4 h-4 mt-0.5 mr-1" /> View Tasks
          </Link>
        }
        renderError={renderError}
      />
    </div>
  );
}
