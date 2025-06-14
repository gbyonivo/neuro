import { ItemWithSidePanel } from "./item-with-side-panel";
import { ImageCard } from "./common/image-card";
import { Result, ResultStatus } from "@/types/result";
import { ResultDetails } from "./result-details";
import { RESULT_STATUS_LABELS } from "@/utils/constants";

interface ResultItemProps {
  item: Result;
}

export function ResultItem({ item }: ResultItemProps) {
  return (
    <ItemWithSidePanel<Result>
      item={item}
      key={item.uuid}
      title="Result Details"
      renderSidePanelContent={({ item }) => <ResultDetails result={item} />}
      renderItemContent={({ item, handleShowPanel }) => (
        <ImageCard
          key={item.uuid}
          imageUrl={item.image_url}
          className="bg-gray-100 dark:bg-gray-100"
          lines={[
            RESULT_STATUS_LABELS[item.status] || "",
            `Confidence Score: ${item.confidence_score || "N/A"}`,
          ]}
          flag={item.status === ResultStatus.FAILED ? "Process Failed" : ""}
          header={item.uuid}
          onClick={() => handleShowPanel(true)}
          id={`result-${item.uuid}`}
        />
      )}
    />
  );
}
