import { CatalogItemType } from "@/types/catalog-item";

interface CatalogItemProps {
  item: CatalogItemType;
  isGrid?: boolean;
}

export function CatalogItem({ item, isGrid = false }: CatalogItemProps) {
  return isGrid ? (
    <div>{item.name}</div>
  ) : (
    <tr>
      <td>{item.name}</td>
      <td>{item.uuid}</td>
    </tr>
  );
}
