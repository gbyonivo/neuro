import { CatalogItemStatus, CatalogItemType } from "@/types/catalog-item";
import { ImageCard } from "./common/image-card";
import { memo } from "react";

interface CatalogItemProps {
  item: CatalogItemType;
}

const FLAG_CLASS_NAMES = {
  [CatalogItemStatus.NEEDS_CAPTURE]: "bg-red-700 text-white",
  [CatalogItemStatus.PROCESSING]: "bg-yellow-400 text-white",
  [CatalogItemStatus.READY]: "bg-green-700 text-white",
};

const FLAG_LABELS = {
  [CatalogItemStatus.NEEDS_CAPTURE]: "Need Capture",
  [CatalogItemStatus.PROCESSING]: "Processing Item",
  [CatalogItemStatus.READY]: "Processed",
};

function CatalogItemInner({ item }: CatalogItemProps) {
  const isNeedCapture = item.status === CatalogItemStatus.NEEDS_CAPTURE;
  const className = isNeedCapture
    ? "border-2 border-red-700 bg-gray-300 dark:bg-gray-300"
    : "bg-gray-100 dark:bg-gray-100";
  return (
    <ImageCard
      imageUrl={item.thumbnail_url}
      className={className}
      lines={[FLAG_LABELS[item.status] || "", item.barcode || ""]}
      header={item.name || ""}
      flag={FLAG_LABELS[item.status]}
      flagClassName={FLAG_CLASS_NAMES[item.status]}
    />
  );
}

export const CatalogItem = memo(CatalogItemInner, (prevProps, nextProps) => {
  return prevProps.item.uuid === nextProps.item.uuid;
});
