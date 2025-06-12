export enum ProcessStatus {
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface SingleProcessState {
  status: ProcessStatus;
  imageUrl: string | null;
  error: string | null;
  id: string;
  taskUuid: string;
}

export interface ImageProcessingStore {
  processes: SingleProcessState[];
}
