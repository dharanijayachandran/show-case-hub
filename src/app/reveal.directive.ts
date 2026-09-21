import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  inject,
} from '@angular/core';

/**
 * Fades and lifts an element into view the first time it is scrolled to.
 *
 * Uses IntersectionObserver rather than scroll listeners so the work happens
 * off the main thread's hot path, and unobserves after the first reveal —
 * this is an entrance, not a state that should toggle back when the user
 * scrolls up past it.
 *
 * The observer callback runs outside Angular: it only adds a CSS class, so
 * there is nothing for change detection to do, and waking the whole app on
 * every scroll intersection would be pure waste.
 *
 * Honours prefers-reduced-motion by skipping the animation entirely — the
 * content is simply visible, never hidden behind an animation that will not
 * play.
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;

  /** Stagger, in ms, for elements revealed as a group. */
  @Input() appReveal: number | '' = '';

  ngAfterViewInit(): void {
    const element = this.host.nativeElement as HTMLElement;

    const prefersReducedMotion =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      element.classList.add('revealed');
      return;
    }

    const delay = typeof this.appReveal === 'number' ? this.appReveal : 0;
    if (delay) {
      element.style.transitionDelay = `${delay}ms`;
    }

    element.classList.add('reveal');

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              this.observer?.unobserve(entry.target);
            }
          }
        },
        // threshold 0 � any sliver counts. A percentage would be unreliable
        // for blocks taller than the viewport, which can never show 8% of
        // themselves at once on a small screen. The negative bottom margin is
        // what holds the reveal back until the element is properly on screen.
        { threshold: 0, rootMargin: '0px 0px -60px 0px' },
      );

      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
