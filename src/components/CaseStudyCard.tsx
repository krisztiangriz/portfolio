import { Link } from "react-router-dom";
import type { CaseStudy } from "../data/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link
      to={`/case-study/${study.slug}`}
      className="block rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {study.title}
      </h2>
      <p className="text-gray-600 text-sm">{study.summary}</p>
    </Link>
  );
}
