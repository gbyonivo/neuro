import { Task } from "@/types/task";
import { NeuroAxiosV2 } from "@/utils/neuro-axios";
import Image from "next/image";
import { useCallback, useState } from "react";

function fileToBinary(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // reader.result is an ArrayBuffer
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

interface ImageUploadProps {
  task: Task;
  onUploaded?: () => void;
}

export function TaskImageUpload({ task, onUploaded }: ImageUploadProps) {
  console.log("task", task);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = useCallback(() => {
    const handle = async () => {
      try {
        if (!image) return;
        setIsUploading(true);
        const binaryData = await fileToBinary(image);
        await NeuroAxiosV2.post(
          `/image-recognition/tasks/${task.uuid}/images`,
          {
            images: binaryData,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setIsUploading(false);
        onUploaded?.();
      } catch (e) {
        setIsUploading(false);
        console.log("error", e);
      }
    };

    handle();
  }, [image, task.uuid, onUploaded]);

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
      <button onClick={handleImageUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
