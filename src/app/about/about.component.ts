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

  readonly experience: readonly ExperienceEntry[] = [
    {
      company: 'AdMax Local',
      role: 'Front End Developer',
      details: [
        { label: 'Duration', value: '2 years' },
      ],
      points: [
        'Build and maintain responsive, accessible web applications with angular, react, HTML, CSS, JavaScript and modern frameworks.',
        'Optimize front-end performance to improve load speed, responsiveness and accessibility scores.',
        'Partner with designers and backend engineers to integrate REST APIs into cohesive user journeys.',
        'Refine UI and UX based on analytics and user feedback rather than assumption.',
        'Verify cross-browser and cross-device behavior for every front-end feature before release.',
      ],
    },
    {
      company: 'Imtac India Private Limited',
      role: 'Software Engineer',
      details: [
        { label: 'Role', value: 'Angular Developer at Empyreal Universe (IoT Platform - Street-light Product)' },
        { label: 'Period', value: '2021 - 2024' },
        { label: 'Duration', value: '2 years 10 months' },
      ],
      points: [
        'Built and maintained the SL-Map street-light management interface and its operational dashboards with Angular Material.',
        'Upgraded production Angular projects from CLI 9 through 16, modernizing build tooling and dependencies along the way.',
        'Developed interactive single-page applications with TypeScript, HTML5, CSS and Bootstrap, composed through Single-SPA.',
        'Integrated RESTful APIs and contributed backend work in Java, Spring Boot and SQL.',
        'Delivered in Agile cycles, taking part in sprint planning, estimation and peer code review.',
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
        'Bootstrap 5',
        'CSS 3',
        'TypeScript',
        'JavaScript',
        'HTML5',
        'Rxjs',
        'JSF',
        'Angular Material',
      ],
    },
    {
      title: 'Backend Technologies',
      skills: ['Java', 'API Gateway (Apisix)', 'PostgreSQL', 'Oracle'],
    },
    {
      title: 'Version Control',
      skills: ['Git', 'SVN'],
    },
    {
      title: 'Tools',
      skills: [
        'Visual Studio Code',
        'GitHub',
        'PgAdmin',
        'Eclipse',
        'Postman',
        'WinSCP',
        'PuTTY',
        'Spring Tool Suite',
        'Jira',
        'SQL Developer',
      ],
    },
  ];
}
