import { RootState } from "@/lib/store";
import { uploadImage } from "@/lib/thunks/image-process";
import { ProcessStatus } from "@/types/stores/image-processing-store";
import { Task } from "@/types/task";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./common/button";

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
        <input />
        <label
          htmlFor="file-upload"
          className="block text-sm font-medium text-white"
        >
          Upload a File
        </label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          id="file-upload"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          accept=".jpg,.png,.pdf"
          name="file-upload"
        />
      </div>
      {image && (
        <div className="my-8 flex justify-center">
          <Image
            src={URL.createObjectURL(image)}
            alt={`image-`}
            width={100}
            height={100}
            className="rounded-md h-40 w-40 object-contain"
          />
        </div>
      )}
      <div className="flex justify-center">
        <Button
          onClick={handleImageUpload}
          disabled={!image || isUploading}
          className="mt-4"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
}
