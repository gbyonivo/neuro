import { ResultStatus } from "@/types/result";

export const RESULT_STATUS_LABELS = {
  [ResultStatus.IN_PROGRESS]: "In Progress",
  [ResultStatus.FAILED]: "Failed",
  [ResultStatus.PROCESSED]: "Processed",
};
