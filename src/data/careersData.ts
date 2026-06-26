import type { Career, QuizQuestion } from '../types/career';

export const careers: Career[] = [
  {
    id: 'ai-ethicist',
    title: 'AI Ethicist & Solutions Architect',
    track: 'Track 03: AI That Actually Helps People',
    description: 'Design and audit AI systems to ensure they are accessible, unbiased, and benefit local communities. You bridge the gap between human empathy and algorithmic power, making technology work for accessibility, neurodiversity, and social good.',
    salary: '$115,000 - $175,000',
    growth: '+35% (Extremely High)',
    aiImpact: 'AI will create high demand for this role as compliance, ethics, and human safety guardrails become mandatory for every enterprise.',
    skills: ['Inclusive Design (A11y)', 'Ethics & Bias Auditing', 'Prompt Engineering', 'Python', 'UX Research'],
    tools: ['Gemini API Safeguards', 'A11y Auditing DevTools', 'IBM AI Fairness 360', 'Figma'],
    roadmap: [
      {
        title: 'Phase 1: High School Exploration',
        description: 'Build projects centered around community problems. Learn web accessibility basics (HTML structure, ARIA labels, semantic HTML).',
        items: [
          'Build an accessible web tool for senior citizens or neurodivergent students.',
          'Read the WCAG (Web Content Accessibility Guidelines) standard.',
          'Take a free intro course on Ethics in AI (Coursera / edX).'
        ]
      },
      {
        title: 'Phase 2: College Majors & Paths',
        description: 'Focus on interdisciplinary studies combining technology and humanities.',
        items: [
          'Major in Cognitive Science, Computer Science, or Ethics & Technology.',
          'Contribute to open-source accessibility libraries on GitHub.',
          'Participate in social impact hackathons.'
        ]
      },
      {
        title: 'Phase 3: Portfolio & Specialization',
        description: 'Prove that you can write clean, accessible code and analyze systemic models.',
        items: [
          'Design an audit case study reviewing a popular public AI tool for bias.',
          'Write a React component library certified for perfect contrast and keyboard navigation.',
          'Obtain the IAAP Certified Professional in Accessibility Core Competencies (CPACC) credential.'
        ]
      },
      {
        title: 'Phase 4: Pro Tools to Master',
        description: 'Become a power user of testing and guardrailing frameworks.',
        items: [
          'Learn to use Chrome DevTools Lighthouse audit and axe-core.',
          'Understand semantic routing and LLM output parsing safety.'
        ]
      }
    ],
    interviewQuestions: [
      {
        question: 'An AI tutoring bot you are designing starts using language that could alienate students with learning disabilities. How do you address this?',
        idealConcepts: [
          'Implement semantic filtering / guardrails',
          'Conduct testing with neurodiverse focus groups',
          'Create fallback modes with simpler instruction options',
          'Establish a structured feedback loop for users'
        ],
        sampleBest: 'I would approach this by first inserting a safety filter or guardrail layer to screen the bot\'s responses. Next, I would initiate a feedback audit by collaborating with special education educators and students with learning disabilities. I would build dynamic vocabulary settings that adapt complexity based on user preference, ensuring the bot remains supportive, encouraging, and highly accessible.'
      },
      {
        question: 'How do you design a website that is usable by someone who is visually impaired and using a screen reader?',
        idealConcepts: [
          'Use semantic HTML elements (nav, main, header, footer)',
          'Provide clear, meaningful alt text for all descriptive images',
          'Ensure fully keyboard-navigable pages',
          'Use ARIA labels and roles only when native HTML is insufficient'
        ],
        sampleBest: 'I ensure my layout uses strict semantic HTML5 tags rather than generic divs, which helps screen readers outline the document. I provide alt attributes with descriptive text for visual content, keep focus indicators visible for keyboard users, and use ARIA live regions for active updates. Finally, I run automated checks with axe-core and manually test using a screen reader like VoiceOver.'
      }
    ]
  },
  {
    id: 'fintech-green-analyst',
    title: 'Fintech & Sustainable Venture Analyst',
    track: 'Track 01: Money, Jobs & AI',
    description: 'Use AI algorithms to track carbon footprints, predict green energy market yields, and audit corporate financial sheets. You empower investors to make smart, profitable financial choices that also preserve the planet.',
    salary: '$95,000 - $160,000',
    growth: '+22% (Very High)',
    aiImpact: 'AI will automate manual spreadsheet calculations, shifting your work towards high-level strategic auditing and algorithmic carbon asset pricing.',
    skills: ['Algorithmic Modeling', 'Financial Auditing', 'SQL & Vector DBs', 'Data Visualization', 'ESG Standards'],
    tools: ['Python Pandas/NumPy', 'Tableau', 'Alpaca API (Trading)', 'Carbon Accounting APIs'],
    roadmap: [
      {
        title: 'Phase 1: High School Exploration',
        description: 'Get familiar with spreadsheet automation and basic microeconomics.',
        items: [
          'Build a personal expense analyzer that labels transactions automatically using simple logic or API.',
          'Participate in mock stock trading challenges with a focus on ESG (Environmental, Social, Governance) funds.',
          'Learn basic Python for data analysis (manipulating CSV files with Pandas).'
        ]
      },
      {
        title: 'Phase 2: College Majors & Paths',
        description: 'Focus on finance paired with computer science or environmental sciences.',
        items: [
          'Major in Financial Engineering, Quantitative Economics, or Sustainability.',
          'Build automated web scrapers to gather climate news and correlate it with energy prices.',
          'Intern at a boutique fintech startup or impact investment fund.'
        ]
      },
      {
        title: 'Phase 3: Portfolio & Specialization',
        description: 'Develop portfolio artifacts that show off your quantitative capabilities.',
        items: [
          'Create an open-source dashboard analyzing municipal carbon offset data.',
          'Build a backtesting simulation showing the returns of a green-energy stock algorithm.',
          'Write whitepapers explaining the financial viability of solar grids in suburban areas.'
        ]
      },
      {
        title: 'Phase 4: Pro Tools to Master',
        description: 'Familiarize yourself with industry-grade data and transaction systems.',
        items: [
          'Learn to use Bloomberg terminal basics (or open-source alternatives like OpenBB).',
          'Master SQL queries, API integration, and vector search databases.'
        ]
      }
    ],
    interviewQuestions: [
      {
        question: 'We want to launch an AI tool that predicts clean energy stock yields. How do you verify that the predictions are reliable?',
        idealConcepts: [
          'Perform historic backtesting over multiple market cycles',
          'Analyze data quality and source transparency',
          'Evaluate confidence intervals and predict margins of error',
          'Incorporate weather models and policy shifts'
        ],
        sampleBest: 'I would set up a rigorous backtesting framework using historical stock and weather data from the past 10 years, ensuring we test during high-volatility periods. I would also add model confidence intervals, so the user knows the probability of the prediction. Finally, I would cross-reference the output with real-time green regulatory changes to adjust predictions based on legislative changes.'
      },
      {
        question: 'How can AI help small local businesses manage their carbon offsets and budgets simultaneously?',
        idealConcepts: [
          'Automate transaction parsing to label carbon footprints',
          'Provide actionable, low-cost offset suggestions',
          'Track tax credits for green business practices',
          'Provide clear, simple dashboard data visualizations'
        ],
        sampleBest: 'We can build an API-driven expense analyzer that maps regular purchases (like utilities, travel, and materials) to carbon emissions. The AI can then identify cost-saving green alternatives—such as switching to a local supplier to cut shipping emissions—allowing small businesses to trim expenditures and reduce carbon output in one unified interface.'
      }
    ]
  },
  {
    id: 'creative-technologist',
    title: 'AI Film Director & Creative Technologist',
    track: 'Track 02: I\'m a Creator',
    description: 'Pioneer the future of digital media by blending storytelling with generative AI tools. You build custom workflows that let creators produce premium short movies, advertisements, and interactive content at 10x speed, while preserving their unique artistic voice.',
    salary: '$80,000 - $145,000',
    growth: '+28% (High)',
    aiImpact: 'AI will supercharge production capabilities, enabling small creative teams to produce Hollywood-level VFX, script layouts, and visuals.',
    skills: ['Storyboarding', 'Video Generation AI', 'CSS Scroll-Driven Animations', 'Audio Design', 'UI/UX Design'],
    tools: ['Midjourney / Stable Diffusion', 'Runway / Luma Dream Machine', 'Adobe Premiere Pro', 'Web Audio API'],
    roadmap: [
      {
        title: 'Phase 1: High School Exploration',
        description: 'Focus on producing, editing, and interactive web layouts.',
        items: [
          'Create a 2-minute short film or advertisement using open-source AI video generators.',
          'Learn basic video editing techniques, framing, color grading, and audio layering.',
          'Build an interactive web-based portfolio showcasing your designs.'
        ]
      },
      {
        title: 'Phase 2: College Majors & Paths',
        description: 'Explore disciplines that fuse computer graphics with cinematic arts.',
        items: [
          'Major in Interactive Media, Film Production, or Computer Science (Graphics focus).',
          'Develop web apps that allow users to generate storyboards dynamically.',
          'Collaborate on indie film sets or content marketing campaigns.'
        ]
      },
      {
        title: 'Phase 3: Portfolio & Specialization',
        description: 'Amass a portfolio that displays creative taste along with technical command.',
        items: [
          'Release a personal AI-assisted web narrative that reacts to user scrolls and choices.',
          'Publish a guide detailing custom workflows for audio synthesis and voice-cloning alignments.',
          'Produce high-impact promotional ads for small brands utilizing generative AI.'
        ]
      },
      {
        title: 'Phase 4: Pro Tools to Master',
        description: 'Master rendering, composition, and interactive browser audio synthesis.',
        items: [
          'Understand audio buffering, synthesizer generation, and CSS view-transitions.',
          'Master Davinci Resolve, Runway Gen-2/3, and custom Stable Diffusion prompts.'
        ]
      }
    ],
    interviewQuestions: [
      {
        question: 'How do you address the criticism that using AI in content creation dilutes the original voice of the artist?',
        idealConcepts: [
          'View AI as an assistant or camera, not the author',
          'Focus on human curation, styling, and conceptual design',
          'Emphasize iterative prompt adjustments and custom parameters',
          'Maintain final creative edit and story structure control'
        ],
        sampleBest: 'I treat generative AI as an advanced synthesizer or digital camera. The AI generates raw materials, but the human artist directs the narrative, controls the visual tone, edits clips together, and adds the emotional core. The voice doesn\'t come from the algorithm; it comes from the curated selection, editing, and intent of the human director who shapes the chaotic outputs into a cohesive, meaningful story.'
      },
      {
        question: 'Describe a creative web layout that keeps users engaged when viewing a media portfolio.',
        idealConcepts: [
          'Use CSS view transitions for smooth page loads',
          'Incorporate scroll-driven micro-animations',
          'Build dynamic audio cues for UI elements',
          'Avoid heavy image loads with lazy loading and priority flags'
        ],
        sampleBest: 'I would implement a glassmorphic card layout that utilizes CSS scroll-driven animations to reveal video frames as the user scrolls. I would add subtle, dynamic synthesizer feedback using the Web Audio API on card hover, and optimize Largest Contentful Paint by adding high fetchpriority to the hero banner, ensuring it renders instantly.'
      }
    ]
  },
  {
    id: 'learning-experience-designer',
    title: 'AI EdTech & Career Architect',
    track: 'Track 04: What Do I Even Do With My Life? (AI Can Help)',
    description: 'Rebuild career and college planning systems for high school students. You build platforms that analyze student passions, suggest learning paths, and coach them through interviews so they can navigate the future of work with confidence.',
    salary: '$85,000 - $135,000',
    growth: '+18% (Steady)',
    aiImpact: 'AI will enable hyper-personalized tutoring and simulation, making your role crucial to design the logic, UX, and educational pipelines.',
    skills: ['Educational Psychology', 'Curriculum Engineering', 'Systemic Prompting', 'TypeScript', 'UI/UX Interactive Flows'],
    tools: ['Gemini / OpenAI API', 'Vite & React', 'State Machines', 'Google Workspace Add-ons'],
    roadmap: [
      {
        title: 'Phase 1: High School Exploration',
        description: 'Engage in mentorship and educational resource building.',
        items: [
          'Volunteer as a tutor and notice where current educational materials fail.',
          'Build a simple interactive website that explains a complex topic (like math or coding) visually.',
          'Analyze career options and record what data is missing for high schoolers.'
        ]
      },
      {
        title: 'Phase 2: College Majors & Paths',
        description: 'Focus on computer science, learning science, or communications.',
        items: [
          'Major in Educational Technology, Human-Computer Interaction (HCI), or Sociology.',
          'Design and test interactive quizzes with student groups.',
          'Intern at EdTech companies or career centers.'
        ]
      },
      {
        title: 'Phase 3: Portfolio & Specialization',
        description: 'Build projects that demonstrate structural learning benefits and UI clarity.',
        items: [
          'Create a full-fledged mock interview platform with customized evaluation dashboards.',
          'Design an interactive syllabus generator that builds a study guide based on a text prompt.',
          'Publish case studies on UX onboarding flows for younger students.'
        ]
      },
      {
        title: 'Phase 4: Pro Tools to Master',
        description: 'Learn logic flow architectures, client state management, and schema structures.',
        items: [
          'Master React hooks, local storage data persistence, and clean layouts.',
          'Understand prompting parameters (temperature, system instructions, structured JSON).'
        ]
      }
    ],
    interviewQuestions: [
      {
        question: 'High school students can get bored easily. How do you design an AI learning interface that maintains high engagement?',
        idealConcepts: [
          'Use gamification elements (badges, micro-rewards, progression bars)',
          'Provide bite-sized content chunks to avoid cognitive overload',
          'Create interactive elements (card sorting, dragging, clicking)',
          'Provide instant, constructive, positive feedback loops'
        ],
        sampleBest: 'I design with short, interactive loops. Instead of long pages of text, I break content into bite-sized cards. I use progress bars, micro-animations, and celebratory sound effects when tasks are completed. For example, in an interview coach, I don\'t just show a scorecard—I show a visual map of skills leveling up in real-time, matching gaming mechanics to educational milestones.'
      },
      {
        question: 'How do you ensure career advice provided by an AI is not outdated or reinforcing gender/racial stereotypes?',
        idealConcepts: [
          'Anchor recommendations on verified skills, not demographic trends',
          'Use a diverse training data baseline and filter out gender-coded phrases',
          'Review recommendations manually for equity and inclusion',
          'Highlight alternative non-traditional paths explicitly'
        ],
        sampleBest: 'I anchor the AI matching logic strictly on skills, interest vectors, and cognitive preferences, completely omitting variables like gender, location, or socioeconomic status. I also audit the response generator to actively suggest non-traditional paths (e.g., matching young women to STEM roles or young men to care-oriented roles) and keep the career database up-to-date with dynamic market data.'
      }
    ]
  },
  {
    id: 'ai-startup-founder',
    title: 'AI Product Maker & Startup Founder',
    track: 'Track 05: I Have an Idea (Open Track)',
    description: 'You are a multi-skilled generalist who spots market inefficiencies and designs digital startups from scratch. Armed with generative AI, you build full-stack prototypes, design marketing campaigns, and pitch products at the speed of thought.',
    salary: 'Self-Funded / Equity ($0 - $1M+)',
    growth: '+40% (Highly Volatile)',
    aiImpact: 'AI is the primary catalyst, lowering the cost of launching software prototypes to near zero and enabling solo founders to compete with established firms.',
    skills: ['Rapid Prototyping', 'Product Management', 'API Integrations', 'Marketing Copywriting', 'Financial Forecasting'],
    tools: ['Cursor / VS Code', 'Gemini API', 'Stripe API (Payments)', 'Vercel / Netlify'],
    roadmap: [
      {
        title: 'Phase 1: High School Exploration',
        description: 'Learn to build and ship software quickly, and pitch it persuasively.',
        items: [
          'Build and deploy a simple web service that solves a problem you face daily.',
          'Learn to pitch ideas in 60 seconds (hook, problem, solution, business model).',
          'Understand basic API integrations (sending requests, handling JSON responses).'
        ]
      },
      {
        title: 'Phase 2: College Majors & Paths',
        description: 'Gain exposure to business foundations, product strategy, and engineering.',
        items: [
          'Major in Computer Science, Business Entrepreneurship, or Systems Engineering.',
          'Participate in startup accelerators, pitch contests, and local hackathons.',
          'Launch a micro-SaaS product and acquire your first 50 users.'
        ]
      },
      {
        title: 'Phase 3: Portfolio & Specialization',
        description: 'Prove that you can take an idea from concept to launch with actual users.',
        items: [
          'Maintain an active GitHub portfolio of shipped, live products.',
          'Create detailed case studies on product-market fit, onboarding flows, and customer feedback.',
          'Build a YouTube channel, Blog, or X presence documenting your builder journey.'
        ]
      },
      {
        title: 'Phase 4: Pro Tools to Master',
        description: 'Optimize your development velocity and integration pipelines.',
        items: [
          'Master modern frontend stacks, database integrations, and hosting services.',
          'Learn basic cybersecurity, authentication rules, and payment gateways.'
        ]
      }
    ],
    interviewQuestions: [
      {
        question: 'You built a prototype but after launch, you realize users find it too complicated. What are your immediate steps?',
        idealConcepts: [
          'Review click maps or user analytics to identify drop-off points',
          'Schedule direct qualitative interviews with a few users',
          'Simplify the core user flow (remove extra features)',
          'Optimize onboarding with a guided wizard or template startup'
        ],
        sampleBest: 'I would immediately look at the analytics to see where users drop off in the funnel. Next, I would contact three users directly for a 10-minute video call to watch them use the product. Using their feedback, I would simplify the core dashboard, strip away non-essential features, and implement a 3-step guided setup wizard that allows them to experience the primary value proposition within 30 seconds.'
      },
      {
        question: 'How do you validate a business idea before spending weeks writing code?',
        idealConcepts: [
          'Create a high-fidelity landing page with a waitlist sign-up',
          'Conduct qualitative surveys with the target audience',
          'Build a simple interactive mock-up (Figma/interactive slideshow)',
          'Pre-sell the product or collect soft commitments'
        ],
        sampleBest: 'I validate by building a clean, persuasive landing page describing the product and offering a waitlist sign-up or early discount. I drive traffic through organic posts on social media channels. If we hit a target conversion rate of 10% sign-ups from visitors, it proves the problem resonates, and only then do I start writing the code for the MVP.'
      }
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: 'What kind of work environment makes you feel the most productive?',
    options: [
      {
        text: 'A structured workspace focusing on community, equality, and ethical guidelines.',
        weights: { 'ai-ethicist': 3, 'learning-experience-designer': 1 }
      },
      {
        text: 'An analytical dashboard setting dealing with numbers, spreadsheets, and market charts.',
        weights: { 'fintech-green-analyst': 3 }
      },
      {
        text: 'A dynamic creative studio layering visual assets, scripts, and auditory tracks.',
        weights: { 'creative-technologist': 3 }
      },
      {
        text: 'A collaborative campus or digital community where I guide, tutor, and mentor others.',
        weights: { 'learning-experience-designer': 3, 'ai-ethicist': 1 }
      },
      {
        text: 'A fast-paced startup garage where I can wear multiple hats, build, and ship daily.',
        weights: { 'ai-startup-founder': 3 }
      }
    ]
  },
  {
    id: 2,
    text: 'If you had to pick a superpower to help your team win a hackathon, what would it be?',
    options: [
      {
        text: 'Empathy: Understanding users deeply and making sure the product is accessible to everyone.',
        weights: { 'ai-ethicist': 3, 'learning-experience-designer': 2 }
      },
      {
        text: 'Quant Reasoning: Finding hidden carbon wastes and financial leaks in massive data sets.',
        weights: { 'fintech-green-analyst': 3 }
      },
      {
        text: 'Artistry: Combining prompts and design assets into jaw-dropping video concepts.',
        weights: { 'creative-technologist': 3 }
      },
      {
        text: 'Pedagogy: Structuring complex information into a fun, clear learning roadmap.',
        weights: { 'learning-experience-designer': 3 }
      },
      {
        text: 'Speed-to-Market: Building a full prototype and pitching it like a professional CEO.',
        weights: { 'ai-startup-founder': 3 }
      }
    ]
  },
  {
    id: 3,
    text: 'Which real-world problem are you most passionate about addressing?',
    options: [
      {
        text: 'Protecting user data privacy and reducing algorithmic discrimination/bias.',
        weights: { 'ai-ethicist': 3 }
      },
      {
        text: 'Combating climate change and scaling sustainable funding systems.',
        weights: { 'fintech-green-analyst': 3 }
      },
      {
        text: 'Giving creators tools to speed up editing and protect their unique voices.',
        weights: { 'creative-technologist': 3 }
      },
      {
        text: 'Helping students find career direction and reduce stress about the future.',
        weights: { 'learning-experience-designer': 3 }
      },
      {
        text: 'Helping local businesses modernize and launch new products with AI.',
        weights: { 'ai-startup-founder': 3 }
      }
    ]
  },
  {
    id: 4,
    text: 'What gets you excited about utilizing AI tools in your day-to-day work?',
    options: [
      {
        text: 'Using AI logic to detect patterns of bias and audit layouts for WCAG accessibility.',
        weights: { 'ai-ethicist': 3 }
      },
      {
        text: 'Automating heavy analytical processes like expense auditing or predictive calculations.',
        weights: { 'fintech-green-analyst': 3 }
      },
      {
        text: 'Using generative tools for sound synth, video layout rendering, and asset editing.',
        weights: { 'creative-technologist': 3 }
      },
      {
        text: 'Building intelligent mock simulators, tutors, or study aids for fellow peers.',
        weights: { 'learning-experience-designer': 3 }
      },
      {
        text: 'Deploying APIs rapidly to launch independent, functional Web software.',
        weights: { 'ai-startup-founder': 3 }
      }
    ]
  },
  {
    id: 5,
    text: 'What represents the ultimate success for your hackathon submission?',
    options: [
      {
        text: 'It resolves a community issue, proving technology can be accessible and equitable.',
        weights: { 'ai-ethicist': 3, 'learning-experience-designer': 1 }
      },
      {
        text: 'It proves financial efficiency and shows a clear model for resource tracking.',
        weights: { 'fintech-green-analyst': 3 }
      },
      {
        text: 'It looks and sounds beautiful, telling a compelling audio-visual story.',
        weights: { 'creative-technologist': 3 }
      },
      {
        text: 'It equips other students with actionable advice, resumes, or interview prep.',
        weights: { 'learning-experience-designer': 3 }
      },
      {
        text: 'It works like a viable business prototype that is ready to attract active users.',
        weights: { 'ai-startup-founder': 3 }
      }
    ]
  }
];
