
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
];

export function AnimatedNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="navbar-shell">
      <nav className="site-navbar" aria-label="Main navigation">
        <Link
          href="/"
          className="brand"
          aria-label="ShyGrow home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-mark">S</span>
          <span className="brand-name">ShyGrow</span>
        </Link>

        <div className={`navbar-links ${menuOpen ? "is-open" : ""}`}>
          {navLinks.map((item) => {
            const active =
              isHome && item.href === "/#services"
                ? false
                : !isHome &&
                  pathname.startsWith("/services") &&
                  item.label === "Services";

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`navbar-link ${active ? "is-active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/#contact"
            className="nav-mobile-cta"
            onClick={() => setMenuOpen(false)}
          >
            Let&apos;s talk <ArrowUpRight size={16} />
          </Link>
        </div>

        <Link href="/#contact" className="navbar-cta">
          <span>Start a project</span>
          <ArrowUpRight size={17} />
        </Link>

        <button
          type="button"
          className="navbar-menu-toggle"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>
    </header>
  );
}
