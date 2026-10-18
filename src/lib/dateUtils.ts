const INDONESIAN_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

const INDONESIAN_MONTHS_FULL = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export interface ParsedDateResult {
  isValid: boolean;
  timestamp: number | null;
  formatted: string;
  formattedFull: string;
  dateOnly: string;
  timeOnly: string;
}

/**
 * Parses Firebase record key in format `ddMMyyyyHHmm` (e.g. "191020261230").
 * Returns structured information or invalid state if key doesn't match or is out of bounds.
 */
export function parseRecordKey(key: string): ParsedDateResult {
  if (typeof key !== "string") {
    return {
      isValid: false,
      timestamp: null,
      formatted: "Waktu tidak tersedia",
      formattedFull: "Waktu tidak tersedia",
      dateOnly: "—",
      timeOnly: "—",
    };
  }

  const trimmed = key.trim();
  const match = trimmed.match(/^(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})$/);

  if (!match) {
    return {
      isValid: false,
      timestamp: null,
      formatted: "Waktu tidak tersedia",
      formattedFull: "Waktu tidak tersedia",
      dateOnly: "—",
      timeOnly: "—",
    };
  }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  const hour = parseInt(match[4], 10);
  const minute = parseInt(match[5], 10);

  // Validate boundaries
  if (month < 1 || month > 12) {
    return {
      isValid: false,
      timestamp: null,
      formatted: "Waktu tidak tersedia",
      formattedFull: "Waktu tidak tersedia",
      dateOnly: "—",
      timeOnly: "—",
    };
  }

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return {
      isValid: false,
      timestamp: null,
      formatted: "Waktu tidak tersedia",
      formattedFull: "Waktu tidak tersedia",
      dateOnly: "—",
      timeOnly: "—",
    };
  }

  // Construct local date and verify day wasn't rolled over (e.g. 31 Feb)
  const date = new Date(year, month - 1, day, hour, minute);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return {
      isValid: false,
      timestamp: null,
      formatted: "Waktu tidak tersedia",
      formattedFull: "Waktu tidak tersedia",
      dateOnly: "—",
      timeOnly: "—",
    };
  }

  const paddedHour = hour.toString().padStart(2, "0");
  const paddedMinute = minute.toString().padStart(2, "0");
  const timeOnly = `${paddedHour}.${paddedMinute}`;
  const monthShort = INDONESIAN_MONTHS[month - 1];
  const monthFull = INDONESIAN_MONTHS_FULL[month - 1];

  const formatted = `${day} ${monthShort} ${year}, ${timeOnly}`;
  const formattedFull = `${day} ${monthFull} ${year}, pukul ${timeOnly} WIB`;
  const dateOnly = `${day} ${monthShort} ${year}`;

  return {
    isValid: true,
    timestamp: date.getTime(),
    formatted,
    formattedFull,
    dateOnly,
    timeOnly,
  };
}

/**
 * Formats a local timestamp into readable Indonesian time string
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diffMs = now - timestamp;

  if (diffMs < 0) return "Baru saja";
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 45) return "Baru saja";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} menit yang lalu`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} jam yang lalu`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay === 1) return "Kemarin";
  if (diffDay < 7) return `${diffDay} hari yang lalu`;

  const d = new Date(timestamp);
  return `${d.getDate()} ${INDONESIAN_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}
