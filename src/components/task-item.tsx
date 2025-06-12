import { Task } from "@/types/task";
import { ItemWithSidePanel } from "./item-with-side-panel";
import { TaskImageUpload } from "./task-image-upload";

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
      <td>{item.name}</td>
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
    </tr>
  );
}
