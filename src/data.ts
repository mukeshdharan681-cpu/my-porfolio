import { Project, Experience, SkillGroup, EducationItem, Language } from "./types";

export const personalInfo = {
  name: "MUKESH DHARAN",
  title: "Data Analyst & AI Specialist",
  email: "mukeshdharan681@gmail.com",
  phone: "+91 9790210750",
  location: "Cuddalore, Tamil Nadu, India",
  linkedin: "#", // Placeholder
  github: "#", // Placeholder
  avatarPrompt: "professional young male South Indian data scientist, subtle warm grid background, clean litigation portrait, high fidelity illustration logo style"
};

export const professionalSummary = 
  "As a skilled data analyst with over 5 years of experience, I have a proven " +
  "track record of utilizing data to drive business decisions and improve overall " +
  "performance. My biggest achievement includes developing a predictive model " +
  "that increased sales revenue by 15% for my previous company. With strong " +
  "analytical and problem-solving skills, I am able to identify trends, patterns and " +
  "provide actionable insights from large datasets. My attention to detail and " +
  "ability to communicate complex data in a clear and concise manner has greatly " +
  "contributed to the success of various projects. Proficient in coding languages " +
  "such as SQL and Python, I am able to manipulate data efficiently and create " +
  "visually appealing dashboards for stakeholders. My passion for continuous " +
  "learning and staying up-to-date with the latest industry trends makes me a " +
  "valuable asset to any data-driven organization.";

export const experiences: Experience[] = [
  {
    id: "exp1",
    role: "Senior Data Analyst & Modeler",
    company: "Analytics & Predictive Modeling Co.",
    duration: "2021 - Present",
    description: "Lead analytics initiatives focused on predicting market trends, cleaning complex data pipelines, and transforming raw datasets into tactical business dashboards.",
    bullets: [
      "Engineered a sales prediction model leveraging Scikit-Learn that accurately forecasted purchase velocity, leading to a direct 15% increase in quarterly revenue.",
      "Authored custom complex SQL queries, window functions, and multi-join CTEs to process over 5 million customer transaction rows, reducing query execution time by 35%.",
      "Created highly descriptive and interactive dashboards in Power BI and Tableau for senior executives, giving them the ability to inspect operational health in real-time.",
      "Partnered with cross-functional engineering teams to implement standardized data governance frameworks, preserving 99.8% data veracity in ingestion pipelines."
    ],
    skillsTested: ["Python", "SQL", "Machine Learning", "Power BI", "Tableau"]
  },
  {
    id: "exp2",
    role: "Analytics Engineer",
    company: "Enterprise Solutions Group",
    duration: "2019 - 2021",
    description: "Collaborated with team leads to identify system bottlenecks, design relational database structures, and engineer high-performance data visualization charts.",
    bullets: [
      "Spearheaded database migrations and index optimization on SQL Server databases, enhancing daily extraction, transformation, and load (ETL) routines by 40%.",
      "Developed regression models and automated time-series forecasting algorithms in Python to streamline supply chain procurement levels.",
      "Supervised a small team of junior analysts to standardize data visualization practices across 6 client-facing projects.",
      "Configured robust regression suites and implemented automated outlier detection routines using standard deviation-based screening."
    ],
    skillsTested: ["Python", "C programming", "Database Management", "SQL", "Excel"]
  }
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages & Core Programming",
    skills: [
      { name: "Python", level: "Expert", years: 5, subskills: ["Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "Seaborn"] },
      { name: "C programming", level: "Expert", years: 4, subskills: ["Data Structures", "Algorithms", "Memory Optimization"] }
    ]
  },
  {
    category: "Data Management & Analytics",
    skills: [
      { name: "SQL", level: "Expert", years: 5, subskills: ["PostgreSQL", "MySQL", "CTEs", "Window Functions", "Index Optimization"] },
      { name: "Database Management", level: "Expert", years: 5, subskills: ["ETL Pipelines", "Data Warehousing", "Database Schema Design"] },
      { name: "Machine Learning", level: "Expert", years: 4, subskills: ["Predictive Modeling", "Regression & Classification", "Clustering", "Feature Engineering"] }
    ]
  },
  {
    category: "Tools & Visualizations",
    skills: [
      { name: "Power BI", level: "Advanced", years: 4, subskills: ["DAX Formulas", "Power Query", "Interactive Report Design"] },
      { name: "Tableau", level: "Advanced", years: 4, subskills: ["LOD Expressions", "Interactive Storyboarding", "Data Blending"] },
      { name: "Excel & Sheets", level: "Expert", years: 5, subskills: ["Pivot Tables", "VBA & Macros", "Statistical Functions"] }
    ]
  }
];

export const education: EducationItem[] = [
  {
    degree: "B.Tech in Artificial Intelligence & Data Science (AI & DS)",
    institution: "Dhanalakshmi Srinivasan Engineering College (Autonomous)",
    location: "Perambalur, India",
    duration: "2023 - Present",
    details: [
      "Focused coursework in Deep Learning, Supervised & Unsupervised Machine Learning, Relational & NoSQL Databases, and Computer Vision.",
      "Acquiring advanced methodologies in Predictive Analytics and Data Governance to streamline business and technological solutions.",
      "Participating in AI Club research and database modeling hackathons."
    ]
  }
];

export const languages: Language[] = [
  { name: "Tamil", proficiency: "Native / Bilingual" },
  { name: "English", proficiency: "Professional Work Proficiency" }
];

export const sampleProjects: Project[] = [
  {
    id: "proj1",
    title: "Sales Revenue Predictive Engine",
    category: "Machine Learning",
    description: "An advanced machine learning framework designed to model buyer actions and budget limits, calculating sales patterns with a 94.2% forecasting accuracy.",
    technologies: ["Python", "Scikit-Learn", "Pandas", "Linear Regression", "Gradient Boosting"],
    findings: [
      "Successfully increased annual business revenue by 15% through precision demand matching.",
      "Identified that marketing channel spend and customer loyalty score were the strongest predictive drivers.",
      "Built dynamic parameter-tuning models allowing instant real-world forecasting under simulated macro scenarios."
    ],
    metrics: "15% Sales Revenue Increase"
  },
  {
    id: "proj2",
    title: "SQL Customer Churn & Cohort Intelligence",
    category: "SQL & Databases",
    description: "A highly complex sequence of database transformations executing cohort retention matrices to map customer lifetime value and preempt retention risk.",
    technologies: ["SQL Server", "PostgreSQL", "CTEs", "Window Functions", "Cohort Analysis"],
    findings: [
      "Identified key retention drop-offs between month 2 and month 3 of client subscription cycles.",
      "Optimized query runtimes by 35% using composite indexing and partitioned staging tables.",
      "Discovered that users with early product feature adoption had a 4x higher retention rate."
    ],
    metrics: "35% Faster Queries, 4x Retention Gap Found"
  },
  {
    id: "proj3",
    title: "Executive Business Health Dashboard",
    category: "Visualization",
    description: "Interactive executive dash suite representing enterprise KPI tracking, combining offline Excel structures with real-time interactive business intelligence filters.",
    technologies: ["Power BI", "Tableau", "DAX Formulas", "ETL Warehousing", "Excel Macros"],
    findings: [
      "Consolidated 12 distinct manual data files into a single automated diagnostic visual workspace.",
      "Empowered C-level stakeholders to perform rapid visual deep-dives into regional cost variations in 2 clicks.",
      "Automated outlier warnings which flagged logistics delays 72 hours sooner than legacy tracking pipelines."
    ],
    metrics: "12 Manual Tools Unified, 72h Faster Flags"
  }
];
