import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { EMAIL, LOCATION, RESUME_PATH, SOCIAL_LINKS } from './site-data';
import { Theme, ThemeService } from './theme.service';

interface NavLink {
  /** Matches the id of the corresponding <section>. */
  id: string;
  label: string;
}

interface HeroStat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly title = 'show-case-hub';
  readonly socialLinks = SOCIAL_LINKS;
  readonly resumePath = RESUME_PATH;
  readonly email = EMAIL;
  readonly location = LOCATION;

  readonly navLinks: readonly NavLink[] = [
    { id: 'about', label: 'About' },
    { id: 'project', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  readonly heroStats: readonly HeroStat[] = [
    { value: '5+', label: 'Years experience' },
    { value: '55+', label: 'Components delivered' },
    { value: '10+', label: 'Production modules' },
    { value: '35%', label: 'Faster load times' },
  ];

  /** Mobile nav starts closed; bound to [ngbCollapse]. */
  navCollapsed = true;

  /** Empty while the hero is in view, so no nav item is falsely highlighted. */
  activeSection = '';

  theme: Theme = 'dark';

  private observer?: IntersectionObserver;
  private themeSub?: Subscription;

  constructor(private readonly themeService: ThemeService, private readonly zone: NgZone) {}

  ngOnInit(): void {
    this.themeSub = this.themeService.theme$.subscribe((theme) => (this.theme = theme));
  }

  ngAfterViewInit(): void {
    this.startScrollSpy();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.themeSub?.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  closeNav(): void {
    this.navCollapsed = true;
  }

  /**
   * Highlights the nav item for whichever section crosses the middle of the
   * viewport. The asymmetric rootMargin collapses the observation area to a
   * thin band there, so normally only one section qualifies at a time.
   */
  private startScrollSpy(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const sections = this.navLinks
      .map((link) => document.getElementById(link.id))
      .filter((element): element is HTMLElement => element !== null);

    if (!sections.length) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) {
          return;
        }

        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b
        );

        // IntersectionObserver callbacks can land outside Angular's zone.
        this.zone.run(() => (this.activeSection = topmost.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => this.observer?.observe(section));
  }
}
