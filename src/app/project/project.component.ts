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
