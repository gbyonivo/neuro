import { CatalogItemStatus, CatalogItemType } from "@/types/catalog-item";
import Image from "next/image";

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
    <div
      className={`w-64 h-80  rounded-lg shadow-md p-4 flex flex-col relative overflow-hidden ${className}`}
    >
      <Image
        className="w-full h-40 rounded-lg object-contain"
        src={item.thumbnail_url}
        alt="Food Image"
        width={100}
        height={100}
      />
      <div className="mt-4 overflow-hidden text-ellipsis text-xs flex flex-col gap-2">
        <h2 className="text-sm font-bold text-gray-800">{item.name}</h2>
        <p className="text-gray-600 font-semibold">{item.status}</p>
        <p className="text-gray-600 font-semibold">Barcode: {item.barcode}</p>
      </div>
      {isNeedCapture && (
        <div className="absolute -bottom-4 -right-8 bg-red-700 p-1 px-2 rotate-325 w-60 text-right">
          <span className="text-white font-semibold text-xs mr-3">
            Need Capture
          </span>
        </div>
      )}
    </div>
  ) : (
    // TODO: Make this look better, but for now i will restrict the list to grid mode
    <tr className="my-8">
      <td>{item.uuid}</td>
      <td>{item.name}</td>
      <td>{item.status}</td>
    </tr>
  );
}
