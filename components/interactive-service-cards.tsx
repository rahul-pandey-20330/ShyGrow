"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

type CardItem = {
  title: string;
  description: string;
};

type InteractiveServiceCardsProps = {
  deliverables: CardItem[];
  process: CardItem[];
};

type ImageDetails = {
  src: string;
  alt: string;
};

const imageMap: Record<string, ImageDetails> = {
  // Web development
  "Business websites": {
    src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1000&q=85",
    alt: "Website displayed on a desktop screen",
  },
  "E-commerce": {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&q=85",
    alt: "Online shopping and digital commerce",
  },
  "Custom web apps": {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=85",
    alt: "Web application analytics dashboard",
  },
  "ERP & CRM": {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=85",
    alt: "Business analytics and management dashboard",
  },
  "Backend & APIs": {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&q=85",
    alt: "Server infrastructure",
  },
  Maintenance: {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&q=85",
    alt: "Team working on software maintenance",
  },

  // Mobile development
  "Android applications": {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1000&q=85",
    alt: "Mobile application on a smartphone",
  },
  "iOS applications": {
    src: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=1000&q=85",
    alt: "Smartphone application interface",
  },
  "Cross-platform apps": {
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1000&q=85",
    alt: "Mobile app development workspace",
  },
  Authentication: {
    src: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1000&q=85",
    alt: "Digital identity and security concept",
  },
  "Testing & release": {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&q=85",
    alt: "Software testing and collaboration",
  },

  // UI/UX and graphic design
  "UX research & flows": {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&q=85",
    alt: "Product research and planning",
  },
  "Website UI design": {
    src: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1000&q=85",
    alt: "Website interface design on a screen",
  },
  "Mobile app UI": {
    src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1000&q=85",
    alt: "Digital interface and visual design",
  },
  "Logo design": {
    src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1000&q=85",
    alt: "Graphic design artwork",
  },
  "Brand identity": {
    src: "https://images.unsplash.com/photo-1634942536790-2534db8a3e20?w=1000&q=85",
    alt: "Branding and visual identity concepts",
  },
  "Interactive prototypes": {
    src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1000&q=85",
    alt: "Digital product interface prototype",
  },

  // Video editing and motion
  "Video editing": {
    src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000&q=85",
    alt: "Video editing workspace",
  },
  "Social media videos": {
    src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1000&q=85",
    alt: "Social media content creation",
  },
  "Motion graphics": {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&q=85",
    alt: "Digital motion graphics and visual effects",
  },
  "Product explainers": {
    src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1000&q=85",
    alt: "Camera and video production equipment",
  },
  "Titles & subtitles": {
    src: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1000&q=85",
    alt: "Video production and editing",
  },
  "Export & revisions": {
    src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000&q=85",
    alt: "Professional post-production studio",
  },

  // Process cards
  "Requirements & scope": {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&q=85",
    alt: "Planning requirements and project scope",
  },
  "Wireframes & architecture": {
    src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1000&q=85",
    alt: "Wireframes and product architecture",
  },
  "Development & testing": {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&q=85",
    alt: "Developer writing and testing software",
  },
  "Deployment & handover": {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&q=85",
    alt: "Project handover and team collaboration",
  },
  "Product discovery": {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&q=85",
    alt: "Product discovery workshop",
  },
  "User flows & prototype": {
    src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1000&q=85",
    alt: "User flow and interface prototyping",
  },
  "App and API development": {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&q=85",
    alt: "Technology and application development",
  },
  "Discovery & direction": {
    src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&q=85",
    alt: "Creative project planning",
  },
  "User flows & wireframes": {
    src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1000&q=85",
    alt: "User flow and wireframe design",
  },
  "Visual design & prototype": {
    src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1000&q=85",
    alt: "Visual design and prototype",
  },
  "Review & handover": {
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&q=85",
    alt: "Team reviewing project deliverables",
  },
  "Brief & references": {
    src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1000&q=85",
    alt: "Creative brief and references",
  },
  "Edit plan & storyboard": {
    src: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1000&q=85",
    alt: "Video storyboard and editing plan",
  },
  "Editing & motion design": {
    src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000&q=85",
    alt: "Video editing and motion design",
  },
  "Review & final export": {
    src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000&q=85",
    alt: "Final video review and export",
  },
};

const fallbackImage: ImageDetails = {
  src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&q=85",
  alt: "Digital product development workspace",
};

function getImage(title: string): ImageDetails {
  return imageMap[title] ?? fallbackImage;
}

function RevealCard({
  item,
  index,
  group,
}: {
  item: CardItem;
  index: number;
  group: "deliverables" | "process";
}) {
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();
  const image = getImage(item.title);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        delay: reduceMotion ? 0 : index * 0.06,
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setActive(false);
        }
      }}
      className="group relative isolate flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-6 text-white outline-none transition-colors duration-300 hover:border-white/25 focus-within:border-white/30"
      tabIndex={0}
      aria-label={`${item.title}. ${item.description}`}
    >
      <AnimatePresence>
        {active && (
          <motion.div
            key={`${group}-${item.title}-image`}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
            className="absolute inset-0 -z-10"
            aria-hidden="true"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-neutral-950/65" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-neutral-950/10" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-start justify-between gap-4">
        <span className="text-xs font-medium uppercase tracking-[0.22em] text-white/45">
          {String(index + 1).padStart(2, "0")}
        </span>

        <motion.span
          animate={{ rotate: active ? 45 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]"
        >
          <ArrowUpRight size={17} aria-hidden="true" />
        </motion.span>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
          {item.title}
        </h3>

        <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
          {item.description}
        </p>

        <motion.p
          animate={{ opacity: active ? 1 : 0.55, x: active ? 0 : -3 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-white/75"
        >
          {active ? "Explore this service" : "Hover to explore"}
        </motion.p>
      </div>
    </motion.article>
  );
}

function CardGrid({
  items,
  group,
}: {
  items: CardItem[];
  group: "deliverables" | "process";
}) {
  if (!items?.length) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <RevealCard
          key={`${group}-${item.title}`}
          item={item}
          index={index}
          group={group}
        />
      ))}
    </div>
  );
}

export function InteractiveServiceCards({
  deliverables,
  process,
}: InteractiveServiceCardsProps) {
  return (
    <div className="space-y-20">
      {deliverables?.length > 0 && (
        <section aria-labelledby="deliverables-heading">
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
              What we can create
            </p>
            <h2
              id="deliverables-heading"
              className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Made for the work you want to put out.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
              Explore the services and deliverables we can tailor to your goals.
              Hover over a card to reveal its visual.
            </p>
          </div>

          <CardGrid items={deliverables} group="deliverables" />
        </section>
      )}

      {process?.length > 0 && (
        <section aria-labelledby="process-heading">
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
              How we work
            </p>
            <h2
              id="process-heading"
              className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              From first conversation to final delivery.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
              A clear process keeps the project focused, collaborative, and
              easier to review at every stage.
            </p>
          </div>

          <CardGrid items={process} group="process" />
        </section>
      )}
    </div>
  );
}