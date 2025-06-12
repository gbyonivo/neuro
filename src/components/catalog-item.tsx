import { CatalogItemStatus, CatalogItemType } from "@/types/catalog-item";
import { ImageCard } from "./common/image-card";

interface CatalogItemProps {
  item: CatalogItemType;
  isGrid?: boolean;
}

export function CatalogItem({ item, isGrid = false }: CatalogItemProps) {
  const isNeedCapture = item.status === CatalogItemStatus.NEEDS_CAPTURE;
  const className = isNeedCapture
    ? "border-2 border-red-700 bg-gray-300 dark:bg-gray-300"
    : "bg-gray-100 dark:bg-gray-100";
  return isGrid ? (
    <ImageCard
      imageUrl={item.thumbnail_url}
      className={className}
      lines={[item.name || "", item.barcode || ""]}
      header={item.name || ""}
      flag={isNeedCapture ? "Need Capture" : ""}
    />
  ) : (
    // TODO: Make this look better, but for now i will restrict the list to grid mode
    <tr className="my-8">
      <td>{item.uuid}</td>
      <td>{item.name}</td>
      <td>{item.status}</td>
    </tr>
  );
}
