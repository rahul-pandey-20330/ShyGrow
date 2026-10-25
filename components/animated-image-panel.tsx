
"use client";

import { motion, useReducedMotion } from "motion/react";

type AnimatedImagePanelProps = {
  image: string;
  alt: string;
  label?: string;
  className?: string;
  imagePosition?: string;
};

export function AnimatedImagePanel({
  image,
  alt,
  label,
  className = "",
  imagePosition = "center",
}: AnimatedImagePanelProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`animated-image-panel ${className}`}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 24, clipPath: "inset(10% 5% 10% 5% round 20px)" }
      }
      whileInView={
        reduceMotion
          ? undefined
          : { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 20px)" }
      }
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="animated-image-panel__image"
        style={{
          backgroundImage: `url("${image}")`,
          backgroundPosition: imagePosition,
        }}
        role="img"
        aria-label={alt}
        whileHover={reduceMotion ? undefined : { scale: 1.07 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <div className="animated-image-panel__shade" />

      {!reduceMotion && (
        <>
          <motion.span
            className="animated-image-panel__orb animated-image-panel__orb--one"
            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.span
            className="animated-image-panel__orb animated-image-panel__orb--two"
            animate={{ y: [0, 9, 0], rotate: [0, 12, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.span
            className="animated-image-panel__scan"
            animate={{ y: ["-100%", "220%"] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1.5,
            }}
          />
        </>
      )}

      {label && (
        <motion.span
          className="animated-image-panel__label"
          initial={reduceMotion ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <span className="animated-image-panel__label-dot" />
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}
