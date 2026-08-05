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
        { label: 'Duration', value: '1 year 11 months' },
      ],
      points: [
        'Worked as a Front-End Developer at Admax Local, focusing on building and maintaining responsive web applications.',
        'Developed user-friendly interfaces using HTML, CSS, JavaScript, and modern frameworks.',
        'Optimized website performance to improve load speed and accessibility.',
        'Collaborated with designers and backend developers to integrate APIs and deliver seamless user experiences.',
        'Implemented UI/UX improvements based on analytics and user feedback.',
        'Ensured cross-browser and cross-device compatibility for all front-end features.',
      ],
    },
    {
      company: 'Imtac India Private Limited',
      role: 'Software Engineer',
      details: [
        { label: 'Role', value: 'Angular Developer at Empyreal Universe (IoT Platform - Street-light Product)' },
        { label: 'Period', value: '2021 - 2024' },
        { label: 'Duration', value: '2 years' },
      ],
      points: [
        'Angular developer with 3 years in IoT and healthcare.',
        'Skilled in Angular UI, Java, Spring Boot, and SQL.',
        'Experienced with SL-Map and dashboards using Angular Material.',
        'Proficient in Agile, CLI, and Single-SPA.',
        'Upgraded Angular projects from CLI 9 to 16.',
        'Developed interactive web apps with TypeScript, JavaScript, HTML5, CSS, JSON, and Bootstrap.',
        'Integrated RESTful APIs and created SPAs with Angular single SPA.',
      ],
    },
    {
      company: 'ICT Health (Informal Collaborate Transform)',
      role: 'Full Stack Developer',
      points: [
        'Developed healthcare software using JSF, Oracle, and Java.',
        'Optimized Oracle DB queries for better performance.',
        'Implemented ICD 11 and performed code reviews.',
        'Created a patient portal with Oracle and Java.',
        'Enhanced user experience and streamlined processes with Java.',
        'Improved healthcare operations with a scheduling system.',
      ],
    },
  ];

  readonly education: readonly EducationEntry[] = [
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
