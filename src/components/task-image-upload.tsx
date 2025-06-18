import { RootState } from "@/lib/store";
import { ProcessStatus } from "@/types/stores/image-processing-store";
import { uploadImage } from "@/lib/thunks/image-process";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./common/button";
import Link from "next/link";

interface ImageUploadProps {
  taskId: string;
  onUploaded?: () => void;
  containerClassName?: string;
  hideViewAllResults?: boolean;
}

export function TaskImageUpload({
  taskId,
  containerClassName,
  hideViewAllResults,
  onUploaded,
}: ImageUploadProps) {
  const { processes } = useSelector(
    (state: RootState) => state.imageProcessing
  );
  const imageProcess = processes.find((process) => process.taskUuid === taskId);
  const statusRef = useRef<ProcessStatus>(imageProcess?.status);
  const isUploading = imageProcess?.status === ProcessStatus.PROCESSING;
  const [image, setImage] = useState<File | null>(null);
  const [didJustFinish, setDidJustFinish] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      imageProcess?.status === ProcessStatus.COMPLETED &&
      statusRef.current === ProcessStatus.PROCESSING
    ) {
      setDidJustFinish(true);
      setImage(null);
    }
    statusRef.current = imageProcess?.status;
  }, [imageProcess?.status]);

  const handleImageUpload = useCallback(() => {
    if (!image) return;
    setDidJustFinish(false);
    // @ts-expect-error: TODO: fix this type issue
    dispatch(uploadImage({ image, taskUuid: taskId }));
  }, [image, taskId, dispatch]);

  useEffect(() => {
    if (didJustFinish) {
      onUploaded?.();
    }
  }, [didJustFinish, onUploaded]);

  return (
    <div
      className={`${containerClassName} flex flex-col justify-between h-full`}
    >
      <div>
        <div>
          <div>
            <input />
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-white"
              data-testid="upload-file-label"
            >
              Upload a File
            </label>
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files?.[0] || null);
                setDidJustFinish(false);
              }}
              id="file-upload"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 max-w-64"
              accept=".jpg,.png"
              name="file-upload"
            />
          </div>
          <Button
            onClick={handleImageUpload}
            disabled={!image || isUploading}
            className="my-2"
            id="upload-button"
            loading={isUploading}
          >
            Upload
          </Button>
        </div>

        {image && (
          <div className="my-8 flex justify-center">
            <Image
              src={URL.createObjectURL(image)}
              alt={`image-`}
              width={100}
              height={100}
              className="rounded-md h-40 w-40 object-contain"
              data-testid="selected-image"
            />
          </div>
        )}
        {didJustFinish && (
          <div
            className="text-green-500 text-sm my-4"
            data-testid="upload-success-message"
          >
            Image uploadeded successfully
          </div>
        )}
      </div>
      {!hideViewAllResults && (
        <Link
          href={`/tasks/${taskId}/results`}
          className="text-blue-500 text-sm underline"
        >
          View Results for this Task
        </Link>
      )}
    </div>
  );
}
