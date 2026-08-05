import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'dark' | 'light';

/** localStorage key — must match the pre-paint script in index.html. */
const STORAGE_KEY = 'portfolio-theme';

/**
 * Owns the light/dark theme: reads the choice the pre-paint script already
 * resolved, lets the user flip it, and remembers the decision.
 *
 * Everything touching Storage is guarded — Safari in private mode and
 * cookie-blocking setups throw on access rather than returning null.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly subject = new BehaviorSubject<Theme>(this.readInitialTheme());

  /** Current theme, for templates to subscribe to. */
  readonly theme$ = this.subject.asObservable();

  constructor() {
    // The pre-paint script normally set this already; re-applying keeps the
    // DOM correct if that script was stripped or failed.
    this.apply(this.subject.value);
  }

  get theme(): Theme {
    return this.subject.value;
  }

  toggle(): void {
    this.set(this.theme === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this.apply(theme);
    this.subject.next(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Persisting is a nicety; the session still works without it.
    }
  }

  private apply(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private readInitialTheme(): Theme {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') {
      return attr;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {
      // Fall through to the OS preference.
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
}
