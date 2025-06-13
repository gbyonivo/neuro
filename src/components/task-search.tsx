import { useState } from "react";
import { TextInput } from "./common/text-input";
import { Button } from "./common/button";
import { useRouter } from "next/navigation";

export function TaskSearch() {
  const [taskId, setTaskId] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    router.push(`/tasks/${taskId}/results`);
  };
  return (
    <div className="flex gap-2 justify-center">
      <TextInput
        placeholder="Task ID"
        value={taskId}
        onChange={(value) => setTaskId(value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
