import { Task } from "@/types/task";
import { ItemWithSidePanel } from "./item-with-side-panel";
import { TaskImageUpload } from "./task-image-upload";
import { getDate } from "@/utils/date";

interface TaskCardProps {
  item: Task;
  isGrid?: boolean;
}

export function TaskItem({ item, isGrid = false }: TaskCardProps) {
  return isGrid ? (
    <ItemWithSidePanel<Task>
      item={item}
      key={item.uuid}
      renderSidePanelContent={({ item }) => (
        <div key={item.uuid}>{item.name}</div>
      )}
      renderItemContent={({ item, handleShowPanel }) => (
        <div key={item.uuid} onClick={() => handleShowPanel(true)}>
          {item.name}
        </div>
      )}
    />
  ) : (
    <tr key={item.uuid}>
      <td>
        <ItemWithSidePanel<Task>
          item={item}
          key={item.uuid}
          renderSidePanelContent={({ item }) => <TaskImageUpload task={item} />}
          renderItemContent={({ item, handleShowPanel }) => (
            <div
              className="cursor-pointer underline"
              key={item.uuid}
              onClick={() => handleShowPanel(true)}
            >
              {item.name}
            </div>
          )}
        />
      </td>
      <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell text-center">
        {item.uuid.substring(0, 8)}...
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
    </tr>
  );
}
