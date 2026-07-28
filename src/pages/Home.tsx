import { useContent } from "../hooks/useContent";
import { CaseStudyCard } from "../components/CaseStudyCard";
import type { CaseStudy, PortfolioData } from "../types/content";

export function Home() {
  const { data: portfolio } = useContent<PortfolioData>("portfolio.json");
  const { data: caseStudies } = useContent<CaseStudy[]>("case-studies.json");

  if (!portfolio || !caseStudies) return null;

  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">
        {portfolio.title}
      </h1>
      <p className="text-[var(--color-text-secondary)] mb-6">
        {portfolio.subtitle}
      </p>
      <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-6 justify-items-center min-[860px]:justify-items-start">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </div>
  );
}
