import { animate, useInView } from "motion/react";
import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

/** Scroll-reveal wrapper (IntersectionObserver via Motion, fires once). */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** One-shot number count-up when scrolled into view. */
export function CountUp({
  value,
  decimals = 1,
  duration = 1.1,
  className,
}: {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
    </span>
  );
}

/** Plain-language section label (topic name, never a number). */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ice-deep">
      <span aria-hidden className="h-px w-6 bg-ice-bright" />
      {children}
    </span>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-[1200px] scroll-mt-20 px-6 py-7 md:py-8 ${className}`}
    >
      {children}
    </section>
  );
}
