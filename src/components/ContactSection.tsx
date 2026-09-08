import { useState } from 'react'
import { profile } from '../data/profile'
import { Section, SectionHeader } from './ui'
import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon, PinIcon, DownloadIcon } from './icons'

export default function ContactSection() {
  return (
    <Section id="contact">
      <SectionHeader
        eyebrow="Get In Touch"
        title="Contact"
        framing="Open to Summer 2027 software engineering internships — full-stack, backend, and applied AI."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ── Direct channels ── */}
        <div className="reveal panel edge-lit flex flex-col p-7 sm:p-9">
          <h3 className="font-display text-[26px] font-semibold text-ink">
            Let&rsquo;s Work Together
          </h3>
          <p className="mt-3 text-[14.5px] leading-[1.8] text-ink-soft">
            The fastest way to reach me is email — I answer everything. Happy to talk through a role,
            a project, or anything on this page in more detail.
          </p>

          <ul className="mt-8 flex flex-col">
            <ContactRow icon={<MailIcon />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <ContactRow
              icon={<PhoneIcon />}
              label="Phone"
              value={profile.phone}
              href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}
            />
            <ContactRow
              icon={<LinkedinIcon />}
              label="LinkedIn"
              value="long-thien-ngo"
              href={profile.links.linkedin}
              external
            />
            <ContactRow
              icon={<GithubIcon />}
              label="GitHub"
              value="longngo2312"
              href={profile.links.github}
              external
            />
            <ContactRow icon={<PinIcon />} label="Location" value={profile.location} />
          </ul>

          <a
            href={profile.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center justify-center gap-2.5 rounded-xl bg-linear-to-r from-teal to-sky px-6 py-4 text-[14px] font-semibold text-deep shadow-[0_0_34px_-12px_rgba(45,212,191,0.85)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <DownloadIcon />
            Download Résumé
          </a>
        </div>

        {/* ── Message composer ── */}
        <ContactForm />
      </div>

      <footer className="reveal mt-16 flex flex-col items-center gap-2 border-t border-line-soft pt-8 text-center">
        <p className="font-mono text-[12px] text-ink-faint">
          <span className="text-teal">{profile.prompt}</span> exit
        </p>
        <p className="text-[12.5px] text-ink-faint">
          Built by {profile.name} with React, TypeScript &amp; Tailwind.
        </p>
      </footer>
    </Section>
  )
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  external?: boolean
}) {
  const body = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line-soft text-ink-mute transition-colors duration-300 group-hover:border-line-hot group-hover:text-teal">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">
          {label}
        </span>
        <span
          className={`block truncate text-[14px] ${href ? 'text-sky group-hover:text-teal' : 'text-ink-soft'} transition-colors duration-300`}
        >
          {value}
        </span>
      </span>
    </>
  )

  return (
    <li className="border-b border-line-soft last:border-b-0">
      {href ? (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="group flex items-center gap-4 py-4"
        >
          {body}
        </a>
      ) : (
        <div className="group flex items-center gap-4 py-4">{body}</div>
      )}
    </li>
  )
}

/**
 * No backend on this site, so the form composes a prefilled mail draft and
 * hands it to the visitor's mail client. Nothing is sent silently.
 */
function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'a visitor'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="reveal panel flex flex-col p-7 sm:p-9">
      <Field label="Your name" htmlFor="cf-name">
        <input
          id="cf-name"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ada Lovelace"
          className="w-full rounded-xl border border-line-soft bg-deep/60 px-4 py-3.5 text-[14px] text-ink placeholder:text-ink-faint focus:border-line-hot focus:outline-none"
        />
      </Field>

      <Field label="Email address" htmlFor="cf-email">
        <input
          id="cf-email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="ada@example.com"
          className="w-full rounded-xl border border-line-soft bg-deep/60 px-4 py-3.5 text-[14px] text-ink placeholder:text-ink-faint focus:border-line-hot focus:outline-none"
        />
      </Field>

      <Field label="Message" htmlFor="cf-message">
        <textarea
          id="cf-message"
          required
          rows={7}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Tell me about the role, project, or idea…"
          className="w-full resize-y rounded-xl border border-line-soft bg-deep/60 px-4 py-3.5 text-[14px] leading-relaxed text-ink placeholder:text-ink-faint focus:border-line-hot focus:outline-none"
        />
      </Field>

      <button
        type="submit"
        className="mt-auto cursor-pointer rounded-xl border border-line-hot bg-teal/10 px-6 py-4 text-[14px] font-semibold text-teal transition-colors duration-300 hover:bg-teal/18"
      >
        Compose Message
      </button>
      <p className="mt-3 text-center font-mono text-[11px] text-ink-faint">
        Opens a prefilled draft in your mail app.
      </p>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-5">
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute"
      >
        {label}
      </label>
      {children}
    </div>
  )
}
