/**
 * Single source of truth for contact details used in more than one place
 * (hero and contact section), so they can never drift apart.
 */

export interface SocialLink {
  /** Used as the accessible name — the anchors are icon-only. */
  label: string;
  href: string;
  /** Font Awesome classes. */
  icon: string;
  /** mailto: links must not open in a new tab. */
  external: boolean;
}

export const EMAIL = 'dharani18it@gmail.com';

export const LOCATION = 'Bangalore, Karnataka';

export const RESUME_PATH = 'assets/J_DHARANI_RESUME.pdf';

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dharani-j-48a9001b1/',
    icon: 'fa-brands fa-linkedin',
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/dharanijayachandran',
    icon: 'fa-brands fa-github',
    external: true,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/dharanipriya_1806/',
    icon: 'fa-brands fa-instagram',
    external: true,
  },
  {
    label: `Email ${EMAIL}`,
    href: `mailto:${EMAIL}`,
    icon: 'fa-solid fa-envelope',
    external: false,
  },
];
