import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen w-full py-24 px-4 md:px-8 lg:px-16 flex items-center justify-center"
    >
      <div className="max-w-3xl mx-auto w-full flex flex-col items-center">
        {/* Section header */}
        <div className="contact-item flex items-center gap-4 mb-16 w-full">
          <span className="font-[family-name:var(--font-display)] text-[var(--jarvis-cyan)] text-xs tracking-[0.3em]">
            04
          </span>
          <div className="glow-line flex-1" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-[0.2em] text-[var(--jarvis-cyan)] glow-text">
            CONNECT
          </h2>
          <div className="glow-line flex-1" />
        </div>

        <div className="contact-item hud-panel p-8 md:p-12 text-center w-full flex flex-col items-center">
          <div className="arc-reactor mb-8 scale-50">
            <div className="core" />
            <div className="ring" />
            <div className="ring" />
            <div className="ring" />
            <div className="ring" />
          </div>

          <p className="text-sm text-[var(--jarvis-text)] mb-8 max-w-lg leading-relaxed">
            Currently seeking{" "}
            <span className="text-[var(--jarvis-cyan)]">
              Summer 2027 SWE internships
            </span>{" "}
            in backend and applied AI/ML infrastructure. Open to collaboration
            on interesting problems.
          </p>

          {/* Contact links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
            <ContactLink
              href={`mailto:${profile.email}`}
              label="EMAIL"
              value={profile.email}
            />
            <ContactLink
              href={profile.links.linkedin}
              label="LINKEDIN"
              value="long-thien-ngo"
            />
            <ContactLink
              href={profile.links.github}
              label="GITHUB"
              value="longngo2312"
            />
          </div>

          {/* Transmission form */}
          <TransmissionForm />
        </div>

        {/* Footer */}
        <footer className="contact-item mt-12 text-center">
          <div className="glow-line w-48 mx-auto mb-6" />
          <p className="text-[10px] text-[var(--jarvis-text-dim)] tracking-[0.2em]">
            DESIGNED & BUILT BY LONG NGO
          </p>
          <p className="text-[10px] text-[var(--jarvis-text-dim)] tracking-[0.2em] mt-1">
            J.A.R.V.I.S.
          </p>
        </footer>
      </div>
    </section>
  );
}

function ContactLink({
  href,
  label,
  value,
}: {
  href: string;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-item group glow-border px-4 py-3 w-full flex flex-col items-center justify-center text-center transition-all hover:bg-[rgba(0,212,255,0.08)]"
    >
      <div className="text-[10px] tracking-[0.2em] text-[var(--jarvis-text-dim)] mb-1">
        {label}
      </div>
      <div className="text-xs text-[var(--jarvis-cyan)] group-hover:glow-text transition-all truncate max-w-full">
        {value}
      </div>
    </a>
  );
}

function TransmissionForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;
    // Open mailto with pre-filled content
    window.location.href = `mailto:${profile.email}?subject=Contact from ${name}&body=${encodeURIComponent(message)}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 w-full max-w-md flex flex-col items-center gap-6"
    >
      <div className="w-full flex flex-col items-center gap-3">
        <div className="glow-line w-24" />
        <div className="text-xs tracking-[0.25em] text-[var(--jarvis-cyan)] font-[family-name:var(--font-display)]">
          OPEN TRANSMISSION
        </div>
      </div>

      <div className="w-full flex flex-col gap-5">
        <Field name="name" type="text" placeholder="Name" />
        <Field name="email" type="email" placeholder="Email" />
        <textarea
          name="message"
          placeholder="Message"
          rows={3}
          required
          className="w-full bg-transparent border-b border-[var(--jarvis-border)] pb-2 text-sm text-center text-[var(--jarvis-text)] placeholder-[var(--jarvis-text-dim)] focus:border-[var(--jarvis-cyan)] focus:outline-none transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="glow-border px-10 py-3 text-xs tracking-[0.3em] text-[var(--jarvis-cyan)] hover:bg-[rgba(0,212,255,0.1)] transition-all cursor-pointer font-[family-name:var(--font-display)]"
      >
        {sent ? "✓ SENT" : "SEND"}
      </button>
    </form>
  );
}

function Field({
  name,
  type,
  placeholder,
}: {
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required
      className="w-full bg-transparent border-b border-[var(--jarvis-border)] pb-2 text-sm text-center text-[var(--jarvis-text)] placeholder-[var(--jarvis-text-dim)] focus:border-[var(--jarvis-cyan)] focus:outline-none transition-colors"
    />
  );
}
