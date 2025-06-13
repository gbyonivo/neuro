import { Result } from "@/types/result";
import { RESULT_STATUS_LABELS } from "@/utils/constants";
import { getDate } from "@/utils/date";
import Image from "next/image";
import { useMemo } from "react";
import { LabelValueDisplay } from "./common/label-value-display";

interface ResultDetailsProps {
  result: Result;
}

export function ResultDetails({ result }: ResultDetailsProps) {
  const labelAndValues = useMemo(() => {
    return [
      { label: "Status", value: RESULT_STATUS_LABELS[result.status] },
      { label: "Confidence Score", value: result.confidence_score || "N/A" },
      { label: "Created At", value: getDate(result.created_at) },
      { label: "Updated At", value: getDate(result.updated_at) },
      { label: "Task ID", value: result.task_uuid },
    ];
  }, [result]);
  return (
    <div>
      <div>
        <Image
          className="w-full h-40 rounded-lg object-contain mb-8"
          src={result.image_url}
          alt="Food Image"
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col gap-2 text-sm">
        {labelAndValues.map(({ label, value }) => (
          <LabelValueDisplay key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
}
