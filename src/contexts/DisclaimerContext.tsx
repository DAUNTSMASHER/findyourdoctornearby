"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { DisclaimerModal } from "@/components/DisclaimerModal";

interface DisclaimerContextValue {
  openDisclaimer: () => void;
}

const DisclaimerContext = createContext<DisclaimerContextValue | null>(null);

export function DisclaimerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openDisclaimer = useCallback(() => setIsOpen(true), []);
  const closeDisclaimer = useCallback(() => setIsOpen(false), []);

  return (
    <DisclaimerContext.Provider value={{ openDisclaimer }}>
      {children}
      <DisclaimerModal isOpen={isOpen} onClose={closeDisclaimer} />
    </DisclaimerContext.Provider>
  );
}

export function useDisclaimer() {
  const ctx = useContext(DisclaimerContext);
  if (!ctx)
    throw new Error("useDisclaimer must be used within DisclaimerProvider");
  return ctx;
}
