"use client";

import { useParams } from "next/navigation";

export function TasksPage() {
  const params = useParams();
  const uuid = params.id as string;

  return <div>{uuid}</div>;
}
