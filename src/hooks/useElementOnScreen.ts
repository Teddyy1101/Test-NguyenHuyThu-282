"use client";

import { useEffect, useRef, useState } from "react";

interface ObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

export function useElementOnScreen(
  options: ObserverOptions = {}
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const currentElement = containerRef.current;

    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      options
    );

    observer.observe(currentElement);
    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return [containerRef, isIntersecting];
}
