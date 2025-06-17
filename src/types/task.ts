export interface Task {
  uuid: string;
  name: string;
  created_at: string;
  updated_at: string;
  compute_realogram: boolean;
  compute_shares: boolean;
}

export function isTask(task: unknown): task is Task {
  return (
    typeof task === "object" &&
    task !== null &&
    "uuid" in task &&
    "name" in task &&
    typeof task.uuid === "string" &&
    typeof task.name === "string"
  );
}
