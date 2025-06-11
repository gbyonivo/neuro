export interface CatalogItem {
  uuid: string;
  status: string;
  thumbnail_url: string;
  name: string;
  barcode: string;
  custom_id: string | null;
  height: string | null;
  width: string | null;
  depth: string | null;
  brand: string | null;
  size: string | null;
  container_type: string | null;
  flavour: string | null;
  packaging_size: string | null;
  created_at: string;
  updated_at: string;
}

export function isCatalogItem(item: unknown): item is CatalogItem {
  return (
    typeof item === "object" &&
    item !== null &&
    "uuid" in item &&
    typeof item.uuid === "string"
  );
}
