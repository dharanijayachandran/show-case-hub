import { Component } from '@angular/core';

export interface Project {
  title: string;
  blurb: string;
  tags: string[];
  /** Omitted for projects with no UI to screenshot yet (backend-only work in progress). */
  image?: string;
  /** Describes the screenshot for screen readers. */
  imageAlt?: string;
  /** Link buttons render only when a URL is present. */
  liveUrl?: string;
  repoUrl?: string;
  /** Short status badge, e.g. "In active development" — omit once finished. */
  status?: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  readonly featuredProject: Project = {
    title: 'Clinic Appointment Booking System',
    blurb:
      'Full-stack booking system built to demonstrate production-grade backend engineering. The core problem: two patients try to book the same slot at the same moment — exactly one wins, enforced at the database level with row-level locking and a partial unique constraint, not application-side guessing. Verified with a JUnit test that fires simultaneous bookings.',
    tags: ['Java 17', 'Spring Boot 3', 'PostgreSQL', 'Angular 18', 'WebSocket', 'Docker'],
    repoUrl: 'https://github.com/dharanijayachandran/clinic-booking-system',
    status: 'In active development — Phase 2 of 8 (auth: JWT, roles, cookies) complete',
  };

  /**
   * TODO(dharani): add `liveUrl` for each project — the cards already render
   * a "Live demo" button as soon as one is set.
   */
  readonly projects: readonly Project[] = [
    {
      title: 'Markdown Live Previewer',
      blurb:
        'Split-pane Markdown editor with a real-time rendered preview, browser-side autosave, and export to .md or .html — no backend, no build step.',
      tags: ['JavaScript', 'HTML5', 'CSS3'],
      image: 'assets/markdown-previewer.png',
      imageAlt: 'Screenshot of the Markdown Live Previewer split-pane editor',
      liveUrl: 'https://dharanijayachandran.github.io/markdown-previewer/',
      repoUrl: 'https://github.com/dharanijayachandran/markdown-previewer',
    },
    {
      title: 'QR Code Generator',
      blurb:
        'Turn a link, plain text, Wi-Fi login, email, phone number or contact card into a downloadable QR code — customizable size and colors, entirely client-side.',
      tags: ['JavaScript', 'HTML5', 'CSS3'],
      image: 'assets/qr-code-generator.png',
      imageAlt: 'Screenshot of the QR Code Generator with a generated code',
      liveUrl: 'https://dharanijayachandran.github.io/qr-code-generator/',
      repoUrl: 'https://github.com/dharanijayachandran/qr-code-generator',
    },
    {
      title: 'Expense Tracker',
      blurb:
        'Log income and expenses, track a running balance and spending by category, and export everything to CSV — data stays in your browser.',
      tags: ['Angular', 'TypeScript', 'Local Storage'],
      image: 'assets/expense-tracker.png',
      imageAlt: 'Screenshot of the Expense Tracker showing balance, income, expenses and a transaction list',
      liveUrl: 'https://dharanijayachandran.github.io/expense-tracker/',
      repoUrl: 'https://github.com/dharanijayachandran/expense-tracker',
    },
    {
      title: 'Password Generator',
      blurb:
        'Generate strong random passwords with customizable length and character sets, plus a separate strength checker with a live entropy score — nothing ever leaves your browser.',
      tags: ['React', 'JavaScript', 'Vite'],
      image: 'assets/password-generator.png',
      imageAlt: 'Screenshot of the Password Generator with a generated password and strength checklist',
      liveUrl: 'https://dharanijayachandran.github.io/password-generator/',
      repoUrl: 'https://github.com/dharanijayachandran/password-generator',
    },
  ];
}
