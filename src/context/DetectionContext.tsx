"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useFirebaseDetections } from "@/hooks/useFirebaseDetections";
import { ConnectionStatus, DetectionRecord } from "@/types/detection";

interface DetectionContextType {
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
  getRecordById: (id: string) => DetectionRecord | undefined;
}

const DetectionContext = createContext<DetectionContextType | undefined>(undefined);

export function DetectionProvider({ children }: { children: ReactNode }) {
  const detectionsState = useFirebaseDetections();

  const getRecordById = (id: string) => {
    return detectionsState.records.find((r) => r.id === id);
  };

  return (
    <DetectionContext.Provider value={{ ...detectionsState, getRecordById }}>
      {children}
    </DetectionContext.Provider>
  );
}

export function useDetections(): DetectionContextType {
  const context = useContext(DetectionContext);
  if (!context) {
    throw new Error("useDetections must be used within a DetectionProvider");
  }
  return context;
}
