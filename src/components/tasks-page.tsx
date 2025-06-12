"use client";

import Link from "next/link";
import { ListContainer, ListContainerMode } from "./list-container";
import { useTasks } from "@/hooks/use-tasks";

export function TasksPage() {
  const { items, fetchTasks, isLoading, error, offset, total } = useTasks();

  return (
    <div className="text-black dark:text-white">
      <ListContainer
        list={items}
        loading={isLoading}
        error={error}
        onRefresh={() => fetchTasks({ limit: 10, offset: 0 })}
        renderGridCard={({ item }) => (
          <Link key={item.uuid} href={`/tasks-items/${item.uuid}`}>
            <div key={item.uuid}>{item.name}</div>
          </Link>
        )}
        renderRow={({ item }) => <div key={item.uuid}>{item.name}</div>}
        onFetchMore={() => fetchTasks({ limit: 10, offset: offset + 10 })}
        total={total}
        keyProp="uuid"
        initialMode={ListContainerMode.TABLE}
      />
    </div>
  );
}
