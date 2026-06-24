export interface NavLink {
  href: string;
  label: string;
  external: boolean;
}

export interface Skill {
  text: string;
  iconSlug: string;
  iconLabel: string;
}

export interface TimelineEntry {
  id: number;
  title: string;
  date: string;
  description: string;
  location: [number, number];
  locationName: string;
  popupTitle: string;
  popupDescription: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
}
