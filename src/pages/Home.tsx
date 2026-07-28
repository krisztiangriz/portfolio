import { caseStudies } from "../data/caseStudies";
import { CaseStudyCard } from "../components/CaseStudyCard";

export function Home() {
  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
        Design Portfolio
      </h1>
      <p className="text-[var(--color-text-secondary)] mb-8">
        A selection of case studies showcasing my design work.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </div>
  );
}
