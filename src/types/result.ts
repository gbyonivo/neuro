export enum ResultStatus {
  IN_PROGRESS = "IN_PROGRESS",
  FAILED = "FAILED",
  PROCESSED = "PROCESSED",
}

export interface Result {
  uuid: string;
  task_uuid: string;
  image_url: string;
  status: ResultStatus;
  duration?: number;
  created_at: string;
  updated_at: string;
}
