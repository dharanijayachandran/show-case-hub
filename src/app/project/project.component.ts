import { Component } from '@angular/core';

export interface Project {
  title: string;
  blurb: string;
  tags: string[];
  image: string;
  /** Describes the screenshot for screen readers. */
  imageAlt: string;
  /** Link buttons render only when a URL is present. */
  liveUrl?: string;
  repoUrl?: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  /**
   * TODO(dharani): add `liveUrl` / `repoUrl` for each project — the cards
   * already render "Live demo" and "Code" buttons as soon as a URL exists.
   * Worth tightening the blurbs and tags to match what each project really does.
   */
  readonly projects: readonly Project[] = [
    {
      title: 'Weather',
      blurb:
        'A weather app that surfaces current conditions and forecast details in a clean, responsive layout.',
      tags: ['Angular', 'TypeScript', 'REST API'],
      image: 'assets/weather.avif',
      imageAlt: 'Screenshot of the Weather app showing current conditions',
    },
    {
      title: 'Portfolio Website',
      blurb:
        'This site — a single-page Angular portfolio with a light/dark theme, scroll-spy navigation and an email-backed contact form.',
      tags: ['Angular 15', 'Bootstrap 5', 'Responsive'],
      image: 'assets/portfolio.webp',
      imageAlt: 'Screenshot of the portfolio website home page',
    },
    {
      title: 'Tracker App',
      blurb:
        'A tracker application with a dashboard-style interface for reviewing records at a glance.',
      tags: ['Angular', 'TypeScript', 'Dashboard'],
      image: 'assets/tracker.webp',
      imageAlt: 'Screenshot of the Tracker app dashboard',
    },
  ];
}
