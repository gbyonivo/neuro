"use client";

import { ListContainer, ListContainerMode } from "./list-container";
import { useTasks } from "@/hooks/use-tasks";
import { TaskItem } from "./task-item";
import Link from "next/link";
import { TaskSearch } from "./task-search";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { LIMIT } from "@/utils/constants";

const tableHeaders = [
  {
    label: "Name",
    className: "text-left pl-2",
  },
  {
    label: "Realogram",
    className: "text-left hidden lg:table-cell",
  },
  {
    label: "Shares",
    className: "text-left hidden lg:table-cell",
  },
  {
    label: "Created At",
    className: "text-center hidden lg:table-cell",
  },
  {
    label: "Updated At",
    className: "text-center hidden lg:table-cell",
  },
  {
    label: "Action",
    className: "text-center",
  },
];

export function TasksPage() {
  const { items, fetchTasks, isLoading, error, offset, total } = useTasks();

  return (
    <div className="text-black dark:text-white p-8">
      <ListContainer
        list={items}
        loading={isLoading}
        error={error}
        onRefresh={() => fetchTasks({ limit: LIMIT, offset: 0 })}
        renderRow={({ item }) => <TaskItem item={item} key={item.uuid} />}
        onFetchMore={() => fetchTasks({ limit: LIMIT, offset: offset + LIMIT })}
        total={total}
        keyProp="uuid"
        initialMode={ListContainerMode.TABLE}
        title="Tasks"
        renderBetweenHeaderAndBody={() => <TaskSearch />}
        subtitle={
          <Link
            href="/"
            className="text-blue-500 text-sm flex cursor-pointer justify-center"
          >
            <ArrowLeftIcon className="w-4 h-4 mt-0.5 mr-1" /> View Catalog
          </Link>
        }
        renderTableHeader={() => (
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.label}
                  scope="col"
                  className={`py-3.5 pr-3 text-sm font-semibold text-black dark:text-white  ${header.className}`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
        )}
      />
    </div>
  );
}
