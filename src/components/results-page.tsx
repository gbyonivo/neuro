"use client";

import { ListContainer, ListContainerMode } from "./list-container";
import Link from "next/link";
import { useResults } from "@/hooks/use-results";
import { ResultItem } from "./result-item";
import { TaskImageUpload } from "./task-image-upload";

export function ResultsPage() {
  const { items, fetchResults, isLoading, error, offset, total, taskId } =
    useResults();

  return (
    <div className="text-black dark:text-white p-8">
      <ListContainer
        list={items}
        loading={isLoading}
        error={error}
        onRefresh={() => fetchResults({ limit: 10, offset: 0 })}
        renderGridCard={({ item }) => (
          <ResultItem item={item} key={item.uuid} />
        )}
        renderBetweenHeaderAndBody={() =>
          taskId && !error && !isLoading ? (
            <TaskImageUpload
              taskId={taskId}
              containerClassName="flex justify-center space-x-4 -mt-8"
              hideViewAllResults
            />
          ) : null
        }
        onFetchMore={() => fetchResults({ limit: 10, offset: offset + 10 })}
        total={total}
        keyProp="uuid"
        initialMode={ListContainerMode.GRID}
        title="Results"
        subtitle={
          <Link href="/tasks" className="text-blue-500 text-sm underline">
            View Tasks
          </Link>
        }
        renderError={(error) => (
          <div data-testid="results-error-message">
            <p className="text-red-500">Error: {error}</p>
            <p className="text-sm">
              <Link href="/tasks" className="text-blue-500 text-sm underline">
                View List of Tasks
              </Link>
            </p>
          </div>
        )}
      />
    </div>
  );
}
