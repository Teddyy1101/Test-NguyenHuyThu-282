"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface MuteContextType {
  /** Trạng thái tắt tiếng toàn cục */
  isMuted: boolean;
  toggleMute: () => void;
}

const MuteContext = createContext<MuteContextType>({
  isMuted: false,
  toggleMute: () => { },
});

export function MuteProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return (
    <MuteContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </MuteContext.Provider>
  );
}

export function useMuteState() {
  return useContext(MuteContext);
}
