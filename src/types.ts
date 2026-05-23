export interface Project {
  id: string;
  title: string;
  category: "Machine Learning" | "SQL & Databases" | "Business Analytics" | "Visualization";
  description: string;
  technologies: string[];
  findings: string[];
  metrics?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  bullets: string[];
  skillsTested: string[];
}

export interface SkillGroup {
  category: string;
  skills: {
    name: string;
    level: "Expert" | "Advanced" | "Intermediate";
    years: number;
    subskills: string[];
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  details: string[];
  location: string;
}

export interface Language {
  name: string;
  proficiency: string;
}
