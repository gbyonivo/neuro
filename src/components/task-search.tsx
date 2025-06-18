import { useEffect, useState } from "react";
import * as yup from "yup";
import { TextInput } from "./common/text-input";
import { Button } from "./common/button";
import { useRouter } from "next/navigation";

const schema = yup
  .string()
  .required("Task ID is required")
  .uuid("Invalid Task ID");

export function TaskSearch() {
  const [taskId, setTaskId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSearch = async () => {
    try {
      await schema.validate(taskId);
      router.push(`/tasks/${taskId}/results`);
    } catch (e: unknown) {
      // @ts-expect-error - yup error is not typed
      setError(e?.errors?.[0] || `${taskId} is Invalid`);
    }
  };

  useEffect(() => {
    setError("");
  }, [taskId]);
  return (
    <div className="flex gap-2 justify-center">
      <TextInput
        placeholder="Task ID*"
        value={taskId}
        onChange={(value) => setTaskId(value)}
        error={error}
        id="task-id-input"
      />
      <Button
        onClick={handleSearch}
        disabled={!taskId}
        className="self-start mt-0.5"
        id="search-button"
      >
        Search
      </Button>
    </div>
  );
}
