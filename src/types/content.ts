export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  cover?: string;
  sections: { heading: string; body: string }[];
}

export interface CVData {
  intro: string;
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  education: {
    title: string;
    institution: string;
    period: string;
  }[];
  skills: { category: string; items: string[] }[];
}

export interface ContactData {
  intro: string;
  email: string;
  linkedin: string;
  location: string;
}

export interface PortfolioData {
  title: string;
  subtitle: string;
}
