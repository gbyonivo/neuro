export enum ResultStatus {
  IN_PROGRESS = "IN_PROGRESS",
  FAILED = "FAILED",
  PROCESSED = "PROCESSED",
}

interface ItemEntry {
  annotation_id: number;
  shelf_id: number;
  slot: number;
  stack_index: number;
}

interface Gap {
  shelf_id: number;
  slot: number;
  stack_index: number;
  bbox: number[];
}

interface Realogram {
  gaps: Gap[];
  item_entries: ItemEntry[];
}

interface ShareResultProductValue {
  group_by: string;
  product_uuid: string;
  count: number;
  count_ratio: number;
  area: number;
  area_ratio: number;
}

interface ShareResultTagValue {
  group_by: string;
  tag_uuid: string;
  count: number;
  count_ratio: number;
  area: number;
  area_ratio: number;
}

interface Share {
  image_id: number;
  values: (ShareResultProductValue | ShareResultTagValue)[];
}

interface PostprocessingResults {
  realogram?: Realogram;
  shares?: Share[];
}

interface Coco {
  info: {
    url: string;
    year: string;
    version: string;
    contributor: string;
    description: string;
    date_created: string;
  };
}

export interface Result {
  uuid: string;
  task_uuid: string;
  image_url: string;
  status: ResultStatus;
  duration?: number;
  created_at: string;
  updated_at: string;
  postprocessing_results?: PostprocessingResults;
  confidence_score?: number;
  coco?: Coco;
}
