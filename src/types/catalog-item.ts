enum CatalogItemStatus {
  READY = "READY",
  NEEDS_CAPTURE = "NEEDS_CAPTURE",
  PROCESSING = "PROCESSING",
}

export interface CatalogItemType {
  uuid: string;
  status: CatalogItemStatus;
  thumbnail_url: string;
  name?: string;
  barcode?: string;
  custom_id?: string;
  height?: number;
  width?: number;
  depth?: number;
  brand?: string;
  size?: string;
  container_type?: string;
  flavour?: string;
  packaging_size?: string;
  created_at: string;
  updated_at: string;
}

export function isCatalogItem(item: unknown): item is CatalogItemType {
  return (
    typeof item === "object" &&
    item !== null &&
    "uuid" in item &&
    typeof item.uuid === "string"
  );
}
