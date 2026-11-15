import type { HTMLAttributes } from 'react';
import { DEFAULT_REVEAL_THRESHOLD, useScrollReveal } from './useScrollReveal';

type RevealSectionProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  threshold?: number | number[];
};

export default function RevealSection({
  children,
  className = '',
  delay = 0,
  threshold = DEFAULT_REVEAL_THRESHOLD,
  ...divProps
}: RevealSectionProps) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>(threshold);

  return (
    <div
      {...divProps}
      ref={ref}
      style={{ ...divProps.style, transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}
