"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface MuteContextType {
  isMuted: boolean;
  toggleMute: () => void;
  /** Dùng khi browser chặn autoplay có âm thanh — đồng bộ state với thực tế */
  forceMute: () => void;
}

const MuteContext = createContext<MuteContextType>({
  isMuted: false,
  toggleMute: () => { },
  forceMute: () => { },
});

export function MuteProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const forceMute = useCallback(() => {
    setIsMuted(true);
  }, []);

  return (
    <MuteContext.Provider value={{ isMuted, toggleMute, forceMute }}>
      {children}
    </MuteContext.Provider>
  );
}

export function useMuteState() {
  return useContext(MuteContext);
}
