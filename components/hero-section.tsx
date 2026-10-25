
"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;

    const hero = heroRef.current;
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    hero.style.setProperty("--pointer-x", `${x}px`);
    hero.style.setProperty("--pointer-y", `${y}px`);

    if (visualRef.current) {
      const rotateY = (x / rect.width - 0.5) * 9;
      const rotateX = (0.5 - y / rect.height) * 7;

      visualRef.current.style.transform =
        `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  }

  function handlePointerLeave() {
    if (visualRef.current) {
      visualRef.current.style.transform =
        "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    }
  }

  const headline = ["We build", "digital things", "that move you."];

  return (
    <section
      ref={heroRef}
      className="hero-section"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-cursor-glow" aria-hidden="true" />
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="status-dot" />
            DIGITAL STUDIO · AVAILABLE FOR PROJECTS
          </div>

          <h1 className="hero-title">
            {headline.map((line, lineIndex) => (
              <span
                className={`hero-title-line ${
                  lineIndex === 2 ? "hero-title-accent" : ""
                }`}
                key={line}
              >
                {line.split(" ").map((word, wordIndex) => (
                  <span
                    className="hero-word"
                    key={`${lineIndex}-${wordIndex}`}
                  >
                    {word}
                    {wordIndex < line.split(" ").length - 1 ? "\u00a0" : ""}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="hero-description">
            We turn ambitious ideas into high-quality websites, apps and digital
            experiences — built to look sharp, work smoothly and grow with you.
          </p>

          <div className="hero-actions">
            <Link href="#contact" className="button-primary">
              Let&apos;s build something <ArrowUpRight size={18} />
            </Link>

            <Link href="#services" className="button-secondary">
              Explore services <ArrowDownRight size={18} />
            </Link>
          </div>

          <div className="hero-proof">
            <div className="hero-proof-icon">
              <Sparkles size={17} />
            </div>
            <p>
              <strong>Ideas into impact.</strong>
              <span>
                Strategy, design & development under one roof.
              </span>
            </p>
          </div>
        </div>

        <div className="hero-art-wrap">
          <div className="hero-art" ref={visualRef}>
            <div className="art-topbar">
              <div className="art-window-dots">
                <i />
                <i />
                <i />
              </div>

              <span>shygrow / studio</span>

              <span className="art-live">
                <span /> LIVE PREVIEW
              </span>
            </div>

            <div className="art-main">
              <div className="art-side">
                <div className="art-side-logo">S.</div>
                <span className="art-side-line active" />
                <span className="art-side-line" />
                <span className="art-side-line" />
                <span className="art-side-line short" />
              </div>

              <div className="art-dashboard">
                <div className="art-welcome">
                  <div>
                    <span className="art-caption">YOUR NEXT CHAPTER</span>
                    <h3>
                      Made for
                      <br />
                      <em>what&apos;s next.</em>
                    </h3>
                  </div>

                  <div className="art-spark">
                    <Sparkles size={21} />
                  </div>
                </div>

                <div className="art-stat-row">
                  <div className="art-stat">
                    <span>Performance</span>
                    <strong>98.6%</strong>
                    <div className="art-stat-line">
                      <i />
                    </div>
                  </div>

                  <div className="art-stat">
                    <span>Experience</span>
                    <strong>Excellent</strong>
                    <div className="art-stat-line second">
                      <i />
                    </div>
                  </div>
                </div>

                <div className="art-chart">
                  <div className="art-chart-heading">
                    <span>Growth overview</span>
                    <span>+24.8%</span>
                  </div>

                  <div className="art-bars">
                    {[
                      32, 48, 40, 63, 52, 77, 62, 88, 69, 96, 74, 100,
                    ].map((height, i) => (
                      <i
                        key={i}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>

                  <div className="art-chart-labels">
                    <span>JAN</span>
                    <span>MAR</span>
                    <span>MAY</span>
                    <span>JUL</span>
                    <span>SEP</span>
                    <span>DEC</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-chip chip-code">
              <Code2 size={17} />
              <span>
                <strong>Clean code</strong>
                <small>Built to scale</small>
              </span>
            </div>

            <div className="floating-chip chip-design">
              <Layers3 size={17} />
              <span>
                <strong>Fresh design</strong>
                <small>Made for people</small>
              </span>
            </div>

            <div className="art-bottom-note">
              <span className="status-dot" />
              Crafting the next big thing
            </div>
          </div>

          <div className="hero-art-shadow" aria-hidden="true" />
        </div>
      </div>

      <div className="hero-bottom">
        <span>SCROLL TO EXPLORE</span>
        <span className="hero-scroll-line" />
        <span>INDEPENDENT DIGITAL STUDIO · 2026</span>
      </div>
    </section>
  );
}
