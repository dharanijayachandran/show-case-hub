import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbNavModule],
      declarations: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a tab for experience, education and skills', () => {
    const tabs = Array.from(element.querySelectorAll('.about-tabs .nav-link')).map((tab) =>
      tab.textContent?.trim()
    );
    expect(tabs).toEqual(['Experience', 'Education', 'Skills']);
  });

  it('shows the experience timeline first', () => {
    const companies = Array.from(element.querySelectorAll('.company-name')).map((el) =>
      el.textContent?.trim()
    );
    expect(companies).toEqual(component.experience.map((job) => job.company));
  });

  it('renders a chip for every skill once the skills tab is active', () => {
    component.activeTab = 'skills';
    fixture.detectChanges();

    const expected = component.skillGroups.reduce((total, group) => total + group.skills.length, 0);
    expect(element.querySelectorAll('.skill-list .tag').length).toBe(expected);
  });

  it('renders every education entry when that tab is active', () => {
    component.activeTab = 'education';
    fixture.detectChanges();

    expect(element.querySelectorAll('.entry-card').length).toBe(component.education.length);
  });
});
