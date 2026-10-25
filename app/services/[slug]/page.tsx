
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Smartphone,
  Palette,
  Clapperboard,
} from "lucide-react";

import { InteractiveServiceCards } from "@/components/interactive-service-cards";
import { CursorFloat } from "@/components/cursor-float";
import { AnimatedNavbar } from "@/components/animated-navbar";
import { MotionSection } from "@/components/motion-section";
import { ProjectPlanner } from "@/components/project-planner";
import {
  ServiceVisual,
  type ServiceVisualType,
} from "@/components/service-visual";

const serviceDetails = {
  "web-development": {
    type: "web",
    number: "01",
    title: "Web & Software Development",
    headline: "Digital products built around your business.",
    description:
      "We design and develop responsive websites and custom software that make complex tasks simpler and help your business grow.",
    Icon: Code2,
    deliverables: [
      [
        "Business websites",
        "Responsive company websites, landing pages and service websites.",
      ],
      [
        "E-commerce",
        "Online stores, product pages, shopping carts and checkout experiences.",
      ],
      [
        "Custom web apps",
        "Dashboards, portals, booking systems and workflow applications.",
      ],
      [
        "ERP & CRM",
        "Business process tools, customer management and reporting dashboards.",
      ],
      [
        "Backend & APIs",
        "Authentication, databases, integrations and API development.",
      ],
      [
        "Maintenance",
        "Bug fixes, performance improvements and ongoing technical support.",
      ],
    ],
    process: [
      "Requirements & scope",
      "Wireframes & architecture",
      "Development & testing",
      "Deployment & handover",
    ],
    faqs: [
      [
        "Will my website work on mobile?",
        "Yes. Responsive layouts for mobile, tablet and desktop are part of the planning and development process.",
      ],
      [
        "Can you integrate a third-party API?",
        "Yes, provided the API is available and its access terms and documentation support the required integration.",
      ],
      [
        "Will I receive the source code?",
        "Source-code handover and ownership terms should be agreed in the project proposal before development starts.",
      ],
    ],
  },

  "mobile-apps": {
    type: "mobile",
    number: "02",
    title: "Mobile App Development",
    headline: "Apps designed for real-world use.",
    description:
      "From the first screen to the backend, we plan mobile experiences around your users, your goals and the way your product will be used.",
    Icon: Smartphone,
    deliverables: [
      [
        "Android applications",
        "Mobile experiences tailored for Android phones and tablets.",
      ],
      [
        "iOS applications",
        "User-focused app experiences for Apple devices.",
      ],
      [
        "Cross-platform apps",
        "Shared-codebase app options where suitable for the project.",
      ],
      [
        "Backend & APIs",
        "Server-side logic, database design and secure API integration.",
      ],
      [
        "Authentication",
        "Login, registration, user profiles and role-based experiences.",
      ],
      [
        "Testing & release",
        "Device testing, bug fixing and release preparation.",
      ],
    ],
    process: [
      "Product discovery",
      "User flows & prototype",
      "App and API development",
      "Testing & release",
    ],
    faqs: [
      [
        "Can the app connect to an existing website?",
        "Yes. We can evaluate your current backend and API capabilities before choosing the integration approach.",
      ],
      [
        "Do you help with app publishing?",
        "Release preparation can be included. Store accounts, fees and approval decisions are subject to the relevant platform policies.",
      ],
      [
        "Can I add features later?",
        "Yes. We can plan the app architecture and delivery in phases so future improvements are easier to scope.",
      ],
    ],
  },

  "ui-ux-branding": {
    type: "design",
    number: "03",
    title: "UI/UX & Brand Design",
    headline: "Make every interaction feel intentional.",
    description:
      "We turn ideas into clear user journeys and memorable visual systems, creating interfaces that feel consistent, useful and unmistakably yours.",
    Icon: Palette,
    deliverables: [
      [
        "UX research & flows",
        "User journeys, information architecture and interaction planning.",
      ],
      [
        "Website UI design",
        "Responsive page layouts and polished interface components.",
      ],
      [
        "Mobile app UI",
        "Mobile screens, navigation patterns and reusable components.",
      ],
      [
        "Logo design",
        "Logo concepts and visual direction aligned with your brand.",
      ],
      [
        "Brand identity",
        "Colour palettes, typography, visual rules and brand assets.",
      ],
      [
        "Interactive prototypes",
        "Clickable prototypes to review user flows before development.",
      ],
    ],
    process: [
      "Discovery & direction",
      "User flows & wireframes",
      "Visual design & prototype",
      "Review & handover",
    ],
    faqs: [
      [
        "Do you provide editable design files?",
        "Editable source files and handover formats can be agreed in your project scope.",
      ],
      [
        "Can you redesign an existing product?",
        "Yes. We can review your current interface, identify usability issues and propose a redesign.",
      ],
      [
        "Can you also build the design?",
        "Yes. UI/UX can be paired with web or mobile development if you want a design-to-build workflow.",
      ],
    ],
  },

  "video-motion": {
    type: "motion",
    number: "04",
    title: "Video Editing & Motion",
    headline: "Give your story movement and meaning.",
    description:
      "We help shape raw footage and ideas into engaging visual stories for brands, campaigns, products and social platforms.",
    Icon: Clapperboard,
    deliverables: [
      [
        "Video editing",
        "Footage selection, sequencing, pacing and polished final cuts.",
      ],
      [
        "Social media videos",
        "Short-form content adapted to the requirements of each platform.",
      ],
      [
        "Motion graphics",
        "Animated text, shapes, transitions and graphic elements.",
      ],
      [
        "Product explainers",
        "Visual walkthroughs and explainer-style storytelling.",
      ],
      [
        "Titles & subtitles",
        "Title treatments, captions and on-screen text.",
      ],
      [
        "Export & revisions",
        "Delivery formats and revision rounds defined in the project scope.",
      ],
    ],
    process: [
      "Brief & references",
      "Edit plan & storyboard",
      "Editing & motion design",
      "Review & final export",
    ],
    faqs: [
      [
        "What footage should I provide?",
        "Share available footage, logos, brand assets, reference videos and your intended audience.",
      ],
      [
        "Can you make vertical videos?",
        "Yes. Aspect ratios and export formats can be planned for the platforms you want to use.",
      ],
      [
        "How many revisions are included?",
        "The number of revision rounds should be confirmed in your project estimate before work begins.",
      ],
    ],
  },
} as const satisfies Record<
  string,
  {
    type: ServiceVisualType;
    number: string;
    title: string;
    headline: string;
    description: string;
    Icon: typeof Code2;
    deliverables: readonly (readonly [string, string])[];
    process: readonly string[];
    faqs: readonly (readonly [string, string])[];
  }
>;

type ServiceSlug = keyof typeof serviceDetails;

type PageProps = {
  params: Promise<{ slug: string }>;
};

const processDescriptions: Record<string, string> = {
  "Requirements & scope":
    "We clarify your goals, audience, requirements and project boundaries before work begins.",
  "Wireframes & architecture":
    "We plan the information structure, user experience and technical foundation.",
  "Development & testing":
    "We build the solution, test important flows and resolve issues along the way.",
  "Deployment & handover":
    "We prepare the final release and agree on documentation and handover.",
  "Product discovery":
    "We explore the product goals, target users and key features.",
  "User flows & prototype":
    "We map the main journeys and create a prototype to validate the experience.",
  "App and API development":
    "We develop the app experience and connect the required backend services.",
  "Testing & release":
    "We test key devices and flows, fix issues and prepare for release.",
  "Discovery & direction":
    "We align on the brand, audience, project goals and visual direction.",
  "User flows & wireframes":
    "We organise the experience into clear journeys and interface structures.",
  "Visual design & prototype":
    "We refine the visual system and prepare a prototype for review.",
  "Review & handover":
    "We collect feedback, finalise the deliverables and prepare the agreed handover.",
  "Brief & references":
    "We review the creative brief, reference material, audience and desired outcome.",
  "Edit plan & storyboard":
    "We organise the story, sequence, pacing and key visual moments.",
  "Editing & motion design":
    "We refine footage, add motion and shape the final visual narrative.",
  "Review & final export":
    "We review the final cut and prepare the agreed export formats.",
};

export function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!Object.prototype.hasOwnProperty.call(serviceDetails, slug)) {
    return {
      title: "Service Not Found | ShyGrow",
      description: "Explore services from ShyGrow.",
      robots: { index: false, follow: false },
    };
  }

  const service = serviceDetails[slug as ServiceSlug];

  return {
    title: `${service.title} | ShyGrow`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;

  if (!Object.prototype.hasOwnProperty.call(serviceDetails, slug)) {
    notFound();
  }

  const service = serviceDetails[slug as ServiceSlug];
  const Icon = service.Icon;

  const deliverables = service.deliverables.map(([title, description]) => ({
    title,
    description,
  }));

  const process = service.process.map((title) => ({
    title,
    description:
      processDescriptions[title] ??
      "We work through this stage collaboratively and confirm the deliverables before moving forward.",
  }));

  return (
    <main className="service-detail-page">
      <AnimatedNavbar />

      <section className="service-detail-hero">
        <div className="service-detail-grid-bg" aria-hidden="true" />

        <div className="service-detail-hero-inner">
          <MotionSection className="service-detail-copy">
            <Link href="/#services" className="back-link">
              <ArrowLeft size={16} aria-hidden="true" />
              All services
            </Link>

            <div className="eyebrow">
              <span className="status-dot" aria-hidden="true" />
              SERVICE {service.number} / 04
            </div>

            <div className="service-detail-icon" aria-hidden="true">
              <Icon size={22} />
            </div>

            <h1>{service.headline}</h1>
            <p>{service.description}</p>

            <div className="hero-actions">
              <Link href="#project-planner" className="button-primary">
                Plan your project
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>

              <Link href="#deliverables" className="button-secondary">
                Explore deliverables
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </MotionSection>

          <MotionSection className="service-detail-art">
            <CursorFloat className="h-full w-full">
              <ServiceVisual type={service.type} />
            </CursorFloat>
          </MotionSection>
        </div>
      </section>

      <section className="section" id="deliverables">
        <InteractiveServiceCards
          deliverables={deliverables}
          process={process}
        />
      </section>

      <section className="section service-faq">
        <div className="section-kicker">
          <span>03</span>
          COMMON QUESTIONS
        </div>

        <div className="section-heading-row">
          <h2 className="section-title">
            Good questions.
            <br />
            <span>Clear answers.</span>
          </h2>

          <div className="service-faq-list">
            {service.faqs.map(([question, answer]) => (
              <details key={question} className="service-faq-item">
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section service-planner" id="project-planner">
        <div className="section-kicker">
          <span>04</span>
          LET&apos;S PLAN IT
        </div>

        <h2 className="section-title">
          Your idea. Your goals.
          <br />
          <span>A clear next step.</span>
        </h2>

        <p className="section-intro">
          Share what you need and explore an initial project estimate.
          Final pricing and timelines depend on the agreed scope.
        </p>

        <ProjectPlanner service={slug} />
      </section>

      <section className="service-bottom-cta">
        <div>
          <span className="section-kicker">
            HAVE SOMETHING ELSE IN MIND?
          </span>
          <h2>Let&apos;s find the right solution.</h2>
        </div>

        <Link href="/#contact" className="button-primary">
          Talk to our studio
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </section>

      <footer className="site-footer">
        <Link href="/" className="brand" aria-label="ShyGrow home">
          <span className="brand-mark">S</span>
          <span className="brand-name">ShyGrow</span>
        </Link>

        <p>Digital ideas, thoughtfully made.</p>

        <div className="footer-links">
          <Link href="/#services">Services</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </div>

        <span className="footer-copy">
          © {new Date().getFullYear()} ShyGrow
        </span>
      </footer>
    </main>
  );
}
