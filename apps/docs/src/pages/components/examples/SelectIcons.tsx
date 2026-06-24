import type { SVGProps } from 'react';

const iconClass = 'inline-flex size-[1em] shrink-0 items-center justify-center';

function SelectIconSvg({ className, children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={iconClass + (className ? ` ${className}` : '')}
      {...props}
    >
      {children}
    </svg>
  );
}

export function SelectGlobeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <SelectIconSvg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </SelectIconSvg>
  );
}

export function SelectBriefcaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <SelectIconSvg {...props}>
      <path d="M4 8h16v11H4z" />
      <path d="M9 8V5h6v3" />
      <path d="M4 13h16" />
    </SelectIconSvg>
  );
}

export function SelectClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <SelectIconSvg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </SelectIconSvg>
  );
}

export function SelectBuildingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <SelectIconSvg {...props}>
      <path d="M5 21V4h14v17" />
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
    </SelectIconSvg>
  );
}

export function SelectTagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <SelectIconSvg {...props}>
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </SelectIconSvg>
  );
}

export function SelectLocationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <SelectIconSvg {...props}>
      <path d="M12 21s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.4" />
    </SelectIconSvg>
  );
}
