import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

/* Stubs keep these tests about the shell, not the sections it hosts. */
@Component({ selector: 'app-about', template: '' })
class AboutStubComponent {}

@Component({ selector: 'app-project', template: '' })
class ProjectStubComponent {}

@Component({ selector: 'app-contact', template: '' })
class ContactStubComponent {}

@Component({ selector: 'app-copyright', template: '' })
class CopyrightStubComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let element: HTMLElement;

  beforeEach(async () => {
    localStorage.removeItem('portfolio-theme');

    await TestBed.configureTestingModule({
      imports: [NgbCollapseModule],
      declarations: [
        AppComponent,
        AboutStubComponent,
        ProjectStubComponent,
        ContactStubComponent,
        CopyrightStubComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.removeItem('portfolio-theme'));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'show-case-hub'`, () => {
    expect(component.title).toEqual('show-case-hub');
  });

  it('renders the hero name and role', () => {
    expect(element.querySelector('.hero-name')?.textContent).toContain('Dharani J');
    expect(element.querySelector('.hero-role')?.textContent).toContain('Full Stack Developer');
  });

  it('renders one nav link per section, each pointing at a section that exists', () => {
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('.navbar-nav .nav-link'));
    expect(links.length).toBe(component.navLinks.length);

    for (const link of links) {
      const id = link.getAttribute('href')?.replace('#', '') ?? '';
      expect(element.querySelector(`#${id}`))
        .withContext(`section #${id} should exist`)
        .toBeTruthy();
    }
  });

  it('offers the CV as a direct download', () => {
    const download = element.querySelector<HTMLAnchorElement>('.hero-actions a[download]');
    expect(download?.getAttribute('href')).toBe(component.resumePath);
  });

  it('labels every icon-only social link', () => {
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('.hero-social a'));
    expect(links.length).toBe(component.socialLinks.length);

    for (const link of links) {
      expect(link.getAttribute('aria-label')).toBeTruthy();
    }
  });

  it('starts with the mobile nav closed and toggles it', () => {
    expect(component.navCollapsed).toBeTrue();

    element.querySelector<HTMLButtonElement>('.nav-burger')?.click();
    fixture.detectChanges();

    expect(component.navCollapsed).toBeFalse();
  });

  it('closes the mobile nav once a link is followed', () => {
    component.navCollapsed = false;
    fixture.detectChanges();

    // triggerEventHandler, not .click() — a real click on an href="#..." anchor
    // navigates the Karma page and tears down the run.
    fixture.debugElement
      .query(By.css('.navbar-nav .nav-link'))
      .triggerEventHandler('click', new MouseEvent('click'));

    expect(component.navCollapsed).toBeTrue();
  });

  it('toggles the theme and reflects it on the document element', () => {
    const before = component.theme;

    component.toggleTheme();
    fixture.detectChanges();

    expect(component.theme).not.toBe(before);
    expect(document.documentElement.getAttribute('data-theme')).toBe(component.theme);
  });

  it('highlights no nav item until a section is scrolled into view', () => {
    expect(component.activeSection).toBe('');
    expect(element.querySelector('.nav-link.active')).toBeNull();
  });
});
