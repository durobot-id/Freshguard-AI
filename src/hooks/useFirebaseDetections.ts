"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { ref, onValue, off, DatabaseReference } from "firebase/database";
import { database } from "@/lib/firebase";
import {
  ConnectionStatus,
  DetectionRecord,
  RawDetectionRecord,
} from "@/types/detection";
import { parseRecordKey } from "@/lib/dateUtils";

interface UseFirebaseDetectionsResult {
  records: DetectionRecord[];
  latestRecord: DetectionRecord | null;
  status: ConnectionStatus;
  isLoading: boolean;
  error: string | null;
  lastUpdatedAt: number | null;
  hasNewIncoming: boolean;
  clearNewIncomingAlert: () => void;
  uniqueFoodTypes: string[];
  uniqueLabels: string[];
}

// Fallback seed data if database is empty or initial connection needs demo
const FALLBACK_SEED_DATA: Record<string, RawDetectionRecord> = {
  "191020261340": {
    Label: "Segar",
    PH: 7.0,
    Tipe_makanan: "Nasi",
    VOC: 60,
  },
  "191020261230": {
    Label: "Segar",
    PH: 6.8,
    Tipe_makanan: "Nasi",
    VOC: 20,
  },
};

function parseRawRecord(key: string, raw: RawDetectionRecord | null | undefined): DetectionRecord {
  const dateInfo = parseRecordKey(key);

  // Validate PH
  let phVal: number | null = null;
  if (typeof raw?.PH === "number" && Number.isFinite(raw.PH)) {
    phVal = raw.PH;
  } else if (typeof raw?.PH === "string") {
    const parsed = parseFloat(raw.PH);
    if (Number.isFinite(parsed)) phVal = parsed;
  }

  // Validate VOC
  let vocVal: number | null = null;
  if (typeof raw?.VOC === "number" && Number.isFinite(raw.VOC)) {
    vocVal = raw.VOC;
  } else if (typeof raw?.VOC === "string") {
    const parsed = parseFloat(raw.VOC);
    if (Number.isFinite(parsed)) vocVal = parsed;
  }

  // Label & Food Type
  const labelVal = raw?.Label && typeof raw.Label === "string" && raw.Label.trim() !== ""
    ? raw.Label.trim()
    : "—";

  const foodTypeVal = raw?.Tipe_makanan && typeof raw.Tipe_makanan === "string" && raw.Tipe_makanan.trim() !== ""
    ? raw.Tipe_makanan.trim()
    : "—";

  return {
    id: key,
    label: labelVal,
    ph: phVal,
    foodType: foodTypeVal,
    voc: vocVal,
    timestamp: dateInfo.timestamp,
    formattedDateTime: dateInfo.formatted,
    isTimestampValid: dateInfo.isValid,
    receivedAt: Date.now(),
  };
}

export function useFirebaseDetections(): UseFirebaseDetectionsResult {
  const [records, setRecords] = useState<DetectionRecord[]>([]);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number | null>(null);
  const [hasNewIncoming, setHasNewIncoming] = useState<boolean>(false);

  const initialLoadDone = useRef(false);
  const prevCount = useRef(0);

  const processDataSnapshot = useCallback((data: Record<string, RawDetectionRecord> | null) => {
    try {
      if (!data || typeof data !== "object") {
        setRecords([]);
        setIsLoading(false);
        return;
      }

      const parsedList: DetectionRecord[] = Object.entries(data)
        .filter(([key, val]) => val && typeof val === "object" && !key.startsWith("."))
        .map(([key, val]) => parseRawRecord(key, val as RawDetectionRecord));

      // Sort newest to oldest:
      // Valid timestamp takes precedence (descending). If timestamps are equal or invalid, compare key string
      parsedList.sort((a, b) => {
        if (a.timestamp !== null && b.timestamp !== null) {
          return b.timestamp - a.timestamp;
        }
        if (a.timestamp !== null) return -1;
        if (b.timestamp !== null) return 1;
        return b.id.localeCompare(a.id);
      });

      // Detect if new records arrived after initial load
      if (initialLoadDone.current && parsedList.length > prevCount.current) {
        setHasNewIncoming(true);
      }
      prevCount.current = parsedList.length;
      initialLoadDone.current = true;

      setRecords(parsedList);
      setLastUpdatedAt(Date.now());
      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.error("Kesalahan saat memproses data sensor:", err);
      setError("Gagal memproses struktur data dari database");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    let detectionsRef: DatabaseReference | null = null;
    let connectedRef: DatabaseReference | null = null;
    let fallbackInterval: NodeJS.Timeout | null = null;

    if (!database) {
      console.warn("Firebase Database belum siap, mencoba fallback REST API...");
      setStatus("connecting");
      
      const fetchViaRest = async () => {
        try {
          const res = await fetch(
            "https://deteksi-makanan-basi-default-rtdb.asia-southeast1.firebasedatabase.app/.json"
          );
          if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
          const data = await res.json();
          if (isMounted) {
            processDataSnapshot(data || FALLBACK_SEED_DATA);
            setStatus("connected");
          }
        } catch (e) {
          console.error("Gagal memuat lewat REST API:", e);
          if (isMounted) {
            processDataSnapshot(FALLBACK_SEED_DATA);
            setStatus("disconnected");
          }
        }
      };

      fetchViaRest();
      fallbackInterval = setInterval(fetchViaRest, 10000);

      return () => {
        isMounted = false;
        if (fallbackInterval) clearInterval(fallbackInterval);
      };
    }

    try {
      // Listen to connection status via Firebase .info/connected
      connectedRef = ref(database, ".info/connected");
      onValue(connectedRef, (snap) => {
        if (!isMounted) return;
        const isConnected = !!snap.val();
        setStatus(isConnected ? "connected" : "disconnected");
      });

      // Listen to detections at root
      detectionsRef = ref(database, "/");
      onValue(
        detectionsRef,
        (snapshot) => {
          if (!isMounted) return;
          const val = snapshot.val();
          processDataSnapshot(val);
        },
        (dbErr) => {
          console.error("Firebase Database listener error:", dbErr);
          if (!isMounted) return;
          setStatus("disconnected");
          setError("Gagal menyambung ke Firebase Realtime Database");
          setIsLoading(false);
        }
      );
    } catch (listenerError) {
      console.error("Gagal menginisialisasi listener database:", listenerError);
      setStatus("disconnected");
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
      if (detectionsRef) off(detectionsRef);
      if (connectedRef) off(connectedRef);
      if (fallbackInterval) clearInterval(fallbackInterval);
    };
  }, [processDataSnapshot]);

  const latestRecord = useMemo(() => {
    return records.length > 0 ? records[0] : null;
  }, [records]);

  const uniqueFoodTypes = useMemo(() => {
    const types = new Set<string>();
    records.forEach((r) => {
      if (r.foodType && r.foodType !== "—") {
        types.add(r.foodType);
      }
    });
    return Array.from(types).sort();
  }, [records]);

  const uniqueLabels = useMemo(() => {
    const labels = new Set<string>();
    records.forEach((r) => {
      if (r.label && r.label !== "—") {
        labels.add(r.label);
      }
    });
    return Array.from(labels).sort();
  }, [records]);

  const clearNewIncomingAlert = useCallback(() => {
    setHasNewIncoming(false);
  }, []);

  return {
    records,
    latestRecord,
    status,
    isLoading,
    error,
    lastUpdatedAt,
    hasNewIncoming,
    clearNewIncomingAlert,
    uniqueFoodTypes,
    uniqueLabels,
  };
}
