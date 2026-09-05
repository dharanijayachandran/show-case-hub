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
      title: 'Weather',
      blurb:
        'Responsive weather client that presents current conditions and forecast detail in a single uncluttered view, backed by a public REST API.',
      tags: ['Angular', 'TypeScript', 'REST API'],
      image: 'assets/weather.avif',
      imageAlt: 'Screenshot of the Weather app showing current conditions',
    },
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
  ];
}
