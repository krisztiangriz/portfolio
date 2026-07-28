import { caseStudies } from "../data/caseStudies";
import { CaseStudyCard } from "../components/CaseStudyCard";

export function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Design Portfolio
      </h1>
      <p className="text-gray-600 mb-8">
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
