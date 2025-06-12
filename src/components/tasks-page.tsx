"use client";

import { ListContainer, ListContainerMode } from "./list-container";
import { useTasks } from "@/hooks/use-tasks";
import { TaskItem } from "./task-item";

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
          <TaskItem item={item} isGrid key={item.uuid} />
        )}
        renderRow={({ item }) => <TaskItem item={item} key={item.uuid} />}
        onFetchMore={() => fetchTasks({ limit: 10, offset: offset + 10 })}
        total={total}
        keyProp="uuid"
        initialMode={ListContainerMode.TABLE}
        renderTableHeader={() => (
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
        )}
      />
    </div>
  );
}
