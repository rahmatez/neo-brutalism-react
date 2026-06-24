import type { SVGProps } from 'react';

function JobCardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="block h-full w-full"
      {...props}
    />
  );
}

const hostClass =
  'inline-flex shrink-0 items-center justify-center [width:var(--nb-icon-size,1em)] [height:var(--nb-icon-size,1em)]';

export function JobCardLogoIcon() {
  return (
    <span className={hostClass} aria-hidden>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113.1845 121.4197" className="block h-full w-full" aria-hidden>
        <g fill="currentColor">
          <circle cx="56.5904" cy="15.4347" r="15.4347" />
          <circle cx="15.4345" cy="37.0428" r="15.4347" />
          <circle cx="97.7498" cy="37.0436" r="15.4347" />
          <circle cx="56.5904" cy="60.7108" r="15.4347" />
          <circle cx="15.4346" cy="84.3761" r="15.4347" />
          <circle cx="97.7498" cy="84.3753" r="15.4347" />
          <circle cx="56.5904" cy="105.985" r="15.4347" />
        </g>
      </svg>
    </span>
  );
}

export function JobCardHeartIcon() {
  return (
    <span className={hostClass} aria-hidden>
      <JobCardIcon>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </JobCardIcon>
    </span>
  );
}

export function JobCardRemoteIcon() {
  return (
    <span className={hostClass} aria-hidden>
      <JobCardIcon>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </JobCardIcon>
    </span>
  );
}

export function JobCardBriefcaseIcon() {
  return (
    <span className={hostClass} aria-hidden>
      <JobCardIcon>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </JobCardIcon>
    </span>
  );
}

export function JobCardSalaryIcon() {
  return (
    <span className={hostClass} aria-hidden>
      <JobCardIcon>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
        <line x1="12" y1="6" x2="12" y2="8" />
        <line x1="12" y1="16" x2="12" y2="18" />
      </JobCardIcon>
    </span>
  );
}

export function JobCardExperienceIcon() {
  return (
    <span className={hostClass} aria-hidden>
      <JobCardIcon>
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="6" />
      </JobCardIcon>
    </span>
  );
}

export function JobCardUrgentIcon() {
  return (
    <span className={hostClass} aria-hidden>
      <JobCardIcon fill="currentColor">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </JobCardIcon>
    </span>
  );
}

export function JobCardStarIcon() {
  return (
    <span className={hostClass} aria-hidden>
      <JobCardIcon>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </JobCardIcon>
    </span>
  );
}

export function JobCardLocationIcon() {
  return (
    <span className={hostClass} aria-hidden>
      <JobCardIcon>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </JobCardIcon>
    </span>
  );
}

export function JobCardClockIcon() {
  return (
    <span className={hostClass} aria-hidden>
      <JobCardIcon>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </JobCardIcon>
    </span>
  );
}

export function JobCardBookmarkIcon() {
  return (
    <span className={hostClass} aria-hidden>
      <JobCardIcon>
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </JobCardIcon>
    </span>
  );
}
