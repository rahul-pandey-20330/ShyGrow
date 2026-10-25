"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Code2,
  Smartphone,
  Palette,
  Clapperboard,
  Sparkles,
} from "lucide-react";

export type ServiceType = "web" | "mobile" | "design" | "motion";

type Deliverable = readonly [title: string, description: string];

type DeliverableCardsProps = {
  deliverables: readonly Deliverable[];
  serviceType: ServiceType;
};

const visualConfig = {
  web: {
    label: "WEB EXPERIENCE",
    accent: "dc-web",
    Icon: Code2,
    badge: "Built to perform",
  },
  mobile: {
    label: "MOBILE EXPERIENCE",
    accent: "dc-mobile",
    Icon: Smartphone,
    badge: "Made for people",
  },
  design: {
    label: "DESIGN SYSTEM",
    accent: "dc-design",
    Icon: Palette,
    badge: "Designed with intent",
  },
  motion: {
    label: "MOTION STUDIO",
    accent: "dc-motion",
    Icon: Clapperboard,
    badge: "Stories in motion",
  },
} satisfies Record<
  ServiceType,
  {
    label: string;
    accent: string;
    Icon: typeof Code2;
    badge: string;
  }
>;

function CardVisual({
  serviceType,
  index,
  title,
  active,
}: {
  serviceType: ServiceType;
  index: number;
  title: string;
  active: boolean;
}) {
  const config = visualConfig[serviceType];
  const Icon = config.Icon;

  return (
    <div
      className={`dc-visual ${config.accent} ${active ? "is-active" : ""}`}
      aria-hidden="true"
    >
      <div className="dc-visual-top">
        <span className="dc-window-dots">
          <i />
          <i />
          <i />
        </span>

        <span className="dc-visual-label">{config.label}</span>

        <Icon size={15} />
      </div>

      {serviceType === "web" && (
        <div className="dc-web-preview">
          <div className="dc-web-sidebar">
            <span className="dc-web-logo" />
            <span className="dc-web-nav active" />
            <span className="dc-web-nav" />
            <span className="dc-web-nav" />
            <span className="dc-web-nav short" />
          </div>

          <div className="dc-web-main">
            <div className="dc-web-heading">
              <span />
              <span />
            </div>

            <div className="dc-web-stats">
              <div>
                <small>Visitors</small>
                <strong>{(index + 2) * 1.24}k</strong>
              </div>
              <div>
                <small>Growth</small>
                <strong>+{12 + index * 3}%</strong>
              </div>
            </div>

            <div className="dc-web-chart">
              {[35, 55, 42, 72, 48, 85, 63, 96, 70, 100].map(
                (height, barIndex) => (
                  <motion.span
                    key={barIndex}
                    initial={{ height: "10%" }}
                    animate={{
                      height: active ? `${height}%` : `${height * 0.68}%`,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: barIndex * 0.025,
                    }}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {serviceType === "mobile" && (
        <div className="dc-phone-wrap">
          <motion.div
            className="dc-phone"
            animate={{
              rotate: active ? -2 : 2,
              y: active ? -4 : 3,
            }}
            transition={{ duration: 0.35 }}
          >
            <div className="dc-phone-notch" />

            <div className="dc-phone-content">
              <div className="dc-phone-greeting">
                <span />
                <span />
              </div>

              <div className="dc-phone-hero">
                <div className="dc-phone-orb" />
                <span />
                <span />
              </div>

              <div className="dc-phone-section">
                <span />
                <span />
              </div>

              <div className="dc-phone-list">
                <i />
                <span />
                <i />
                <span />
                <i />
                <span />
              </div>

              <div className="dc-phone-tabbar">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="dc-phone-float"
            animate={{ y: active ? -8 : 5, rotate: active ? 5 : -4 }}
            transition={{ duration: 0.4 }}
          >
            <Check size={15} />
            <span>All set</span>
          </motion.div>
        </div>
      )}

      {serviceType === "design" && (
        <div className="dc-design-preview">
          <motion.div
            className="dc-design-orb"
            animate={{
              scale: active ? 1.08 : 1,
              rotate: active ? 18 : 0,
            }}
            transition={{ duration: 0.55 }}
          />

          <div className="dc-design-board">
            <div className="dc-design-wordmark">Aa</div>
            <div className="dc-design-lines">
              <span />
              <span />
              <span />
            </div>
            <div className="dc-design-swatches">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>

          <motion.div
            className="dc-design-chip"
            animate={{ y: active ? -5 : 4 }}
            transition={{ duration: 0.35 }}
          >
            <Sparkles size={13} />
            Brand system
          </motion.div>
        </div>
      )}

      {serviceType === "motion" && (
        <div className="dc-motion-preview">
          <div className="dc-motion-canvas">
            <motion.div
              className="dc-motion-orb"
              animate={{
                x: active ? 28 : -9,
                y: active ? -7 : 8,
                scale: active ? 1.12 : 0.94,
              }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
            />

            <motion.div
              className="dc-motion-square"
              animate={{
                rotate: active ? 48 : 22,
                x: active ? -9 : 7,
              }}
              transition={{ duration: 0.55 }}
            />

            <div className="dc-motion-title">
              <span />
              <span />
            </div>
          </div>

          <div className="dc-motion-timeline">
            <span className="dc-motion-play">▶</span>
            <div>
              {[42, 67, 35, 82, 54, 75, 45].map((width, i) => (
                <motion.i
                  key={i}
                  animate={{
                    opacity: active ? 1 : 0.58,
                    scaleY: active ? 1 : 0.75,
                  }}
                  style={{ width: `${width}%` }}
                  transition={{ duration: 0.3, delay: i * 0.025 }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="dc-visual-bottom">
        <span>{config.badge}</span>
        <span className="dc-live-dot" />
      </div>

      <span className="dc-visual-index">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="dc-visual-title">{title}</span>
    </div>
  );
}

export function DeliverableCards({
  deliverables,
  serviceType,
}: DeliverableCardsProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className={`dc-grid dc-grid-${serviceType}`}>
      {deliverables.map(([title, description], index) => {
        const isActive = activeCard === index;

        return (
          <motion.article
            key={title}
            className={`dc-card ${isActive ? "is-active" : ""}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.45,
              delay: Math.min(index * 0.07, 0.35),
              ease: "easeOut",
            }}
            whileHover={{ y: -7 }}
            whileTap={{ scale: 0.99 }}
            onHoverStart={() => setActiveCard(index)}
            onHoverEnd={() => setActiveCard(null)}
            onFocus={() => setActiveCard(index)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setActiveCard(null);
              }
            }}
            onClick={() =>
              setActiveCard((current) => (current === index ? null : index))
            }
            tabIndex={0}
            role="button"
            aria-expanded={isActive}
            aria-label={`${title}. ${isActive ? "Hide" : "Show"} details`}
          >
            <CardVisual
              serviceType={serviceType}
              index={index}
              title={title}
              active={isActive}
            />

            <div className="dc-card-copy">
              <div className="dc-card-heading">
                <span className="dc-card-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <motion.span
                  className="dc-card-arrow"
                  animate={{
                    x: isActive ? 2 : 0,
                    y: isActive ? -2 : 0,
                    rotate: isActive ? 0 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight size={18} />
                </motion.span>
              </div>

              <h3>{title}</h3>
              <p>{description}</p>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    className="dc-card-extra"
                    initial={{ opacity: 0, height: 0, y: 7 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 5 }}
                    transition={{ duration: 0.22 }}
                  >
                    <span className="dc-card-extra-icon">
                      <Check size={13} />
                    </span>
                    <span>
                      Planned around your goals, audience and project scope.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}