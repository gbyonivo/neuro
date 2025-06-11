import { CatalogItem } from "../catalog-item";

export interface CatalogItemsStore {
  catalogItems: CatalogItem[];
  isLoading: boolean;
  error: string | null;
  offset: number;
  total: number;
}
