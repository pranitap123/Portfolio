"use client";

import { useRef, useState, useId } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  contactMethods,
  availability,
  faqs,
  subjectOptions,
  type SubjectOption,
} from "@/lib/data/contact";

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const FADE_UP = {
  hidden: { opacity: 0, y: 14 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: d },
  }),
};

// ─── Types ────────────────────────────────────────────────────────────────────

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormFields {
  name: string;
  email: string;
  subject: SubjectOption;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validateForm(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim() || fields.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "Enter a valid email address.";
  if (!fields.message.trim() || fields.message.trim().length < 20)
    errors.message = "Message must be at least 20 characters.";
  return errors;
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[10px] font-mono tracking-widest uppercase text-[#C5A880]/70 border border-[#C5A880]/20 bg-[#C5A880]/5 px-3 py-1 rounded-sm">
      {children}
    </span>
  );
}

function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      variants={FADE_UP}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-[#080808] text-white antialiased">
        <ContactHero />
        <MainGrid />
        <AvailabilitySection />
        <FAQSection />
        <CTAFooter />
        <PageFooter />
      </main>
    </>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/[0.06] bg-[#080808]/80 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C5A880] focus:text-black focus:text-sm focus:font-medium focus:rounded-sm"
      >
        Skip to main content
      </a>
      <div className="max-w-5xl mx-auto h-full px-6 md:px-12 lg:px-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold text-white tracking-tight hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
        >
          Pranita Panchal
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            {[
              { href: "/projects",    label: "Projects"    },
              { href: "/engineering", label: "Engineering" },
              { href: "/about",       label: "About"       },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                aria-current="page"
                className="text-sm font-medium text-black bg-white px-4 py-1.5 rounded-sm hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ContactHero() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="relative pt-32 pb-16 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%,black 30%,transparent 100%)",
        }}
      />
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-6"
        >
          <SectionLabel>Get in touch</SectionLabel>
        </motion.div>

        <motion.h1
          id="contact-heading"
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={0.08}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.06] mb-6"
        >
          Let&rsquo;s Build
          <br />
          <span className="text-white/35">Something Great</span>
        </motion.h1>

        <motion.p
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={0.16}
          className="text-base sm:text-lg text-white/45 max-w-xl leading-relaxed"
        >
          Whether you&rsquo;re a recruiter with a backend role, a founder with a
          system to architect, or an engineer looking to collaborate — reach out.
          I respond to every serious enquiry within 24 hours.
        </motion.p>
      </div>
    </section>
  );
}

// ─── Main grid: form + contact cards ─────────────────────────────────────────

function MainGrid() {
  return (
    <section
      aria-label="Contact form and contact methods"
      className="py-16 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-start">
        <ContactForm />
        <div className="flex flex-col gap-6">
          <ContactCards />
        </div>
      </div>
    </section>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const nameId    = useId();
  const emailId   = useId();
  const subjectId = useId();
  const messageId = useId();

  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    subject: "Job Opportunity",
    message: "",
  });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [status, setStatus]   = useState<FormStatus>("idle");

  function handleChange<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    const next = { ...fields, [key]: value };
    setFields(next);
    if (touched[key]) {
      const e = validateForm(next);
      setErrors((prev) => ({ ...prev, [key]: e[key as keyof FormErrors] }));
    }
  }

  function handleBlur(key: keyof FormErrors) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const e = validateForm(fields);
    setErrors((prev) => ({ ...prev, [key]: e[key] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const e2 = validateForm(fields);
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;

    setStatus("loading");
    try {
      // POST to /api/contact when backend is ready.
      // Simulated delay for demonstration.
      await new Promise((resolve) => setTimeout(resolve, 1400));
      // Swap the above for:
      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(fields),
      // });
      // if (!res.ok) throw new Error("Send failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setFields({ name: "", email: "", subject: "Job Opportunity", message: "" });
    setErrors({});
    setTouched({});
    setStatus("idle");
  }

  const inputBase =
    "w-full bg-white/[0.03] border rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/22 font-mono focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-[#C5A880]/40 transition-colors";

  const inputBorder = (key?: keyof FormErrors) =>
    key && errors[key] ? "border-red-500/40" : "border-white/[0.09] hover:border-white/14";

  return (
    <RevealBlock>
      <div className="mb-8">
        <SectionLabel>Send a message</SectionLabel>
        <h2 className="text-2xl font-semibold text-white tracking-tight mt-4">
          Start a conversation
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="border border-emerald-400/25 bg-emerald-400/[0.05] rounded-sm p-8 text-center"
            role="status"
            aria-live="polite"
          >
            <div className="w-10 h-10 rounded-full border border-emerald-400/30 bg-emerald-400/10 flex items-center justify-center mx-auto mb-4">
              <CheckIcon className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Message sent</h3>
            <p className="text-sm text-white/45 mb-6 leading-relaxed">
              Thanks for reaching out. I&rsquo;ll get back to you within 24 hours.
            </p>
            <button
              onClick={reset}
              className="text-sm text-white/40 border border-white/[0.09] px-5 py-2.5 rounded-sm hover:border-white/20 hover:text-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label htmlFor={nameId} className="block text-xs font-mono text-white/45 mb-2">
                Name <span className="text-[#C5A880]/60" aria-hidden="true">*</span>
              </label>
              <input
                id={nameId}
                type="text"
                autoComplete="name"
                value={fields.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder="Your full name"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? `${nameId}-error` : undefined}
                className={`${inputBase} ${inputBorder("name")}`}
              />
              {errors.name && (
                <p id={`${nameId}-error`} role="alert" className="mt-1.5 text-[11px] text-red-400/80 font-mono">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor={emailId} className="block text-xs font-mono text-white/45 mb-2">
                Email <span className="text-[#C5A880]/60" aria-hidden="true">*</span>
              </label>
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="you@company.com"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? `${emailId}-error` : undefined}
                className={`${inputBase} ${inputBorder("email")}`}
              />
              {errors.email && (
                <p id={`${emailId}-error`} role="alert" className="mt-1.5 text-[11px] text-red-400/80 font-mono">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label htmlFor={subjectId} className="block text-xs font-mono text-white/45 mb-2">
                Subject
              </label>
              <select
                id={subjectId}
                value={fields.subject}
                onChange={(e) => handleChange("subject", e.target.value as SubjectOption)}
                className={`${inputBase} ${inputBorder()} cursor-pointer`}
              >
                {subjectOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#111] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor={messageId} className="block text-xs font-mono text-white/45 mb-2">
                Message <span className="text-[#C5A880]/60" aria-hidden="true">*</span>
              </label>
              <textarea
                id={messageId}
                rows={6}
                value={fields.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                placeholder="Describe the role, project, or what you'd like to discuss..."
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? `${messageId}-error` : undefined}
                className={`${inputBase} resize-none leading-relaxed ${inputBorder("message")}`}
              />
              <div className="flex items-start justify-between mt-1.5 gap-3">
                {errors.message ? (
                  <p id={`${messageId}-error`} role="alert" className="text-[11px] text-red-400/80 font-mono">
                    {errors.message}
                  </p>
                ) : (
                  <span />
                )}
                <span className="text-[10px] font-mono text-white/20 shrink-0">
                  {fields.message.length}/1000
                </span>
              </div>
            </div>

            {/* Error banner */}
            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  role="alert"
                  className="flex items-start gap-3 p-4 border border-red-500/25 bg-red-500/[0.05] rounded-sm"
                >
                  <AlertIcon className="w-4 h-4 text-red-400/70 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-red-400/80 mb-0.5">Failed to send</p>
                    <p className="text-xs text-white/38">
                      Something went wrong. Please try emailing directly at{" "}
                      <a
                        href="mailto:pranitapanchal339@gmail.com"
                        className="text-[#C5A880]/70 underline underline-offset-2 hover:text-[#C5A880] transition-colors"
                      >
                        pranitapanchal.dev@gmail.com
                      </a>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full inline-flex items-center justify-center gap-2.5 bg-white text-black text-sm font-medium py-3 px-6 rounded-sm hover:bg-white/90 active:bg-white/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {status === "loading" ? (
                <>
                  <SpinnerIcon className="w-4 h-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <p className="text-[11px] text-white/22 text-center font-mono">
              I reply to all serious enquiries within 24 business hours.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </RevealBlock>
  );
}

// ─── Contact cards ────────────────────────────────────────────────────────────

function ContactCards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref}>
      <div className="mb-6">
        <SectionLabel>Direct contact</SectionLabel>
        <h2 className="text-xl font-semibold text-white tracking-tight mt-4">
          Reach out directly
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {contactMethods.map((method, i) => {
          const Comp = method.external || method.href.startsWith("mailto:")
            ? "a"
            : Link;
          const extraProps =
            method.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {};

          return (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.07 * i, ease: EASE }}
            >
              <Comp
                href={method.href}
                {...extraProps}
                className="group flex items-start gap-4 p-5 border border-white/[0.08] rounded-sm bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/14 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black block"
              >
                <div className="shrink-0 w-9 h-9 rounded-sm border border-white/[0.09] bg-white/[0.03] flex items-center justify-center group-hover:border-[#C5A880]/25 group-hover:bg-[#C5A880]/[0.05] transition-colors">
                  <ContactMethodIcon id={method.id} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-xs font-mono font-semibold text-white/45 uppercase tracking-widest">
                      {method.label}
                    </span>
                    <ExternalArrowIcon className="w-3 h-3 text-white/18 group-hover:text-white/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>
                  <div className="text-sm text-white/65 font-mono truncate group-hover:text-white/85 transition-colors">
                    {method.value}
                  </div>
                  <div className="text-[11px] text-white/28 mt-1 leading-relaxed">
                    {method.description}
                  </div>
                </div>
              </Comp>
            </motion.div>
          );
        })}
      </div>

      {/* Response time note */}
      <div className="mt-5 flex items-start gap-2.5 px-4 py-3.5 border border-white/[0.06] rounded-sm bg-white/[0.01]">
        <ClockIcon className="w-3.5 h-3.5 text-[#C5A880]/50 mt-0.5 shrink-0" />
        <p className="text-xs text-white/35 leading-relaxed">
          Based in <span className="text-white/55">Pune, IST (UTC+5:30)</span>. Available for
          cross-timezone meetings during morning and evening hours.
        </p>
      </div>
    </div>
  );
}

// ─── Availability ─────────────────────────────────────────────────────────────

function AvailabilitySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="availability"
      aria-labelledby="availability-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
          {/* Left */}
          <RevealBlock className="lg:sticky lg:top-24 lg:self-start">
            <SectionLabel>Availability</SectionLabel>
            <h2
              id="availability-heading"
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-4 mb-4"
            >
              What I&rsquo;m open to
            </h2>
            <p className="text-sm text-white/40 leading-relaxed">
              Actively seeking opportunities in backend, platform, and AI-integrated
              engineering. Open to remote-first positions globally.
            </p>
          </RevealBlock>

          {/* Right */}
          <div className="flex flex-col gap-3">
            {availability.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.07 * i, ease: EASE }}
                className={`flex items-start gap-4 py-4 px-5 border rounded-sm transition-colors ${
                  item.available
                    ? "border-white/[0.08] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/12"
                    : "border-white/[0.05] bg-white/[0.005] opacity-55"
                }`}
              >
                {/* Status dot */}
                <span
                  aria-hidden="true"
                  className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                    item.available ? "bg-emerald-400" : "bg-white/20"
                  }`}
                />
                <div>
                  <div className="text-sm font-semibold text-white mb-0.5">{item.label}</div>
                  <div className="text-xs text-white/38 leading-relaxed">{item.detail}</div>
                </div>
                <span
                  className={`ml-auto text-[9px] font-mono px-2 py-0.5 rounded-sm border shrink-0 self-start mt-0.5 ${
                    item.available
                      ? "text-emerald-400/70 border-emerald-400/20 bg-emerald-400/[0.05]"
                      : "text-white/25 border-white/[0.07]"
                  }`}
                >
                  {item.available ? "Open" : "Closed"}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <RevealBlock className="mb-12">
          <SectionLabel>Common questions</SectionLabel>
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-4"
          >
            What recruiters typically ask
          </h2>
        </RevealBlock>

        <div className="space-y-px rounded-sm overflow-hidden border border-white/[0.07]">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const triggerId = `faq-trigger-${i}`;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.06 * i, ease: EASE }}
                className="border-b border-white/[0.06] last:border-0"
              >
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left hover:bg-white/[0.025] transition-colors focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                >
                  <span className="text-sm font-semibold text-white/85 leading-snug">
                    {faq.question}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="shrink-0 w-5 h-5 flex items-center justify-center text-white/30"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 border-t border-white/[0.05]">
                        <p className="text-sm text-white/48 leading-[1.85]">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CTA footer ───────────────────────────────────────────────────────────────

function CTAFooter() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-24 px-6 md:px-12 lg:px-20 border-b border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <RevealBlock>
            <SectionLabel>Explore more</SectionLabel>
            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mt-4 mb-5 leading-tight"
            >
              See the engineering
              <br />
              <span className="text-white/35">behind the applications.</span>
            </h2>
            <p className="text-sm text-white/45 leading-relaxed mb-8 max-w-md">
              Three production-oriented systems spanning encrypted secrets management,
              event-driven threat intelligence, and AI-powered legal research.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                View Projects
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-white/15 text-white/65 text-sm px-5 py-2.5 rounded-sm hover:border-white/25 hover:text-white/85 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                About Me
              </Link>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="divide-y divide-white/[0.07]">
              {[
                { label: "SecureVault",  sub: "Encrypted secrets management API",        href: "/projects/securevault"  },
                { label: "ARGUS-PRISM", sub: "Kafka + Neo4j threat intelligence platform", href: "/projects/argus-prism"  },
                { label: "Jurisynth AI",sub: "RAG-powered legal research platform",      href: "/projects/jurisynth-ai" },
                { label: "Engineering Notes", sub: "System design & architecture docs",  href: "/engineering"           },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between py-4 group hover:pl-1 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
                >
                  <div>
                    <div className="text-sm text-white/58 group-hover:text-white transition-colors">{item.label}</div>
                    <div className="text-[11px] text-white/25 font-mono mt-0.5">{item.sub}</div>
                  </div>
                  <ArrowRightIcon className="w-3.5 h-3.5 text-white/18 group-hover:text-white/48 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

// ─── Page footer ──────────────────────────────────────────────────────────────

function PageFooter() {
  return (
    <footer className="py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs font-mono text-white/20">Pranita Panchal</span>
        <span className="text-xs text-white/15">
          © {new Date().getFullYear()} — Built with Next.js, TypeScript, Tailwind CSS
        </span>
      </div>
    </footer>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ContactMethodIcon({ id }: { id: string }) {
  const cls = "w-4 h-4 text-[#C5A880]/60 group-hover:text-[#C5A880]/85 transition-colors";
  if (id === "email") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === "github") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }
  if (id === "linkedin") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  // portfolio / home
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}