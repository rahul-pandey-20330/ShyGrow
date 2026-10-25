"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

type CursorFloatProps = {
  children: ReactNode;
  className?: string;
};

export function CursorFloat({
  children,
  className = "",
}: CursorFloatProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  const y = useSpring(mouseY, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(relativeX * 18);
    mouseY.set(relativeY * 18);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={reduceMotion ? undefined : { x, y }}
        className="h-full w-full"
      >
        <motion.div
          className="h-full w-full"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -8, 0],
                  rotate: [0, 0.5, 0],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}