import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { profile } from "../data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen w-full py-24 px-4 md:px-8 lg:px-16 flex items-center justify-center"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section header */}
        <div className="about-item flex items-center gap-4 mb-12">
          <span className="font-[family-name:var(--font-display)] text-[var(--jarvis-cyan)] text-xs tracking-[0.3em]">
            01
          </span>
          <div className="glow-line flex-1" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-[0.2em] text-[var(--jarvis-cyan)] glow-text">
            ABOUT
          </h2>
          <div className="glow-line flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile photo - holographic frame */}
          <div className="about-item flex justify-center lg:justify-start">
            <div className="relative">
              {/* Outer scanning ring */}
              <div className="absolute -inset-4 border border-[var(--jarvis-border)] rounded-full animate-[spin-ring_20s_linear_infinite] opacity-30" />
              <div className="absolute -inset-6 border border-dashed border-[var(--jarvis-border)] rounded-full animate-[spin-ring_15s_linear_infinite_reverse] opacity-20" />

              {/* Photo container */}
              <div className="relative w-48 h-48 lg:w-56 lg:h-56">
                {/* HUD corners */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[var(--jarvis-cyan)]" />
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[var(--jarvis-cyan)]" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[var(--jarvis-cyan)]" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[var(--jarvis-cyan)]" />

                {/* Photo with holographic overlay */}
                <div className="w-full h-full overflow-hidden border border-[var(--jarvis-border-active)] relative">
                  <img
                    src="JackNgo.png"
                    alt="Long Ngo"
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.9) contrast(1.1)" }}
                  />
                  {/* Holographic scan effect */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(0, 212, 255, 0.05) 50%, transparent 100%)",
                      animation: "scan-sweep 3s linear infinite",
                    }}
                  />
                  {/* Cyan tint overlay */}
                  <div className="absolute inset-0 bg-[rgba(0,212,255,0.03)] pointer-events-none" />
                </div>

                {/* Label underneath */}
                <div className="mt-3 text-center">
                  <div className="text-[10px] tracking-[0.3em] text-[var(--jarvis-text-dim)]">
                    OPERATOR
                  </div>
                  <div className="text-xs tracking-[0.2em] text-[var(--jarvis-cyan)] mt-1">
                    {profile.name.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio + Status panels */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio panel */}
            <div className="about-item hud-panel p-10 md:p-12">
              <h3 className="text-xs tracking-[0.2em] text-[var(--jarvis-cyan)] mb-6 font-[family-name:var(--font-display)]">
                ◇ OPERATOR PROFILE
              </h3>
              <div className="space-y-5 text-sm leading-relaxed text-[var(--jarvis-text)]">
                {profile.bio.map((line, i) => (
                  <p
                    key={i}
                    className="pl-5 py-0.5 border-l border-[var(--jarvis-border-active)]"
                  >
                    {line}
                  </p>
                ))}
              </div>
              <div className="mt-8 pt-5 border-t border-[var(--jarvis-border)]">
                <p className="text-xs text-[var(--jarvis-text-dim)]">
                  {profile.education}
                </p>
              </div>
            </div>

            {/* Status panel */}
            <div className="about-item hud-panel p-10 md:p-12">
              <h3 className="text-xs tracking-[0.2em] text-[var(--jarvis-cyan)] mb-6 font-[family-name:var(--font-display)]">
                ◇ SYSTEM STATUS
              </h3>
              <div className="space-y-4">
                <StatusRow label="DESIGNATION" value={profile.name} />
                <StatusRow label="LOCATION" value={profile.location} />
                <StatusRow
                  label="STATUS"
                  value={profile.status}
                  color="green"
                />
                <StatusRow label="OBJECTIVE" value={profile.seeking} />
              </div>
            </div>
          </div>

          {/* External links - three floating nodes */}
          <HudLink href={profile.links.github} label="GITHUB" icon={<GithubIcon />} />
          <HudLink href={profile.links.linkedin} label="LINKEDIN" icon={<LinkedinIcon />} />
          <HudLink href={profile.links.resume} label="RESUME" icon={<ResumeIcon />} />
        </div>
      </div>
    </section>
  );
}

function StatusRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="flex items-start gap-4 text-sm">
      <span className="text-[var(--jarvis-text-dim)] text-xs tracking-wider min-w-[100px]">
        {label}
      </span>
      <span
        className={
          color === "green"
            ? "text-[var(--jarvis-green)]"
            : "text-[var(--jarvis-text)]"
        }
      >
        {value}
      </span>
    </div>
  );
}

function HudLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="about-item hud-panel group flex items-center justify-between gap-4 px-6 py-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[var(--jarvis-border-active)] hover:bg-[rgba(0,212,255,0.06)] hover:shadow-[0_0_20px_var(--jarvis-cyan-glow)]"
    >
      <span className="flex items-center gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--jarvis-border)] text-[var(--jarvis-text-dim)] transition-all duration-300 group-hover:border-[var(--jarvis-border-active)] group-hover:text-[var(--jarvis-cyan)]">
          {icon}
        </span>
        <span className="text-xs tracking-[0.2em] text-[var(--jarvis-cyan)]">
          {label}
        </span>
      </span>
      <span className="text-[var(--jarvis-text-dim)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--jarvis-cyan)]">
        ▸
      </span>
    </a>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden
    >
      <path d="M14 2.5H6.5v19h11V6z" />
      <path d="M13.5 2.5V6.5h4" />
      <path d="M9.5 12.5h5M9.5 16h3.5" />
    </svg>
  );
}
