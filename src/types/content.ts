export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
}

export interface CVData {
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
  skills: string[];
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
