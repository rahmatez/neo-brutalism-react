import { ASSET_PATH, PORTFOLIO_PROJECTS } from '../portfolio.data';

function isPlaceholderLink(url: string): boolean {
  return url === '#';
}

export function PortfolioProjects() {
  return (
    <section
      id="projects"
      className="portfolio-grid-section relative scroll-mt-6 bg-white p-3 py-8 sm:p-5 sm:py-12 md:p-8 md:py-16"
    >
      <div className="portfolio-grid-bg absolute inset-0" />
      <div className="portfolio-radial absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-full px-2 sm:px-5">
        <div className="portfolio-section-title mb-6 sm:mb-10">
          <h2 className="text-center font-heading text-2xl font-black text-black sm:text-3xl md:text-4xl lg:text-5xl">
            Projects I&apos;ve Worked On <span aria-hidden>🚀</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {PORTFOLIO_PROJECTS.map((project) => (
            <article key={project.title} className="portfolio-project-card group">
              <div className="relative mb-3 h-36 w-full overflow-hidden rounded-lg sm:mb-4 sm:h-44 md:h-48">
                <img
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  src={`${ASSET_PATH}/${project.image}`}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h3 className="mb-2 text-xl font-bold sm:text-2xl">{project.title}</h3>
              <p className="mb-3 text-sm text-black sm:mb-4 sm:text-base">{project.description}</p>

              <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="border-2 border-black bg-yellow-300 px-2 py-0.5 text-xs font-semibold text-black sm:px-3 sm:py-1 sm:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-4">
                <a
                  className="portfolio-project-link bg-blue-400"
                  href={project.github}
                  target={isPlaceholderLink(project.github) ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-disabled={isPlaceholderLink(project.github)}
                  onClick={(event) => {
                    if (isPlaceholderLink(project.github)) event.preventDefault();
                  }}
                >
                  <span aria-hidden>⌘</span> Code
                </a>
                <a
                  className="portfolio-project-link bg-green-400"
                  href={project.live}
                  target={isPlaceholderLink(project.live) ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-disabled={isPlaceholderLink(project.live)}
                  onClick={(event) => {
                    if (isPlaceholderLink(project.live)) event.preventDefault();
                  }}
                >
                  <span aria-hidden>↗</span> Live Demo
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
