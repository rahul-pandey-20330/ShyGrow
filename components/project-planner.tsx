"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Code2,
  Mail,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";

const serviceOptions = [
  { value: "web-development", label: "Web & Software", icon: Code2 },
  { value: "mobile-apps", label: "Mobile Apps", icon: Sparkles },
  { value: "ui-ux-branding", label: "UI/UX & Branding", icon: CheckCircle2 },
  { value: "video-motion", label: "Video & Motion", icon: Clock3 },
];

const featureOptions: Record<string, string[]> = {
  "web-development": [
    "Business website",
    "E-commerce store",
    "Custom dashboard",
    "Backend & APIs",
    "Login & authentication",
    "Database integration",
    "Admin panel",
    "Ongoing maintenance",
  ],
  "mobile-apps": [
    "Android application",
    "iOS application",
    "Cross-platform app",
    "Backend & APIs",
    "Login & user profiles",
    "Push notifications",
    "Payment integration",
    "App release support",
  ],
  "ui-ux-branding": [
    "Website UI/UX",
    "Mobile app UI",
    "Logo design",
    "Brand identity",
    "Design system",
    "Clickable prototype",
    "UX research",
    "Social media assets",
  ],
  "video-motion": [
    "Video editing",
    "Short-form reels",
    "Motion graphics",
    "Product explainer",
    "Titles & subtitles",
    "2D animation",
    "Brand intro",
    "Multiple export formats",
  ],
};

const budgetOptions = [
  { value: "under-25k", label: "Under ₹25,000", min: 10000, max: 25000 },
  { value: "25k-50k", label: "₹25,000–₹50,000", min: 25000, max: 50000 },
  { value: "50k-1l", label: "₹50,000–₹1 lakh", min: 50000, max: 100000 },
  { value: "1l-plus", label: "₹1 lakh+", min: 100000, max: 180000 },
];

const timelineOptions = [
  { value: "urgent", label: "As soon as possible", factor: 1.15 },
  { value: "2-4-weeks", label: "2–4 weeks", factor: 1 },
  { value: "1-2-months", label: "1–2 months", factor: 0.95 },
  { value: "flexible", label: "I'm flexible", factor: 0.9 },
];

const serviceBase: Record<string, number> = {
  "web-development": 22000,
  "mobile-apps": 35000,
  "ui-ux-branding": 12000,
  "video-motion": 8000,
};

const serviceNames: Record<string, string> = {
  "web-development": "Web & Software Development",
  "mobile-apps": "Mobile App Development",
  "ui-ux-branding": "UI/UX & Branding",
  "video-motion": "Video Editing & Motion",
};

const steps = [
  { title: "Your project", subtitle: "Choose the service and features" },
  { title: "Budget & timeline", subtitle: "Set your expectations" },
  { title: "Your details", subtitle: "Tell us how to reach you" },
];

const transition = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.24, ease: "easeOut" as const },
};

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProjectPlanner({
  service = "web-development",
}: {
  service?: string;
}) {
  const initialService = serviceOptions.some((item) => item.value === service)
    ? service
    : "web-development";

  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState(initialService);
  const [features, setFeatures] = useState<string[]>([]);
  const [budget, setBudget] = useState("25k-50k");
  const [timeline, setTimeline] = useState("2-4-weeks");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailWarning, setEmailWarning] = useState("");

  const availableFeatures =
    featureOptions[selectedService] ?? featureOptions["web-development"];

  const estimate = useMemo(() => {
    const selectedBudget = budgetOptions.find(
      (item) => item.value === budget,
    );
    const selectedTimeline = timelineOptions.find(
      (item) => item.value === timeline,
    );

    const base = serviceBase[selectedService] ?? 22000;
    const featureCost = Math.max(0, features.length - 1) * base * 0.12;
    const rawEstimate =
      (base + featureCost) * (selectedTimeline?.factor ?? 1);
    const budgetMin = selectedBudget?.min ?? 25000;
    const budgetMax = selectedBudget?.max ?? 50000;

    return {
      low:
        Math.round(
          Math.max(budgetMin, rawEstimate * 0.85) / 1000,
        ) * 1000,
      high:
        Math.round(
          Math.min(
            budgetMax,
            Math.max(rawEstimate * 1.3, budgetMin * 1.15),
          ) / 1000,
        ) * 1000,
    };
  }, [selectedService, features, budget, timeline]);

  function changeService(nextService: string) {
    setSelectedService(nextService);
    setFeatures([]);
    setError("");
  }

  function toggleFeature(feature: string) {
    setFeatures((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature],
    );
    setError("");
  }

  function nextStep() {
    setError("");

    if (step === 0 && features.length === 0) {
      setError("Please select at least one project feature.");
      return;
    }

    if (step === 1 && !budget) {
      setError("Please select your budget range.");
      return;
    }

    setStep((current) => Math.min(2, current + 1));
  }

  function previousStep() {
    setError("");
    setStep((current) => Math.max(0, current - 1));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");
    setEmailWarning("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedName.length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (features.length === 0) {
      setError("Please select at least one project feature.");
      setStep(0);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          company: company.trim(),
          service: selectedService,
          features,
          budget,
          timeline,
          description: description.trim(),

          // Indicative estimate. The backend must validate/recalculate it
          // before saving or including it in the notification email.
          estimateLow: estimate.low,
          estimateHigh: estimate.high,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            "We couldn't submit your inquiry. Please try again.",
        );
      }

      if (result.emailSent === false) {
        setEmailWarning(
          "Your inquiry was saved, but the email notification could not be sent. Please contact us if you need an immediate response.",
        );
      }

      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        className="planner-success"
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="planner-success-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, -8, 0] }}
          transition={{ type: "spring", stiffness: 180, damping: 12 }}
        >
          <CheckCircle2 size={34} />
        </motion.div>

        <span className="planner-kicker">INQUIRY SUBMITTED</span>
        <h3>Your next big idea starts here.</h3>

        <p>
          Thank you for contacting ShyGrow. Your project inquiry has been
          submitted successfully. Our team will review your requirements
          and get back to you.
        </p>

        {emailWarning && (
          <p className="planner-error" role="status">
            {emailWarning}
          </p>
        )}

        <button
          type="button"
          className="planner-secondary"
          onClick={() => {
            setSubmitted(false);
            setStep(0);
            setError("");
            setEmailWarning("");
          }}
        >
          Edit project details
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="project-planner"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5 }}
    >
      <div className="planner-progress-head">
        <div>
          <span className="planner-kicker">PROJECT BUILDER</span>
          <h3>{steps[step].title}</h3>
          <p>{steps[step].subtitle}</p>
        </div>

        <span className="planner-step-count">
          0{step + 1} <span>/ 03</span>
        </span>
      </div>

      <div
        className="planner-progress-track"
        role="progressbar"
        aria-label="Project planner progress"
        aria-valuemin={1}
        aria-valuemax={3}
        aria-valuenow={step + 1}
      >
        <motion.div
          className="planner-progress-fill"
          animate={{ width: `${((step + 1) / 3) * 100}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>

      <div className="planner-step-dots" aria-hidden="true">
        {steps.map((item, index) => (
          <div
            key={item.title}
            className={
              index <= step
                ? "planner-step-dot active"
                : "planner-step-dot"
            }
          >
            <span>{index < step ? <Check size={13} /> : index + 1}</span>
            <small>{item.title}</small>
          </div>
        ))}
      </div>

      <form className="planner-form" onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="project"
              {...transition}
              className="planner-panel"
            >
              <label className="planner-label">
                What are we creating?
              </label>

              <div className="planner-service-options">
                {serviceOptions.map((option) => {
                  const OptionIcon = option.icon;
                  const active = selectedService === option.value;

                  return (
                    <motion.button
                      key={option.value}
                      type="button"
                      className={
                        active
                          ? "planner-service-option active"
                          : "planner-service-option"
                      }
                      onClick={() => changeService(option.value)}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      aria-pressed={active}
                    >
                      <OptionIcon size={20} />
                      <span>{option.label}</span>
                      <span className="planner-option-check">
                        {active && <Check size={14} />}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="planner-divider" />

              <div className="planner-label-row">
                <label className="planner-label">
                  Choose the features you need
                </label>
                <span>{features.length} selected</span>
              </div>

              <div className="planner-feature-list">
                {availableFeatures.map((feature, index) => {
                  const active = features.includes(feature);

                  return (
                    <motion.button
                      key={feature}
                      type="button"
                      className={
                        active
                          ? "planner-feature active"
                          : "planner-feature"
                      }
                      onClick={() => toggleFeature(feature)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.025 }}
                      aria-pressed={active}
                    >
                      <span className="planner-feature-check">
                        {active && <Check size={13} />}
                      </span>
                      {feature}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="budget"
              {...transition}
              className="planner-panel"
            >
              <label className="planner-label">
                What budget range are you comfortable with?
              </label>

              <div className="planner-budget-options">
                {budgetOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    className={
                      budget === option.value
                        ? "planner-budget-option active"
                        : "planner-budget-option"
                    }
                    onClick={() => setBudget(option.value)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.985 }}
                    aria-pressed={budget === option.value}
                  >
                    <CircleDollarSign size={20} />
                    <span>{option.label}</span>
                    <span className="planner-option-check">
                      {budget === option.value && <Check size={14} />}
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className="planner-divider" />

              <label className="planner-label">
                When would you like to start?
              </label>

              <div className="planner-timeline-options">
                {timelineOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={
                      timeline === option.value
                        ? "planner-timeline-option active"
                        : "planner-timeline-option"
                    }
                    onClick={() => setTimeline(option.value)}
                    aria-pressed={timeline === option.value}
                  >
                    <span className="planner-radio">
                      {timeline === option.value && <i />}
                    </span>
                    {option.label}
                  </button>
                ))}
              </div>

              <motion.div
                className="planner-estimate"
                key={`${estimate.low}-${estimate.high}`}
                initial={{ opacity: 0.6, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="planner-estimate-heading">
                  <span>INITIAL PROJECT RANGE</span>
                  <Sparkles size={17} />
                </div>

                <strong>
                  {formatINR(estimate.low)} – {formatINR(estimate.high)}
                </strong>

                <p>
                  This is a planning estimate, not a fixed quote. Final
                  pricing depends on scope, complexity and agreed deliverables.
                </p>
              </motion.div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="details"
              {...transition}
              className="planner-panel"
            >
              <div className="planner-review">
                <div>
                  <span>PROJECT</span>
                  <strong>{serviceNames[selectedService]}</strong>
                </div>

                <button type="button" onClick={() => setStep(0)}>
                  Edit
                </button>

                <div>
                  <span>FEATURES</span>
                  <strong>{features.join(", ")}</strong>
                </div>

                <div>
                  <span>BUDGET & TIMELINE</span>
                  <strong>
                    {budgetOptions.find((item) => item.value === budget)?.label}
                    {" · "}
                    {
                      timelineOptions.find(
                        (item) => item.value === timeline,
                      )?.label
                    }
                  </strong>
                </div>

                <div className="planner-review-estimate">
                  <span>INDICATIVE ESTIMATE</span>
                  <strong>
                    {formatINR(estimate.low)} – {formatINR(estimate.high)}
                  </strong>
                </div>
              </div>

              <div className="planner-divider" />

              <div className="planner-field-grid">
                <div className="planner-field-wrap">
                  <label htmlFor="planner-name">
                    <UserRound size={15} /> Your name *
                  </label>
                  <input
                    id="planner-name"
                    className="planner-field"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                    autoComplete="name"
                    minLength={2}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="planner-field-wrap">
                  <label htmlFor="planner-email">
                    <Mail size={15} /> Email address *
                  </label>
                  <input
                    id="planner-email"
                    className="planner-field"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </div>

                <div className="planner-field-wrap planner-field-full">
                  <label htmlFor="planner-company">
                    Company / brand (optional)
                  </label>
                  <input
                    id="planner-company"
                    className="planner-field"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="Your company or brand name"
                    autoComplete="organization"
                    maxLength={150}
                  />
                </div>

                <div className="planner-field-wrap planner-field-full">
                  <label htmlFor="planner-description">
                    Tell us about your idea
                  </label>
                  <textarea
                    id="planner-description"
                    className="planner-field planner-textarea"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="What problem are you solving? Any features, references or goals?"
                    rows={4}
                    maxLength={5000}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.p
            className="planner-error"
            role="alert"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.p>
        )}

        <div className="planner-navigation">
          {step > 0 ? (
            <button
              type="button"
              className="planner-secondary"
              onClick={previousStep}
              disabled={isSubmitting}
            >
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <span className="planner-privacy-note">
              <CheckCircle2 size={15} />
              No commitment required
            </span>
          )}

          {step < 2 ? (
            <motion.button
              type="button"
              className="planner-submit"
              onClick={nextStep}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue <ArrowRight size={17} />
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              className="planner-submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? undefined : { y: -2 }}
              whileTap={isSubmitting ? undefined : { scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  Submitting... <Clock3 size={16} />
                </>
              ) : (
                <>
                  Submit enquiry <Send size={16} />
                </>
              )}
            </motion.button>
          )}
        </div>

        <p className="planner-disclaimer">
          Your estimate is indicative only. The final scope, price and delivery
          schedule will be confirmed after discussion.
        </p>
      </form>
    </motion.div>
  );
}
