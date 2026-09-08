/** Inline 20px icons. Local so the page ships no icon-font or CDN request. */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  )
}

export function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" {...stroke} aria-hidden>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 8.13 5.42a1.6 1.6 0 0 0 1.74 0L21 7" />
    </svg>
  )
}

export function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[17px]" {...stroke} aria-hidden>
      <path d="M12 3.5v11m0 0 4-4m-4 4-4-4" />
      <path d="M4 16.5v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  )
}

export function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[17px]" {...stroke} aria-hidden>
      <path d="M20.5 12.4a7.9 7.9 0 0 1-8.5 7.9 9 9 0 0 1-2.6-.4L4 21.5l1.6-4.6A7.7 7.7 0 0 1 4 12.4a7.9 7.9 0 0 1 8.5-7.9 8 8 0 0 1 8 7.9Z" />
    </svg>
  )
}

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" {...stroke} aria-hidden>
      <path d="M5 12h13m0 0-5-5m5 5-5 5" />
    </svg>
  )
}

export function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" {...stroke} aria-hidden>
      <path d="M12 19V5m0 0-6 6m6-6 6 6" />
    </svg>
  )
}

export function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" {...stroke} aria-hidden>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" {...stroke} aria-hidden>
      <path d="M6.2 3.5h3l1.5 4-2 1.4a12.5 12.5 0 0 0 6.4 6.4l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  )
}

export function CapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" {...stroke} aria-hidden>
      <path d="m2.5 8.5 9.5-4.5 9.5 4.5L12 13 2.5 8.5Z" />
      <path d="M6.5 10.7v4.6c0 1.6 2.5 2.9 5.5 2.9s5.5-1.3 5.5-2.9v-4.6" />
    </svg>
  )
}

/* ── Dock navigation icons ─────────────────────────────────────── */

export function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[19px]" {...stroke} aria-hidden>
      <path d="M4 10.6 12 4l8 6.6" />
      <path d="M6.2 9.5V19a1 1 0 0 0 1 1h9.6a1 1 0 0 0 1-1V9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  )
}

export function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[19px]" {...stroke} aria-hidden>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
      <path d="M3 12.5h18" />
    </svg>
  )
}

export function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[19px]" {...stroke} aria-hidden>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  )
}

export function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[19px]" {...stroke} aria-hidden>
      <path d="m12 3.5 8.5 4.6L12 12.7 3.5 8.1 12 3.5Z" />
      <path d="m3.5 12.5 8.5 4.6 8.5-4.6" />
      <path d="m3.5 16.6 8.5 4.6 8.5-4.6" />
    </svg>
  )
}

export function ArrowUpRightIcon({ className = 'size-[15px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden>
      <path d="M7 17 17 7m0 0h-7m7 0v7" />
    </svg>
  )
}
