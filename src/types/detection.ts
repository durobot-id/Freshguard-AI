export type ConnectionStatus = "connected" | "connecting" | "disconnected";

export interface RawDetectionRecord {
  Label?: string | null;
  PH?: number | string | null;
  Sulfur?: number | string | null;
  Tipe_makanan?: string | null;
  VOC?: number | string | null;
  [key: string]: unknown;
}

export interface DetectionRecord {
  id: string; // The original Firebase key, e.g. "191020261230"
  label: string; // Raw label, e.g. "Segar" or fallback "—"
  ph: number | null; // Finite number or null
  sulfur: number | null; // Finite number or null
  foodType: string; // Food type, e.g. "Nasi" or fallback "—"
  voc: number | null; // Finite number or null
  timestamp: number | null; // Epoch ms if validly parsed, or null
  formattedDateTime: string; // e.g. "19 Okt 2026, 12.30" or "Waktu tidak tersedia"
  isTimestampValid: boolean;
  receivedAt: number; // Local client timestamp when received
}

export type FilterFoodType = string; // "all" or specific food type
export type FilterLabel = string; // "all" or specific label

export interface DetectionFiltersState {
  foodType: FilterFoodType;
  label: FilterLabel;
  searchQuery: string;
}
