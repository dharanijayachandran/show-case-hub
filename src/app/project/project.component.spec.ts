import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Project, ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  /** The regular project grid, scoped away from the separate featured card. */
  function grid(): HTMLElement {
    return element.querySelector('.project-grid') as HTMLElement;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the featured project with its own card', () => {
    const featured = element.querySelector('.featured-card');
    expect(featured).toBeTruthy();
    expect(featured?.textContent).toContain(component.featuredProject.title);
  });

  it('renders a card per project in the grid', () => {
    expect(grid().querySelectorAll('.project-card').length).toBe(component.projects.length);
  });

  it('gives every screenshot alt text and lazy loading', () => {
    const images = Array.from(grid().querySelectorAll<HTMLImageElement>('.project-media img'));
    expect(images.length).toBe(component.projects.length);

    for (const image of images) {
      expect(image.getAttribute('alt')).toBeTruthy();
      expect(image.getAttribute('loading')).toBe('lazy');
    }
  });

  it('renders a tag list for each project in the grid', () => {
    expect(grid().querySelectorAll('.project-tags').length).toBe(component.projects.length);
  });

  it('only renders the link row for grid projects that have a URL', () => {
    const withLinks = component.projects.filter((p) => p.liveUrl || p.repoUrl).length;
    expect(grid().querySelectorAll('.project-links').length).toBe(withLinks);
  });

  it('renders both link buttons, opened safely, once a project has URLs', () => {
    const linked: Project = {
      title: 'Demo',
      blurb: 'A demo project.',
      tags: ['Angular'],
      image: 'assets/portfolio.webp',
      imageAlt: 'Demo screenshot',
      liveUrl: 'https://example.com',
      repoUrl: 'https://github.com/example/demo',
    };
    (component as { projects: readonly Project[] }).projects = [linked];
    fixture.detectChanges();

    const links = Array.from(grid().querySelectorAll<HTMLAnchorElement>('.project-links a'));
    expect(links.length).toBe(2);

    for (const link of links) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });
});
