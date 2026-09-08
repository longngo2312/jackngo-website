import { asset } from '../lib/asset'

export const profile = {
  name: 'Jack Ngo',
  fullName: 'Long Thien Ngo',
  initials: 'JN',
  role: 'Software Engineer',
  specialty: 'Full-Stack · Applied AI · Backend',
  prompt: 'jack@denton:~/portfolio$',
  command: 'npm run build --workspace=career',
  location: 'Denton, TX',
  status: 'Open to Summer 2027 internships',
  phone: '(346) 280-1422',
  email: 'jackngo2312@gmail.com',
  links: {
    github: 'https://github.com/longngo2312',
    linkedin: 'https://www.linkedin.com/in/long-thien-ngo/',
    resume: 'https://github.com/longngo2312/longngo2312/raw/main/resume.pdf',
  },
  mission:
    'I build web products and AI systems that hold up under real use — full-stack apps with live multi-user sync, async pipelines that survive bad input, and retrieval systems that cite their sources instead of guessing. I care most about the unglamorous parts: correctness, cost, and the evaluation harness that proves it works.',
  snapshot:
    'B.S. Computer Science at the University of North Texas (3.9 GPA, expected May 2028) · Software engineering intern at Eudaimonic Inc · Research assistant in UNT’s High Performance Cloud Computing Lab · Shipped AI agents, real-time React apps, and multi-tenant backends.',
  pills: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'AI Apps'],
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]

export const experience = [
  {
    id: 'eudaimonic',
    role: 'Software Engineering Intern',
    org: 'Eudaimonic Inc',
    meta: 'Feb 2026 - May 2026 · Remote',
    tags: ['React', 'TypeScript', 'Express', 'MongoDB', 'Cloudflare Workers'],
    bullets: [
      'Shipped **3+ full-stack React applications** with live multi-user sync and presence, 60fps game loops, and drift-free sequencer timing on a 25ms scheduler tick, using React, TypeScript, the Web Audio API, and Express/MongoDB.',
      'Cut storage writes by an estimated **70%** by debouncing autosave, keeping transport state client-side, and computing progression state on read instead of persisting it, against a SQLite-backed record store.',
      'Rendered AI-generated slides with **100% compile success across a 5,000-slide benchmark** by building a browser-side TSX-to-React compiler with Sucrase.',
      'Shipped an AI slide-generating agent that generates and edits live React slides, via a two-stage planner-builder pipeline using the Vercel AI SDK, Zod, and Anthropic/OpenAI models.',
      'Prevented uncapped AI spend on the company account while preserving no-signup trial access, by designing a server-side, token-scoped billing architecture on Cloudflare Workers, Hono, and JWT auth.',
    ],
  },
  {
    id: 'hpcc-lab',
    role: 'Research Assistant',
    org: 'High Performance Cloud Computing Lab, UNT',
    meta: 'Jul 2025 - Dec 2025 · Denton, TX',
    tags: ['Python', 'Multithreading', 'Real-time Audio', 'Piper TTS'],
    bullets: [
      'Developed a **multi-threaded Piper TTS engine** with hierarchical message queues for real-time audio on SmartSight glasses.',
      'Implemented a **priority-queue interruption mechanism** enabling urgent alerts to preempt passive speech.',
      'Validated real-time audio systems end-to-end via automated test suites and keyboard-triggered threads.',
    ],
  },
  {
    id: 'ai-summer-research',
    role: 'Student Researcher',
    org: 'UNT AI Summer Research',
    meta: 'May 2025 - Jul 2025 · Denton, TX',
    tags: ['Python', 'YOLO', 'Faster R-CNN', 'ResNet-101', 'Computer Vision'],
    bullets: [
      'Developed an end-to-end **Python UAV imagery pipeline** to automate *Ligustrum sinense* detection alongside geography researchers.',
      'Achieved an **F1 score up to 91%** classifying *Ligustrum sinense* by training YOLO and Faster R-CNN with a ResNet-101 backbone.',
      'Authored unit tests for a YOLOv8 annotation tool and auto-labeled **600+ images**, cutting manual labeling effort.',
    ],
  },
]

export const education = [
  {
    id: 'unt',
    degree: 'B.S. Computer Science',
    school: 'University of North Texas',
    meta: 'Aug 2024 - May 2028 · Denton, TX',
    badge: 'GPA 3.9 / 4.0',
    summary:
      'Studying computer science with a focus on systems, data, and applied machine learning while shipping production software alongside coursework.',
    coursework: [
      'Data Structures & Algorithms',
      'System Programming',
      'Internet Programming',
      'Database Systems',
      'Software Engineering',
      'Linear Algebra',
    ],
  },
]

export const projects = [
  {
    id: 'doc-extraction',
    name: 'Document Extraction Platform',
    subtitle: 'Structured data from unstructured docs',
    meta: 'Jul 2026 - Present',
    description:
      'A multi-tenant platform that turns documents into reviewable structured data. Per-tenant SQLite databases with a shared admin database for auth and job scheduling; an async pipeline driven by SQLite change data capture on WAL inserts feeds Tesseract OCR and zero-shot LLM extraction. Every extracted value carries a verbatim source quote.',
    metrics: [
      { label: 'Query engine', value: 'Hybrid RRF' },
      { label: 'Isolation', value: 'Per-tenant DB' },
      { label: 'Inference cost', value: '$0' },
    ],
    tech: ['Node', 'Express', 'SQLite', 'sqlite-vec', 'Tesseract OCR', 'LLM'],
    repo: 'https://github.com/longngo2312/LongMentorshipSummer2026CPI/tree/main/DocumentExtraction',
    status: 'Active',
  },
  {
    id: 'agentic-rag',
    name: 'Agentic RAG Support Bot',
    subtitle: 'Self-correcting bilingual retrieval',
    meta: 'Jul 2026',
    description:
      'Deflects tier-1 support tickets for a Vietnamese education-management SaaS. Processes 247 help-center pages into a bilingual RAG pipeline with hybrid retrieval and reranking, and retries up to 3x before escalating low-confidence answers to a human instead of guessing.',
    metrics: [
      { label: 'Recall@10', value: '0.97' },
      { label: 'Faithfulness', value: '1.00' },
      { label: 'Eval questions', value: '39' },
    ],
    tech: ['Python', 'LangGraph', 'FastAPI', 'ChromaDB', 'BM25', 'RAGAS'],
    repo: 'https://github.com/longngo2312/AgenticRagDotB',
    status: 'Shipped',
  },
  {
    id: 'moodmeal',
    name: 'MoodMeal',
    subtitle: 'Food symptom tracker',
    meta: 'Mobile',
    description:
      'Helps people with food-triggered symptoms find patterns. Log meals and symptoms on a calendar, then export the history as a PDF to bring to a doctor’s appointment.',
    metrics: [],
    tech: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL'],
    repo: 'https://github.com/longngo2312/MoodMeal',
    status: 'Shipped',
  },
  {
    id: 'yt-trending',
    name: 'YouTube Trending VN',
    subtitle: 'Trending video dashboard',
    meta: 'Web',
    description:
      'A trending-video dashboard for Vietnam. Server-side caching keeps the whole thing inside the YouTube API’s 10k unit/day free quota.',
    metrics: [],
    tech: ['React', 'Express', 'MongoDB'],
    repo: 'https://github.com/longngo2312/YoutubeTrendingVN',
    status: 'Archived',
  },
]

/**
 * Stack entries. `logo` points at a vendored SVG in /public/logos — no CDN, so
 * the icons can't break on someone else's uptime. Tools with no official mark
 * (or one that isn't ours to ship) fall back to a monogram tile via `mono`.
 * `invert` flips single-color black marks so they read on the dark surface.
 */
export type StackItem = {
  name: string
  logo?: string
  mono?: string
  invert?: boolean
}

export const stack: { group: string; items: StackItem[] }[] = [
  {
    group: 'Languages',
    items: [
      { name: 'Python', logo: asset('/logos/python.svg') },
      { name: 'TypeScript', logo: asset('/logos/typescript.svg') },
      { name: 'JavaScript', logo: asset('/logos/javascript.svg') },
      { name: 'C / C++', logo: asset('/logos/cplusplus.svg') },
      { name: 'SQL', mono: 'SQL' },
    ],
  },
  {
    group: 'Frameworks & Libraries',
    items: [
      { name: 'React', logo: asset('/logos/react.svg') },
      { name: 'Node.js', logo: asset('/logos/nodejs.svg') },
      { name: 'Express', logo: asset('/logos/express.svg'), invert: true },
      { name: 'FastAPI', logo: asset('/logos/fastapi.svg') },
      { name: 'LangGraph', mono: 'LG' },
      { name: 'YOLO', mono: 'YO' },
    ],
  },
  {
    group: 'Databases & Storage',
    items: [
      { name: 'SQLite', logo: asset('/logos/sqlite.svg') },
      { name: 'MongoDB', logo: asset('/logos/mongodb.svg') },
      { name: 'PostgreSQL', logo: asset('/logos/postgresql.svg') },
      { name: 'ChromaDB', mono: 'CH' },
      { name: 'sqlite-vec', mono: 'VEC' },
    ],
  },
  {
    group: 'Tools & Platforms',
    items: [
      { name: 'Git', logo: asset('/logos/git.svg') },
      { name: 'Docker', logo: asset('/logos/docker.svg') },
      { name: 'Cloudflare', logo: asset('/logos/cloudflare.svg') },
      { name: 'Linux', mono: 'LX' },
      { name: 'WebSockets', mono: 'WS' },
      { name: 'Tesseract', mono: 'OCR' },
    ],
  },
]
