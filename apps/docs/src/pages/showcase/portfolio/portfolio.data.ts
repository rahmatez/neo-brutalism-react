import type { NavLink, Project, Skill, TimelineEntry } from './portfolio.types';

export const ASSET_PATH = '/showcase/portfolio';

export const GREETINGS = ['Hello!', 'Halo!', 'Bonjour!', 'Hai!'];

export const NAV_LINKS: NavLink[] = [
  { href: '/showcase/portfolio#home', label: 'Home', external: false },
  { href: '/showcase/portfolio#journey', label: 'Journey', external: false },
  { href: '/showcase/portfolio#projects', label: 'Projects', external: false },
  { href: 'https://www.rahmatez.dev/', label: 'Portfolio', external: true },
];

export const SKILLS: Skill[] = [
  { text: 'JavaScript', iconSlug: 'javascript', iconLabel: 'JavaScript' },
  { text: 'TypeScript', iconSlug: 'typescript', iconLabel: 'TypeScript' },
  { text: 'React', iconSlug: 'react', iconLabel: 'React' },
  { text: 'Next.js', iconSlug: 'nextdotjs', iconLabel: 'Next.js' },
  { text: 'Laravel', iconSlug: 'laravel', iconLabel: 'Laravel' },
  { text: 'PHP', iconSlug: 'php', iconLabel: 'PHP' },
  { text: 'Node.js', iconSlug: 'nodedotjs', iconLabel: 'Node.js' },
  { text: 'PostgreSQL', iconSlug: 'postgresql', iconLabel: 'PostgreSQL' },
  { text: 'Tailwind CSS', iconSlug: 'tailwindcss', iconLabel: 'Tailwind CSS' },
  { text: 'Docker', iconSlug: 'docker', iconLabel: 'Docker' },
];

export const TIMELINE: TimelineEntry[] = [
  {
    id: 1,
    title: 'Web Development Intern @ Diskominfo Banyumas',
    date: 'Oct 2024 — Dec 2024',
    description:
      'Led the rebuild and modernization of the Saka Milenial web platform with Laravel — improving security, performance, and youth-friendly access to regional services.',
    location: [109.241, -7.421],
    locationName: 'Banyumas, Indonesia',
    popupTitle: 'Diskominfo Banyumas',
    popupDescription:
      'Modernized the Saka Milenial platform with authentication, CMS features, and responsive design for the Banyumas community.',
  },
  {
    id: 2,
    title: 'Content Creator & Digital Marketing @ PKM-K Nypahcans',
    date: 'Feb 2024 — Aug 2024',
    description:
      'Developed creative content strategies, marketing materials, and audience engagement workflows that helped secure national funding for the business proposal.',
    location: [106.8456, -6.2088],
    locationName: 'Jakarta, Indonesia',
    popupTitle: 'PKM-K Nypahcans',
    popupDescription:
      'Built social content, brand guidelines, and campaign analytics for a product-focused student entrepreneurship program.',
  },
  {
    id: 3,
    title: 'Informatics Engineering Graduate',
    date: '2019 — 2024',
    description:
      'Graduated with a 3.63 GPA, combining frontend and backend development with project management across academic and internship work.',
    location: [110.4203, -7.7971],
    locationName: 'Yogyakarta, Indonesia',
    popupTitle: 'Informatics Engineering',
    popupDescription:
      'Focused on web engineering, scalable application design, and shipping real products from classroom concepts to production-ready builds.',
  },
];

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    title: 'World Cup 2026 Score',
    description:
      'World Cup 2026 info hub with schedules and live updates in Indonesian time zones, built with Next.js 16 and TypeScript.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/rahmatez',
    live: 'https://www.rahmatez.dev/',
    image: 'project-frontend-lab.svg',
  },
  {
    title: 'Makan Bang',
    description:
      'Full-stack food ordering app with Auth.js authentication, PostgreSQL, and Midtrans Snap payments.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Node.js'],
    github: 'https://github.com/rahmatez',
    live: 'https://www.rahmatez.dev/',
    image: 'project-service-starter.svg',
  },
  {
    title: 'StockFlow-Go',
    description:
      'SaaS inventory and order management dashboard built with Go, PostgreSQL, and Docker.',
    tech: ['Go', 'PostgreSQL', 'Docker', 'TypeScript'],
    github: 'https://github.com/rahmatez',
    live: 'https://www.rahmatez.dev/',
    image: 'project-ai-workflow.svg',
  },
  {
    title: 'Indonesian Tour Travel',
    description:
      'Tour travel website and admin dashboard for content, gallery, MSME products, and complaint management.',
    tech: ['Next.js', 'React', 'Express', 'PostgreSQL'],
    github: 'https://github.com/rahmatez',
    live: '#',
    image: 'svgs/Character1.svg',
  },
  {
    title: '115-roots CMS',
    description:
      'Laravel CMS and landing page for PSS Sleman supporters with blog, gallery, events, and online shop.',
    tech: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS'],
    github: 'https://github.com/rahmatez',
    live: 'https://www.rahmatez.dev/',
    image: 'svgs/Character2.svg',
  },
  {
    title: 'Mindaka Village Portal',
    description:
      'Village profile website and admin dashboard for news, budget transparency, MSME, and public services.',
    tech: ['Next.js', 'React', 'Express', 'PostgreSQL'],
    github: 'https://github.com/rahmatez',
    live: '#',
    image: 'svgs/Character3.svg',
  },
];
