import { Component } from '@angular/core';

interface ExperienceEntry {
  company: string;
  role: string;
  /** Optional extra facts rendered above the bullet points. */
  details?: { label: string; value: string }[];
  points: string[];
}

interface EducationEntry {
  qualification: string;
  institution: string;
  location: string;
  year: string;
  score: string;
}

interface SkillGroup {
  title: string;
  skills: string[];
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  activeTab = 'experience';

  /** How many bullet points show by default on mobile before "Show more". */
  readonly collapsedPointCount = 3;

  /** Company names currently expanded to their full bullet list on mobile. */
  private readonly expandedCompanies = new Set<string>();

  isExpanded(company: string): boolean {
    return this.expandedCompanies.has(company);
  }

  toggleExpanded(company: string): void {
    if (this.expandedCompanies.has(company)) {
      this.expandedCompanies.delete(company);
    } else {
      this.expandedCompanies.add(company);
    }
  }

  readonly experience: readonly ExperienceEntry[] = [
    {
      company: 'AdMax Local',
      role: 'Frontend Developer, Engineering Team',
      details: [
        { label: 'Period', value: 'Sep 2024 - Sep 2026' },
        { label: 'Duration', value: '2 years' },
      ],
      points: [
        'Drove front-end development of AdMax, an AI-driven advertising platform for ad creation, testing, automation and performance insights, contributing to 8+ major feature releases.',
        'Built 25+ reusable Angular and React components that cut new ad-creation feature development time by approximately 30%.',
        'Reduced dashboard load times by around 35% through code refactoring, lazy loading and efficient RxJS state management.',
        'Integrated 15+ RESTful API endpoints to power real-time ad performance data, eliminating manual reporting for campaign managers.',
        'Translated design mockups into pixel-perfect, responsive UI with Tailwind CSS and Angular Material, achieving consistent rendering across 10+ device and browser combinations.',
        'Implemented form validation and error-handling flows in the ad-creation module, reducing user input errors by roughly 40%.',
        'Resolved 100+ cross-browser UI defects with QA teams, improving release stability.',
        'Mentored 2 junior developers on Angular and React best practices, shortening onboarding time.',
        'Partnered with product and data teams across 2-week Agile sprints, consistently delivering committed scope on schedule.',
      ],
    },
    {
      company: 'Imtac India Private Limited',
      role: 'UI Developer, Empyreal Universe',
      details: [
        { label: 'Project', value: 'IoT Platform - Street-light Product' },
        { label: 'Period', value: 'Dec 2021 - Sep 2024' },
        { label: 'Duration', value: '2 years 10 months' },
      ],
      points: [
        'Delivered 3 core IoT modules including a Street Light Map, an analytics dashboard with advanced chart visualizations, and asset/statistics listings used by municipal operators.',
        'Upgraded 4 Angular projects from CLI 9 to 16, improving build performance and removing deprecated dependencies with zero production regressions.',
        'Architected 30+ scalable, modular components using Angular Material and RxJS, establishing state-management standards adopted across the team.',
        'Maintained production stability for 7+ consecutive months with no major incidents by owning the full project lifecycle and CI/CD pipeline.',
        'Raised unit test coverage to 80%+, catching regressions earlier and reducing defects reaching QA.',
        'Secured user sessions across all modules by implementing Keycloak-based authentication and role-based access control.',
        'Configured and maintained Tomcat server deployments, supporting reliable release rollouts.',
      ],
    },
    {
      company: 'ICT Health (Informal Collaborate Transform)',
      role: 'Full Stack Developer',
      points: [
        'Developed healthcare software across the stack with Java, JSF and Oracle.',
        'Tuned Oracle database queries to improve application response times.',
        'Implemented ICD-11 diagnostic coding support and reviewed peer contributions.',
        'Built a patient portal on Java and Oracle, giving patients self-service access to their records.',
        'Delivered a scheduling system that streamlined day-to-day clinical operations.',
      ],
    },
  ];

  readonly education: readonly EducationEntry[] = [
    {
      qualification: 'M.E (C.S.E)',
      institution: 'E.G.S Pillay Engineering College',
      location: 'Nagapattinam, TN',
      year: '2025 - 2027 - currently pursuing',
      score: '80%',
    },
    {
      qualification: 'B.Tech - IT',
      institution: 'E.G.S Pillay Engineering College',
      location: 'Nagapattinam, TN',
      year: '2021',
      score: '88%',
    },
    {
      qualification: 'Higher Secondary',
      institution: "St. Theresa's Girls Hr. Sec. School",
      location: 'Thiruthuraipoondi, TN',
      year: '2017',
      score: '81%',
    },
    {
      qualification: 'SSLC',
      institution: 'Infant Jesus Matric. School',
      location: 'Thevur, TN',
      year: '2015',
      score: '96%',
    },
  ];

  readonly skillGroups: readonly SkillGroup[] = [
    {
      title: 'Frontend Technologies',
      skills: [
        'Angular (CLI Version 9 to 16)',
        'React',
        'TypeScript',
        'JavaScript (ES6+)',
        'HTML5',
        'CSS 3',
        'Tailwind CSS',
        'Bootstrap 5',
        'Rxjs',
        'Angular Material',
        'JSF',
      ],
    },
    {
      title: 'Backend Technologies',
      skills: ['Java', 'Spring Boot', 'API Gateway (Apisix)', 'SQL', 'PostgreSQL', 'Oracle'],
    },
    {
      title: 'Version Control',
      skills: ['Git', 'GitHub', 'SVN', 'Bitbucket'],
    },
    {
      title: 'Tools',
      skills: [
        'Visual Studio Code',
        'Eclipse',
        'Spring Tool Suite',
        'Postman',
        'PgAdmin',
        'SQL Developer',
        'Jenkins',
        'Keycloak',
        'WinSCP',
        'PuTTY',
        'Jira',
      ],
    },
  ];
}
