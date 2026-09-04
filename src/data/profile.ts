export const profile = {
  name: 'Long Ngo',
  codename: 'J.A.R.V.I.S.',
  tagline: 'Backend & Applied-AI Engineering',
  status: 'ONLINE',
  location: 'Denton, TX',
  education: 'B.S. Computer Science — University of North Texas · Expected 2028',
  seeking: 'Summer 2027 SWE Internships — Backend, Applied AI/ML Infrastructure',
  email: 'jackngo2312@gmail.com',
  links: {
    github: 'https://github.com/longngo2312',
    linkedin: 'https://www.linkedin.com/in/long-thien-ngo/',
    resume: 'https://github.com/longngo2312/longngo2312/raw/main/resume.pdf',
  },
  bio: [
    'LLM systems that have to be right: retrieval grounding, hallucination detection, provenance, evaluation harnesses.',
    'Multi-tenant backends, async job pipelines, TypeScript / Python / Node APIs.',
  ],
}

export const skills = [
  { name: 'Python', level: 92, category: 'Languages' },
  { name: 'TypeScript', level: 90, category: 'Languages' },
  { name: 'Node.js', level: 88, category: 'Runtime' },
  { name: 'React', level: 82, category: 'Frontend' },
  { name: 'FastAPI', level: 85, category: 'Backend' },
  { name: 'Express', level: 87, category: 'Backend' },
  { name: 'LangGraph', level: 80, category: 'AI/ML' },
  { name: 'PostgreSQL', level: 78, category: 'Database' },
  { name: 'SQLite', level: 82, category: 'Database' },
  { name: 'Docker', level: 75, category: 'DevOps' },
  { name: 'ChromaDB', level: 78, category: 'AI/ML' },
  { name: 'React Native', level: 72, category: 'Mobile' },
]

export const projects = [
  {
    id: 'dotb-ems',
    name: 'DotB EMS',
    subtitle: 'Agentic RAG Support Assistant',
    description:
      'Deflects tier-1 support tickets for a Vietnamese education-management SaaS. Answers product questions from ~250 pages of mixed Vietnamese/English help documentation with citations — hands off to a human instead of guessing.',
    metrics: [
      { label: 'Recall@10', value: '0.97' },
      { label: 'Faithfulness', value: '1.00' },
      { label: 'Answer Relevance', value: '0.97' },
      { label: 'Answer Correctness', value: '0.93' },
    ],
    tech: ['Python', 'LangGraph', 'FastAPI', 'Gemini', 'ChromaDB', 'BM25', 'RAGAS'],
    repo: 'https://github.com/longngo2312/AgenticRagDotB',
    status: 'OPERATIONAL',
    architecture: [
      { from: 'User Query', to: 'Guardrails' },
      { from: 'Guardrails', to: 'Router' },
      { from: 'Router', to: 'Dense Search' },
      { from: 'Router', to: 'BM25 Search' },
      { from: 'Dense Search', to: 'RRF Fusion' },
      { from: 'BM25 Search', to: 'RRF Fusion' },
      { from: 'RRF Fusion', to: 'Cross-Encoder' },
      { from: 'Cross-Encoder', to: 'Generate' },
      { from: 'Generate', to: 'Faithfulness Gate' },
      { from: 'Faithfulness Gate', to: 'Cited Answer' },
    ],
  },
  {
    id: 'doc-extraction',
    name: 'Document Extraction Platform',
    subtitle: 'Structured Data from Unstructured Docs',
    description:
      'Turns unstructured documents into reviewable structured data. Every extracted value carries a verbatim source quote verified against parsed text, resolved to character offsets and page coordinates. $0 per-document inference cost — no document leaves the network.',
    metrics: [
      { label: 'VRAM Budget', value: '6GB' },
      { label: 'Inference Cost', value: '$0' },
      { label: 'Formats', value: '5+' },
    ],
    tech: ['TypeScript', 'Express 5', 'SQLite', 'Ollama', 'Qwen2.5-7B', 'Tesseract OCR', 'React 19'],
    repo: 'https://github.com/longngo2312/LongMentorshipSummer2026CPI/tree/main/DocumentExtraction',
    status: 'OPERATIONAL',
    architecture: [
      { from: 'Upload', to: 'Express API' },
      { from: 'Express API', to: 'Job Queue' },
      { from: 'Job Queue', to: 'Worker' },
      { from: 'Worker', to: 'Parse + OCR' },
      { from: 'Parse + OCR', to: 'Extract (7B)' },
      { from: 'Extract (7B)', to: 'Quote Verify' },
      { from: 'Quote Verify', to: 'Grounding Judge' },
      { from: 'Grounding Judge', to: 'Human Review' },
      { from: 'Human Review', to: 'Tenant DB' },
    ],
  },
  {
    id: 'moodmeal',
    name: 'MoodMeal',
    subtitle: 'Food Symptom Tracker',
    description:
      'Helps people with food-triggered symptoms find patterns. Log meals and symptoms on a calendar, then export history as a PDF for doctor appointments.',
    tech: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL'],
    repo: 'https://github.com/longngo2312/MoodMeal',
    status: 'OPERATIONAL',
    architecture: [
      { from: 'React Native', to: 'Supabase Auth' },
      { from: 'Supabase Auth', to: 'PostgreSQL' },
      { from: 'React Native', to: 'Calendar View' },
      { from: 'Calendar View', to: 'Meal Logger' },
      { from: 'Calendar View', to: 'Symptom Logger' },
      { from: 'Meal Logger', to: 'PDF Export' },
    ],
  },
  {
    id: 'yt-trending',
    name: 'YouTube Trending VN',
    subtitle: 'Trending Video Dashboard',
    description:
      'Trending-video dashboard for Vietnam. Server-side caching keeps it inside YouTube API\'s 10k unit/day free quota.',
    tech: ['React', 'Express', 'MongoDB'],
    repo: 'https://github.com/longngo2312/YoutubeTrendingVN',
    status: 'STANDBY',
    architecture: [
      { from: 'React UI', to: 'Express API' },
      { from: 'Express API', to: 'Cache Layer' },
      { from: 'Cache Layer', to: 'YouTube API' },
      { from: 'YouTube API', to: 'MongoDB' },
    ],
  },
]

export const techStack = [
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', category: 'Languages' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', category: 'Languages' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', category: 'Runtime' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', category: 'Frontend' },
  { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', category: 'Backend' },
  { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', category: 'Backend' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', category: 'Database' },
  { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg', category: 'Database' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', category: 'Database' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', category: 'DevOps' },
  { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', category: 'Mobile' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', category: 'Tools' },
]

export const navItems = [
  { id: 'hero', label: 'HOME', icon: '◆' },
  { id: 'about', label: 'ABOUT', icon: '◇' },
  { id: 'projects', label: 'PROJECTS', icon: '▣' },
  { id: 'techstack', label: 'TECH STACK', icon: '◈' },
  { id: 'contact', label: 'CONNECT', icon: '◎' },
]
