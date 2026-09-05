import { Project, TimelineItem, Specialization } from '../types';

export const PORTRAIT_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBVLwi_1qxHC75dk63vycJkuaGL0ol4-jhJqg00asCfVDTTD5LDNTao0jUjXdNiSf3ZrUq_qerR8_c7PfsH_kFiJL6s3XoG5QeV3t3mc3U5Oc4vUW4XhCghTA7tnC2YRPTsHlfwgsF1QIwipYEsQGJvUE9smo9w-xrHMw_zZS8omDzG-68RMFYsUmtKMq4DpbEm3Z4vXrSsxl2vCrC5lJ3R-akfFbtNM8Z8NCj__18zu1eAElXI5Y9e';

export const AI_PROJECT_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBXmKPtfhD-GE77RLAqJ-m7R99gHgkrmq9qsq1z9kL_Nqz2WEP1mC3jtOytS8kVHOZdaPEk87Y_d3WO6cO7Ey8gOf1Aw2GZeTT6sUHOmIf9zydv_XI3BJJWSqhi4keWmUJsjWfhRveBCVWEVWACfRkjxx9RYG-4Pl-ZUzqiEUmZwZQl9owe14QTuF6voW29azadMDgBFQ-f4yDumqp_DNNzXCi4B8CPAA6SIyODGzqI-dLLJxR20j-O';

export const PROJECTS: Project[] = [
  {
    id: 'ai-platform',
    number: '01 // FLAGSHIP PRODUCT',
    badge: 'CURRENTLY BUILDING',
    category: 'ai',
    title: 'AI STUDENT PLATFORM',
    headline: 'AI STUDENT PLATFORM',
    description:
      'An advanced AI-powered student platform exploring how intelligent tools can radically improve learning retention, personal productivity, and complex academic workflows through bespoke LLM integrations and automated workspace synthesis.',
    fullDescription:
      'An AI-powered student platform exploring how intelligent tools can improve learning, productivity, and student workflows. Designed with a modular microservices backend and an intuitive obsidian interface, it synthesizes study materials, generates adaptive quizzes, and organizes multi-modal notes automatically.',
    tags: ['Python', 'Artificial Intelligence', 'JavaScript', 'Web Architecture', 'LLM APIs'],
    metrics: ['99.4% parsing accuracy', 'Sub-200ms query latency', 'Active Beta Testing'],
    imageUrl: AI_PROJECT_IMAGE_URL,
    systemStatus: 'SYSTEM STATUS: ACTIVE SYNTHESIS',
    version: 'v0.8.2-beta',
    githubUrl: 'https://github.com',
    liveUrl: '#',
    categoryLabel: 'Flagship Architecture',
  },
  {
    id: 'time-pilot',
    number: '02 // ACADEMIC LAB',
    badge: 'MICRO PROJECT',
    category: 'systems',
    title: 'TIME PILOT AID',
    headline: 'TIME PILOT AID',
    description:
      'An academic micro-project focused on solving a practical problem through efficient software development, algorithmic scheduling, and lightweight persistent storage layers.',
    fullDescription:
      'An academic micro-project focused on solving a practical problem through software development. Time Pilot Aid calculates optimal resource allocation and task scheduling intervals using custom greedy algorithms implemented in C, bridged with Python for analytics and SQL for structured logging.',
    tags: ['C', 'Python', 'JavaScript', 'SQL'],
    metrics: ['Zero memory leaks verified', 'Optimized sorting algorithms', 'CLI & Web dual interface'],
    categoryLabel: 'Systems Engineering',
    githubUrl: 'https://github.com',
  },
  {
    id: 'neural-kernel',
    number: '03 // KERNEL LAB',
    badge: 'RESEARCH EXPERIMENT',
    category: 'ai',
    title: 'NEURAL KERNEL SANDBOX',
    headline: 'NEURAL KERNEL SANDBOX',
    description:
      'Low-level tensor computation notebook and visualization framework built to inspect hidden state activation vectors in small transformer models.',
    fullDescription:
      'Low-level tensor computation playground designed to experiment with weight matrix sparsity and custom activation functions without heavy framework overhead.',
    tags: ['Python', 'PyTorch', 'NumPy'],
    metrics: ['12x faster matrix prototyping', 'Custom CUDA bindings test'],
    categoryLabel: 'Deep Learning',
    githubUrl: 'https://github.com',
  },
  {
    id: 'neural-visualizer',
    number: '01 / 03',
    badge: 'FEATURED PROJECT',
    category: 'ai',
    title: 'Neural Architecture Visualizer',
    headline: 'Neural Architecture Visualizer',
    description:
      'An interactive web tool designed to parse deep learning layers in real-time, built with PyTorch and high-performance WebGL rendering.',
    fullDescription:
      'An interactive WebGL-accelerated visualization engine that renders multi-head attention weights, tensor manifolds, and layer activations directly in browser frames with 60fps precision.',
    tags: ['PyTorch', 'WebGL', 'Python'],
    metrics: ['60 FPS WebGL Rendering', 'Realtime attention maps', 'PyTorch ONNX export'],
    categoryLabel: 'AI & WebGL',
    githubUrl: 'https://github.com',
  },
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'step-1',
    step: '01 — Foundation',
    label: 'Foundation',
    title: 'Sri Chaitanya',
    description:
      'Intensive foundational academics emphasizing analytical rigor, mathematics, and core computational principles.',
    status: 'Completed',
    statusType: 'completed',
  },
  {
    id: 'step-2',
    step: '02 — Engineering',
    label: 'Engineering',
    title: 'MLRIT — B.Tech CSE (Data Science)',
    description:
      'Specialized curriculum focusing on machine learning algorithms, big data architectures, neural networks, and scalable software systems.',
    status: 'Ongoing',
    statusType: 'ongoing',
  },
  {
    id: 'step-3',
    step: '03 — Innovation Showcase',
    label: 'Innovation Showcase',
    title: 'ZIGNASA 2025',
    description:
      'Presented advanced predictive modeling frameworks and interactive visualization dashboards to industry panels, securing top recognition.',
    status: 'Milestone',
    statusType: 'milestone',
  },
  {
    id: 'step-4',
    step: '04 — Competitive Edge',
    label: 'Competitive Edge',
    title: 'IGNITIA 2026',
    description:
      'Spearheaded cross-functional hackathon teams to deploy end-to-end autonomous agents under high-pressure constraints.',
    status: 'Upcoming / Active',
    statusType: 'upcoming',
  },
  {
    id: 'step-5',
    step: '05 — Present Horizon',
    label: 'Present Horizon',
    title: 'AI Student Platform',
    description:
      'Architecting a centralized, intelligent ecosystem empowering students with real-time analytics, automated study engines, and collaborative tooling.',
    status: 'Current Focus',
    statusType: 'current',
  },
];

export const SPECIALIZATIONS: Specialization[] = [
  {
    title: 'Web Applications',
    description:
      'Building blazing-fast, responsive web interfaces backed by robust serverless architectures and high-performance APIs.',
    icon: 'web',
    tags: ['React / Next.js', 'Tailwind CSS', 'Node.js'],
  },
  {
    title: 'Artificial Intelligence',
    description:
      'Deploying machine learning pipelines, fine-tuning LLMs, and crafting autonomous reasoning loops for real-world automation.',
    icon: 'psychology',
    tags: ['PyTorch', 'Scikit-Learn', 'LangChain'],
  },
  {
    title: 'Data + Software',
    description:
      'Bridging raw data extraction with clean software engineering patterns to build maintainable, high-throughput analytical systems.',
    icon: 'terminal',
    tags: ['Python / SQL', 'Docker', 'Git CI/CD'],
  },
];
