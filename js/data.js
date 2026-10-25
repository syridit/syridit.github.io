/*
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit this file to update the website.
 *  All text is rendered safely as plain text (no raw HTML).
 *  Use **double asterisks** for bold inside paragraphs/points.
 * ─────────────────────────────────────────────────────────────
 */
(() => {
  'use strict';

  const CAREER_START = new Date('2019-05-01');
  const YEARS = Math.floor((Date.now() - CAREER_START) / (365.25 * 24 * 60 * 60 * 1000));

  window.SITE = Object.freeze({
    name: 'Md. Sadman Yasar Ridit',
    initials: 'SR',
    email: 'syridit.prof@gmail.com',
    location: 'Dhaka, Bangladesh',
    photo: 'assets/me.jpeg',
    cv: 'assets/CV_Ridit.pdf',

    socials: [
      { label: 'GitHub', url: 'https://github.com/syridit', icon: 'github' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/syridit118', icon: 'linkedin' },
      { label: 'Stack Overflow', url: 'https://stackoverflow.com/users/16375479/devreddit', icon: 'stackoverflow' },
      { label: 'Facebook', url: 'https://www.facebook.com/syridit', icon: 'facebook' },
    ],

    hero: {
      eyebrow: 'Senior Software Engineer @ Optimizely',
      greeting: "Hi, I'm",
      nameLines: ['Sadman Yasar', 'Ridit.'], // last line gets the gradient
      rolePrefix: 'I build',
      roles: [
        'distributed systems.',
        'event-driven platforms.',
        'AI developer tools.',
        'payment & FinTech backends.',
        'software that scales.',
      ],
      tagline: `Backend & platform engineer with ${YEARS}+ years designing enterprise-scale systems across MarTech, FinTech, payments, investment management and government platforms.`,
    },

    about: {
      paragraphs: [
        `I'm a **Senior Software Engineer at Optimizely** based in Dhaka, Bangladesh, with **${YEARS}+ years** of designing and building enterprise-scale backend systems across MarTech, FinTech, payment processing, investment management and government platforms.`,
        'My home turf is **Java and the Spring ecosystem**, distributed systems and event-driven architectures — and lately, **AI-powered developer tooling**: from RAG assistants over payment specifications to orchestrating AI agents into everyday engineering workflows.',
        "I've led engineering teams of up to six, care deeply about test coverage and observability, and love turning weeks of manual operational work into reliable automation. Hands-on with GCP, AWS, Docker, Kafka and modern CI/CD.",
      ],
      quip: '// I turn coffee into code, use tabs over spaces and never broke production.',
    },

    education: [
      {
        degree: 'BSc in Computer Science and Engineering',
        school: 'Bangladesh University of Engineering and Technology (BUET)',
        period: '2015 — 2019',
      },
    ],

    // value is animated from 0; prefix/suffix are static.
    stats: [
      { value: YEARS, suffix: '+', label: 'Years of engineering' },
      { value: 378, label: 'Enterprise customers onboarded via automation' },
      { value: 1, suffix: 'M+', label: 'Users on payment features I shipped' },
      { value: 300, prefix: '~', suffix: ' TPS', label: 'Throughput after query optimisation' },
    ],

    experience: [
      {
        role: 'Senior Software Engineer',
        company: 'Optimizely',
        type: 'Full-time',
        location: 'Dhaka, Bangladesh',
        start: 'Jul 2026',
        end: 'Present',
        points: [
          'Designed and implemented **observability and structured logging** infrastructure for AI-powered Campaign workflows, improving production monitoring, debugging and operational visibility.',
          'Accelerated adoption of AI-assisted development by **orchestrating internal AI agents** into engineering workflows, improving developer productivity and feature delivery.',
        ],
      },
      {
        role: 'Software Engineer II',
        company: 'Optimizely',
        type: 'Full-time',
        location: 'Dhaka, Bangladesh',
        start: 'Aug 2025',
        end: 'Jun 2026',
        points: [
          'Designed and developed **context-aware backend services powering Optimizely Opal**, enabling AI-driven knowledge retrieval for Smart Campaigns.',
          'Automated enterprise customer onboarding with scalable provisioning workflows and structured logging — **378 Campaign customers onboarded**, eliminating weeks of manual effort.',
        ],
      },
      {
        role: 'Senior Software Engineer',
        company: 'Kona Software Lab Ltd.',
        type: 'Full-time',
        location: 'Dhaka, Bangladesh',
        start: 'Jan 2023',
        end: 'Aug 2025',
        groups: [
          {
            title: 'Card Personalization Service (GlobalPlatform & EMV)',
            points: [
              'Customized and modernized a legacy Spring-based Card Personalization platform for **Islami Bank Bangladesh**, enabling GlobalPlatform-compliant personalization workflows.',
              'Coordinated with engineering teams in South Korea to integrate personalization hardware through custom DLL development and machine interfaces.',
              'Built an internal **RAG assistant** over EMV, GlobalPlatform, Visa and Mastercard specifications, cutting documentation lookup time by **~75%**.',
              'Led a team of **six engineers**, mentoring developers and coordinating delivery across milestones.',
            ],
          },
          {
            title: 'Token Service Provider (EMV)',
            points: [
              'Designed and developed enterprise **tokenization services** compliant with EMV specifications as part of the KONA Integrated Platform.',
              'Built backend services with **TDD**, maintaining **90–100%** automated test coverage across critical modules.',
              'Led a five-member team while improving development workflows, sprint execution and code quality.',
            ],
          },
          {
            title: 'KIWA Investment Management Platform',
            points: [
              'Designed **tenant-aware authorization** with hierarchical role-based access control across multi-tenant investment organizations.',
              'Architected a configurable **approval engine** supporting dynamic approval chains and substitute approvers.',
              'Optimized complex queries and services, reaching **~300 TPS** with 100+ concurrent users.',
            ],
          },
        ],
      },
      {
        role: 'Software Engineer II',
        company: 'Kona Software Lab Ltd.',
        type: 'Full-time',
        location: 'Dhaka, Bangladesh',
        start: 'Jul 2021',
        end: 'Dec 2022',
        points: [
          'Designed and implemented backend services for **cryptocurrency wallet management** supporting Bitcoin and Ethereum transaction workflows.',
          'Built transaction journal and **fiat settlement** services ensuring reliable financial transaction processing.',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'Kona Software Lab Ltd.',
        type: 'Full-time',
        location: 'Dhaka, Bangladesh',
        start: 'Oct 2020',
        end: 'Jun 2021',
        points: [
          'Developed backend services for a Mobile Financial Services platform as part of a three-member team.',
          'Designed and implemented **circuit breaker** mechanisms improving resilience during third-party outages.',
          'Integrated **Bangla QR** payments into Dutch Bangla Bank Ltd. — NexusPay, serving **1M+ users** after launch.',
        ],
      },
      {
        role: 'Software Developer',
        company: 'CoKreates Limited',
        type: 'Full-time',
        location: 'Dhaka, Bangladesh',
        start: 'May 2019',
        end: 'Oct 2020',
        points: [
          "Built four core ERP modules — Meeting, Leave, Training and HR Management — for the Bangladesh Government's **Government Resource Planning (GRP)** platform.",
          'Supported production rollout across **twelve government offices**, including the Planning Ministry and ICT Division.',
          'Worked directly with stakeholders in an Agile environment, rapidly delivering evolving requirements.',
        ],
      },
    ],

    // categories drive the filter chips. Add `link: 'https://…'` to show an external link icon.
    projects: [
      {
        title: 'Opal Context Services',
        org: 'Optimizely',
        categories: ['AI', 'Platform'],
        description: 'Context-aware backend services powering Optimizely Opal, enabling AI-driven knowledge retrieval for Smart Campaigns.',
        tags: ['Java', 'AI Agents', 'Knowledge Retrieval'],
      },
      {
        title: 'Campaign Onboarding Automation',
        org: 'Optimizely',
        categories: ['Platform'],
        description: 'Scalable provisioning workflows that replaced weeks of manual enterprise onboarding work.',
        impact: '378 customers onboarded',
        tags: ['Automation', 'Provisioning', 'Structured Logging'],
      },
      {
        title: 'AI Campaign Observability',
        org: 'Optimizely',
        categories: ['AI', 'Platform'],
        description: 'Structured logging and observability for AI-powered Campaign workflows to improve monitoring and debugging in production.',
        tags: ['Observability', 'Logging', 'Monitoring'],
      },
      {
        title: 'Payment Spec RAG Assistant',
        org: 'Kona Software Lab',
        categories: ['AI', 'FinTech'],
        description: 'Internal Retrieval-Augmented Generation assistant over EMV, GlobalPlatform, Visa and Mastercard specifications.',
        impact: '~75% faster doc lookup',
        tags: ['RAG', 'LLM', 'EMV', 'GlobalPlatform'],
      },
      {
        title: 'Card Personalization Service',
        org: 'Kona × Islami Bank Bangladesh',
        categories: ['FinTech'],
        description: 'Modernized a legacy Spring platform for GlobalPlatform-compliant card personalization, integrated with hardware via custom DLLs.',
        impact: 'Led 6 engineers',
        tags: ['Spring', 'EMV', 'GlobalPlatform', 'Hardware'],
      },
      {
        title: 'Token Service Provider',
        org: 'Kona Integrated Platform',
        categories: ['FinTech'],
        description: 'EMV-compliant enterprise tokenization services built test-first.',
        impact: '90–100% test coverage',
        tags: ['EMV', 'Tokenization', 'TDD', 'JUnit'],
      },
      {
        title: 'KIWA Investment Management',
        org: 'Kona Software Lab',
        categories: ['FinTech', 'Platform'],
        description: 'Multi-tenant RBAC and a configurable approval engine with dynamic chains and substitute approvers.',
        impact: '~300 TPS · 100+ concurrent users',
        tags: ['Multi-tenancy', 'RBAC', 'Workflow Engine'],
      },
      {
        title: 'Crypto Wallet & Settlement',
        org: 'Kona Software Lab',
        categories: ['FinTech'],
        description: 'Wallet management for Bitcoin and Ethereum with transaction journal and fiat settlement services.',
        tags: ['Bitcoin', 'Ethereum', 'Ledger', 'Settlement'],
      },
      {
        title: 'NexusPay Bangla QR',
        org: 'Dutch Bangla Bank Ltd.',
        categories: ['FinTech'],
        description: 'Bangla QR payments integration plus circuit breakers for resilience against third-party outages.',
        impact: '1M+ users',
        tags: ['Payments', 'QR', 'Circuit Breaker'],
      },
      {
        title: 'Government Resource Planning',
        org: 'CoKreates × Govt. of Bangladesh',
        categories: ['GovTech'],
        description: 'Meeting, Leave, Training and HR Management ERP modules for the national GRP platform.',
        impact: '12 government offices',
        tags: ['ERP', 'Java', 'Agile'],
      },
    ],

    // Shown at the end of the projects grid. Remove to hide.
    projectsMore: {
      title: 'Side projects & experiments',
      text: 'Tools, experiments and open-source work live on my GitHub.',
      label: 'Browse GitHub',
      url: 'https://github.com/syridit',
    },

    marquee: ['Java', 'Spring Boot', 'Kafka', 'Distributed Systems', 'PostgreSQL', 'Redis', 'GCP', 'AWS', 'Docker', 'TypeScript', 'Python', 'RAG & AI Agents'],

    skills: [
      { group: 'Languages', items: ['Java', 'TypeScript', 'JavaScript', 'Python', 'Bash'] },
      { group: 'Backend', items: ['Spring Framework', 'Spring Boot', 'Spring MVC', 'Jersey', 'JSP', 'Servlets', 'REST APIs', 'NestJS', 'Node.js', 'FastAPI'] },
      { group: 'Architecture', items: ['Distributed Systems', 'Microservices', 'Event-Driven Architecture', 'TDD'] },
      { group: 'Messaging', items: ['Apache Kafka', 'RabbitMQ'] },
      { group: 'Databases & Caching', items: ['Oracle', 'PostgreSQL', 'MariaDB', 'MongoDB', 'Redis'] },
      { group: 'Cloud & DevOps', items: ['AWS', 'GCP', 'Docker', 'Jenkins', 'Nginx', 'Tomcat'] },
      { group: 'Testing', items: ['JUnit', 'Mockito', 'Selenium', 'JMeter'] },
      { group: 'Tools', items: ['Git', 'Gradle', 'Maven', 'Jira', 'Linear', 'Notion'] },
    ],

    // Add posts like: { title: '…', date: 'Nov 2026', summary: '…', url: 'https://…' }
    writing: [],
    writingPlaceholder: {
      title: 'Writing is on the way',
      text: 'Notes on distributed systems, platform engineering and building with AI agents — coming soon.',
    },

    contact: {
      title: "Let's build something reliable.",
      text: "Whether it's a backend that needs to scale, a platform problem, or just a chat about distributed systems and AI tooling — my inbox is open.",
    },
  });
})();
