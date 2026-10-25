"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Code2,
  Layers3,
  Monitor,
  MousePointer2,
  Smartphone,
  Sparkles,
  Video,
} from "lucide-react";

export type ServiceVisualType = "web" | "mobile" | "design" | "motion";

type ServiceVisualProps = {
  type: ServiceVisualType;
};

function FloatingBadge({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute z-20 flex items-center gap-2 rounded-xl border border-white/15 bg-neutral-900/90 px-3 py-2 text-xs text-white shadow-xl backdrop-blur-xl ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -8, 0],
            }
      }
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

function VisualFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: "easeOut" }}
      className="relative mx-auto aspect-[4/3] w-full max-w-[620px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#101010] p-4 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.09),transparent_60%)]" />
      {children}
    </motion.div>
  );
}

function WebVisual() {
  return (
    <VisualFrame>
      <FloatingBadge className="left-5 top-8 sm:left-8" delay={0.3}>
        <Code2 size={15} />
        <span>Clean code</span>
      </FloatingBadge>

      <FloatingBadge className="bottom-8 right-5 sm:bottom-10 sm:right-8" delay={1}>
        <Sparkles size={15} />
        <span>Responsive design</span>
      </FloatingBadge>

      <div className="absolute inset-x-6 bottom-6 top-14 overflow-hidden rounded-xl border border-white/10 bg-[#171717] sm:inset-x-12 sm:bottom-10 sm:top-16">
        <div className="flex h-9 items-center gap-1.5 border-b border-white/10 px-3">
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <div className="ml-3 h-4 flex-1 rounded-md bg-white/5" />
        </div>

        <div className="grid h-[calc(100%-2.25rem)] grid-cols-[1fr_0.8fr] gap-3 p-4 sm:gap-5 sm:p-6">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "82%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-2 rounded-full bg-white/80"
            />
            <div className="mt-3 h-2 w-3/4 rounded-full bg-white/20" />
            <div className="mt-2 h-2 w-2/3 rounded-full bg-white/15" />
            <div className="mt-5 h-8 w-24 rounded-lg bg-white text-[10px] text-black sm:h-9 sm:w-28" />
            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="h-12 rounded-lg border border-white/10 bg-white/[0.04]" />
              <div className="h-12 rounded-lg border border-white/10 bg-white/[0.04]" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex-1 rounded-xl border border-white/10 bg-gradient-to-br from-white/15 to-white/[0.02]" />
            <div className="h-12 rounded-xl border border-white/10 bg-white/[0.04]" />
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

function MobileVisual() {
  return (
    <VisualFrame>
      <FloatingBadge className="left-4 top-8 sm:left-8" delay={0.4}>
        <Smartphone size={15} />
        <span>Mobile first</span>
      </FloatingBadge>

      <FloatingBadge className="bottom-8 right-4 sm:bottom-10 sm:right-8" delay={1.2}>
        <ArrowUpRight size={15} />
        <span>Ready to launch</span>
      </FloatingBadge>

      <motion.div
        animate={{ y: [0, -6, 0], rotate: [-2, 0, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-y-7 left-1/2 w-[42%] max-w-[220px] -translate-x-1/2 rounded-[2rem] border-[5px] border-neutral-700 bg-black p-2 shadow-2xl"
      >
        <div className="relative h-full overflow-hidden rounded-[1.45rem] bg-[#171717] p-4">
          <div className="mx-auto mb-7 h-1.5 w-12 rounded-full bg-white/20" />

          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="h-2 w-14 rounded bg-white/25" />
              <div className="mt-2 h-4 w-24 rounded bg-white" />
            </div>
            <div className="size-9 rounded-full bg-white/10" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
            <div className="h-2 w-14 rounded bg-white/25" />
            <div className="mt-3 h-6 w-20 rounded bg-white/85" />
            <div className="mt-4 h-2 w-full rounded bg-white/15" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="h-16 rounded-xl bg-white/10" />
            <div className="h-16 rounded-xl bg-white/5" />
          </div>

          <div className="mt-4 h-10 rounded-xl bg-white" />
          <div className="mt-5 flex justify-around">
            <div className="size-4 rounded bg-white/20" />
            <div className="size-4 rounded bg-white/20" />
            <div className="size-4 rounded bg-white/20" />
          </div>
        </div>
      </motion.div>
    </VisualFrame>
  );
}

function DesignVisual() {
  return (
    <VisualFrame>
      <FloatingBadge className="left-5 top-8 sm:left-8" delay={0.2}>
        <Layers3 size={15} />
        <span>Design system</span>
      </FloatingBadge>

      <FloatingBadge className="bottom-8 right-5 sm:bottom-10 sm:right-8" delay={1}>
        <MousePointer2 size={15} />
        <span>Pixel precision</span>
      </FloatingBadge>

      <div className="absolute inset-6 top-16 grid grid-cols-2 gap-3 sm:inset-12 sm:top-20 sm:gap-4">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#1c1c1c] p-4 sm:p-5"
        >
          <div className="flex items-center justify-between">
            <div className="size-8 rounded-full bg-white" />
            <div className="h-2 w-10 rounded bg-white/20" />
          </div>
          <div>
            <div className="h-2 w-4/5 rounded bg-white/75" />
            <div className="mt-2 h-2 w-3/5 rounded bg-white/20" />
            <div className="mt-4 h-8 rounded-lg bg-white" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#242424] p-3 sm:p-4"
        >
          <div className="h-20 rounded-xl bg-gradient-to-br from-white/40 to-white/5 sm:h-24" />
          <div className="h-2 w-4/5 rounded bg-white/70" />
          <div className="h-2 w-3/5 rounded bg-white/20" />
          <div className="mt-auto flex gap-2">
            <div className="size-6 rounded-full bg-white/80" />
            <div className="size-6 rounded-full bg-white/30" />
            <div className="size-6 rounded-full bg-white/10" />
          </div>
        </motion.div>
      </div>
    </VisualFrame>
  );
}

function MotionVisual() {
  return (
    <VisualFrame>
      <FloatingBadge className="left-5 top-8 sm:left-8" delay={0.3}>
        <Video size={15} />
        <span>Motion studio</span>
      </FloatingBadge>

      <FloatingBadge className="bottom-8 right-5 sm:bottom-10 sm:right-8" delay={1}>
        <Sparkles size={15} />
        <span>Frame by frame</span>
      </FloatingBadge>

      <div className="absolute inset-x-6 bottom-8 top-16 overflow-hidden rounded-xl border border-white/10 bg-[#181818] p-4 sm:inset-x-12 sm:bottom-10 sm:top-20 sm:p-6">
        <div className="relative flex h-[65%] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute size-36 rounded-full border border-dashed border-white/25 sm:size-48"
          />
          <motion.div
            animate={{ rotate: -360, scale: [1, 1.08, 1] }}
            transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
            className="flex size-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 sm:size-28"
          >
            <Video className="size-8 text-white sm:size-10" />
          </motion.div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-2 w-1/3 rounded-full bg-white/70" />
          <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ x: ["-100%", "250%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="h-full w-1/3 rounded-full bg-white/70"
            />
          </div>
          <div className="flex justify-between text-[9px] text-white/40">
            <span>00:00</span>
            <span>00:15</span>
            <span>00:30</span>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

export function ServiceVisual({ type }: ServiceVisualProps) {
  switch (type) {
    case "web":
      return <WebVisual />;
    case "mobile":
      return <MobileVisual />;
    case "design":
      return <DesignVisual />;
    case "motion":
      return <MotionVisual />;
    default:
      return <WebVisual />;
  }
}