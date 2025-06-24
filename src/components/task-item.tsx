import { Task } from "@/types/task";
import { ItemWithSidePanel } from "./item-with-side-panel";
import { TaskImageUpload } from "./task-image-upload";
import { getDate } from "@/utils/date";
import Link from "next/link";
import { memo } from "react";

interface TaskCardProps {
  item: Task;
}

function TaskItemInner({ item }: TaskCardProps) {
  return (
    <tr
      key={item.uuid}
      className="hover:bg-gray-100 dark:hover:bg-gray-900"
      data-testid={`task-${item.uuid}`}
    >
      <td>
        <Link
          href={`/tasks/${item.uuid}/results`}
          className="text-sm underline pl-2"
        >
          {item.name}
        </Link>
      </td>
      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
        {item.compute_realogram ? "Yes" : "No"}
      </td>
      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
        {item.compute_shares ? "Yes" : "No"}
      </td>
      <td className="hidden px-3 py-4 text-sm text-gray-500 text-center lg:table-cell">
        {getDate(item.created_at)}
      </td>
      <td className="hidden px-3 py-4 text-sm text-center text-gray-500 lg:table-cell">
        {getDate(item.updated_at)}
      </td>
      <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell text-center">
        <ItemWithSidePanel<Task>
          item={item}
          key={item.uuid}
          title="Task Details - Upload Images"
          renderSidePanelContent={({ item }) => (
            <TaskImageUpload taskId={item.uuid} />
          )}
          renderItemContent={({ item, handleShowPanel }) => (
            <div
              className="cursor-pointer underline text-blue-500 text-sm text-center w-full"
              key={item.uuid}
              onClick={() => handleShowPanel(true)}
              role="button"
            >
              Upload Image
            </div>
          )}
        />
      </td>
    </tr>
  );
}

export const TaskItem = memo(TaskItemInner, (prevProps, nextProps) => {
  return prevProps.item.uuid === nextProps.item.uuid;
});
