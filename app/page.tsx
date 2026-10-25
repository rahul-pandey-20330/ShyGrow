
import { AnimatedImagePanel } from "@/components/animated-image-panel";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Smartphone,
  Palette,
  Clapperboard,
  Layers3,
  Zap,
  ShieldCheck,
  Lightbulb,
  CheckCircle2,
  Mail,
  Sparkles,
} from "lucide-react";
import { AnimatedNavbar } from "@/components/animated-navbar";
import { HeroSection } from "@/components/hero-section";
import { MotionSection } from "@/components/motion-section";
import { ServiceVisual } from "@/components/service-visual";

const services = [
  {
    number: "01",
    title: "Web & Software Development",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
    description:
      "Business websites, custom dashboards, ERP, CRM and scalable web applications.",
    tags: ["Websites", "ERP / CRM", "Web apps"],
    slug: "web-development",
    type: "web" as const,
    Icon: Code2,
  },
  {
    number: "02",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85",
    title: "Mobile App Development",
    description:
      "Intuitive Android and iOS experiences connected to reliable backend systems.",
    tags: ["Android", "iOS", "API integration"],
    slug: "mobile-apps",
    type: "mobile" as const,
    Icon: Smartphone,
  },
  {
    number: "03",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=85",
    title: "UI/UX & Brand Design",
    description:
      "Distinctive visual identities, polished interfaces and thoughtful user journeys.",
    tags: ["UI/UX", "Branding", "Prototypes"],
    slug: "ui-ux-branding",
    type: "design" as const,
    Icon: Palette,
  },
  {
    number: "04",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=85",
    title: "Video Editing & Motion",
    description:
      "Engaging edits, motion graphics and visual storytelling for digital platforms.",
    tags: ["Video editing", "Animation", "Motion"],
    slug: "video-motion",
    type: "motion" as const,
    Icon: Clapperboard,
  },
];

const projects = [
  {
    number: "01",
    title: "Digital platforms",
    category: "WEB DEVELOPMENT",
    style: "work-purple",
    label: "From idea to interface",
  },
  {
    number: "02",
    title: "Mobile experiences",
    category: "APP DEVELOPMENT",
    style: "work-green",
    label: "Small screen. Big ideas.",
  },
  {
    number: "03",
    title: "Visual identities",
    category: "BRAND & DESIGN",
    style: "work-orange",
    label: "Made to be remembered",
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    description:
      "We learn about your business, users, goals and what success looks like.",
    Icon: Lightbulb,
  },
  {
    number: "02",
    title: "Design",
    description:
      "We shape the user journey, visual direction and a clear project plan.",
    Icon: Layers3,
  },
  {
    number: "03",
    title: "Build",
    description:
      "We develop, test and refine the experience with regular feedback.",
    Icon: Code2,
  },
  {
    number: "04",
    title: "Launch",
    description:
      "We prepare your project for launch and help you plan what comes next.",
    Icon: Zap,
  },
];

export default function HomePage() {
  return (
    <main id="home">
      <AnimatedNavbar />
      <HeroSection />

      <section className="trust-strip" aria-label="Our approach">
        <span>BUILT WITH PURPOSE</span>
        <i />
        <span>DESIGNED FOR PEOPLE</span>
        <i />
        <span>ENGINEERED TO SCALE</span>
        <i />
        <span>MADE TO MAKE AN IMPACT</span>
      </section>

      <section className="section services-section" id="services">
        <div className="section-heading">
          <MotionSection className="section-kicker">
            <span>01</span> WHAT WE DO
          </MotionSection>

          <div className="section-heading-row">
            <MotionSection>
              <h2 className="section-title">
                Good ideas deserve
                <br />
                <span>great execution.</span>
              </h2>
            </MotionSection>

            <MotionSection>
              <p className="section-intro">
                From the first sketch to the final launch, we bring strategy,
                design and technology together to move your business forward.
              </p>
            </MotionSection>
          </div>
        </div>

        <div className="services-grid">
          {services.map(
            (
              { number, title, description, tags, slug, type, Icon },
              index
            ) => (
              <MotionSection
                key={slug}
                className="service-card-wrap"
                delay={index * 0.06}
              >
                <Link href={`/services/${slug}`} className="service-card">
                  <div className="service-card-top">
                    <span className="service-number">{number} / 04</span>
                    <span className="service-card-icon">
                      <Icon size={19} />
                    </span>
                  </div>

                  <ServiceVisual type={type} />

                  <div className="service-card-copy">
                    <h3>{title}</h3>
                    <p>{description}</p>

                    <div className="service-tags">
                      {tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="service-card-bottom">
                    <span>Explore service</span>
                    <ArrowUpRight size={19} />
                  </div>
                </Link>
              </MotionSection>
            )
          )}
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-heading">
          <div className="section-kicker">
            <span>02</span> SELECTED CAPABILITIES
          </div>

          <div className="section-heading-row">
            <h2 className="section-title">
              Digital, with a
              <br />
              <span>point of view.</span>
            </h2>

            <p className="section-intro">
              Every project has a different challenge. We create thoughtful
              solutions instead of one-size-fits-all templates.
            </p>
          </div>
        </div>

        <div className="work-grid">
          {projects.map((project) => (
            <article className="work-card" key={project.number}>
              <div className={`work-art ${project.style}`}>
                <span className="work-art-label">{project.category}</span>

                <div className="work-art-shape">
                  <span>{project.number}</span>
                </div>

                <span className="work-art-caption">{project.label}</span>
              </div>

              <div className="work-card-footer">
                <div>
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                </div>
                <ArrowUpRight size={20} />
              </div>
            </article>
          ))}
        </div>

        <p className="work-note">
          These are capability previews, not claims of completed client
          projects.
        </p>
      </section>

      <section className="section process-section" id="process">
        <div className="section-heading">
          <div className="section-kicker">
            <span>03</span> HOW WE WORK
          </div>

          <div className="section-heading-row">
            <h2 className="section-title">
              Clear steps.
              <br />
              <span>Better outcomes.</span>
            </h2>

            <p className="section-intro">
              A collaborative process that keeps you informed, involved and
              confident from kickoff to delivery.
            </p>
          </div>
        </div>

        <div className="process-grid">
          {process.map(({ number, title, description, Icon }) => (
            <article className="process-card" key={number}>
              <div className="process-card-top">
                <span>{number}</span>
                <Icon size={21} />
              </div>

              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-glow" aria-hidden="true" />

        <div className="about-content">
          <div className="section-kicker">
            <span>04</span> A LITTLE ABOUT US
          </div>

          <h2>
            Not just another
            <br />
            digital agency<span>.</span>
          </h2>

          <p className="about-lead">
            We believe the best digital products balance imagination with
            intention.
          </p>

          <p className="about-copy">
            ShyGrow brings design thinking and practical engineering together
            to help businesses turn complex ideas into clear, useful digital
            experiences. We value communication, thoughtful details and
            building things that solve real problems.
          </p>

          <div className="about-values">
            <span>
              <CheckCircle2 size={17} /> Thoughtful by design
            </span>
            <span>
              <CheckCircle2 size={17} /> Clear communication
            </span>
            <span>
              <CheckCircle2 size={17} /> Built around your goals
            </span>
          </div>
        </div>

        <div className="about-side-card">
          <div className="about-side-icon">
            <Sparkles size={26} />
          </div>

          <span>OUR APPROACH</span>

          <h3>
            Good work
            <br />
            starts with
            <br />
            <em>good questions.</em>
          </h3>

          <p>We listen first. Then we make a plan worth building.</p>
          <ArrowDownRight size={25} />
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-glow" aria-hidden="true" />

        <div className="contact-copy">
          <div className="section-kicker">
            <span>05</span> YOUR NEXT PROJECT
          </div>

          <h2>
            Have an idea?
            <br />
            <span>Let&apos;s make it real.</span>
          </h2>

          <p>
            Tell us what you have in mind. We&apos;ll help you figure out the
            next step.
          </p>

          <a
            href="mailto:shygrow123@gmail.com"
            className="contact-email"
          >
            <Mail size={18} />
            shygrow123@gmail.com
            <ArrowUpRight size={17} />
          </a>

          <a
            href="tel:+919876543210"
            className="contact-email"
          >
            +91 9876543210
          </a>

          <a
            href="tel:+918765432109"
            className="contact-email"
          >
            +91 8765432109
          </a>
        </div>

        <div className="contact-action-card">
          <div className="contact-action-icon">
            <ArrowUpRight size={24} />
          </div>

          <h3>
            Let&apos;s talk about
            <br />
            what you&apos;re building.
          </h3>

          <p>
            Share a few details and explore the right service for your goals.
          </p>

          <Link
            href="/services/web-development#project-planner"
            className="button-primary"
          >
            Plan your project <ArrowRight size={18} />
          </Link>

          <span className="contact-card-foot">
            <ShieldCheck size={15} /> No pressure. Just a conversation.
          </span>
        </div>
      </section>

      <footer className="site-footer">
        <Link href="/" className="brand footer-brand">
          <span className="brand-mark">S</span>
          <span className="brand-name">ShyGrow</span>
        </Link>

        <p>Digital ideas, thoughtfully made.</p>

        <div className="footer-links">
          <Link href="#services">Services</Link>
          <Link href="#work">Work</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
        </div>

        <span className="footer-copy">
          © {new Date().getFullYear()} ShyGrow
        </span>
      </footer>
    </main>
  );
}
