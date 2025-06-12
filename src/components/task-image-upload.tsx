import { RootState } from "@/lib/store";
import { uploadImage } from "@/lib/thunks/image-process";
import { ProcessStatus } from "@/types/stores/image-processing-store";
import { Task } from "@/types/task";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ImageUploadProps {
  task: Task;
  onUploaded?: () => void;
}

export function TaskImageUpload({ task }: ImageUploadProps) {
  const { processes } = useSelector(
    (state: RootState) => state.imageProcessing
  );
  const isUploading = processes.some(
    (process) =>
      process.taskUuid === task.uuid &&
      process.status === ProcessStatus.PROCESSING
  );
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useDispatch();

  const handleImageUpload = useCallback(() => {
    if (!image) return;
    // @ts-expect-error: TODO: fix this type issue
    dispatch(uploadImage({ image, taskUuid: task.uuid }));
  }, [image, task.uuid, dispatch]);

  return (
    <div>
      <div>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>
      {image && (
        <div>
          <Image
            src={URL.createObjectURL(image)}
            alt={`image-`}
            width={100}
            height={100}
          />
        </div>
      )}
      <button onClick={handleImageUpload} disabled={!image || isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
