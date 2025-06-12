import { Task } from "@/types/task";
import { NeuroAxiosV2 } from "@/utils/neuro-axios";

interface TaskResultProps {
  task: Task;
}

export function TaskResult({ task }: TaskResultProps) {
  const viewResult = async () => {
    try {
      const response = await NeuroAxiosV2.get(
        `/image-recognition/tasks/${task.uuid}/results`
      );
      console.log(response);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {}
  };

  return (
    <div>
      <div
        className="text-blue-500 text-sm underline"
        role="button"
        onClick={viewResult}
      >
        View Result
      </div>
    </div>
  );
}
