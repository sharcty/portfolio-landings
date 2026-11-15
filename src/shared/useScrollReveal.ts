import { useEffect, useRef, useState, type RefObject } from 'react';

export const DEFAULT_REVEAL_THRESHOLD = 0.08;

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold: number | number[] = DEFAULT_REVEAL_THRESHOLD
): readonly [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}
