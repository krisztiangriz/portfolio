import { Link } from "react-router-dom";
import { TiltCard } from "./TiltCard";
import type { CaseStudy } from "../data/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
  compact?: boolean;
}

export function CaseStudyCard({ study, compact }: CaseStudyCardProps) {
  return (
    <TiltCard>
      <Link
        to={`/case-study/${study.slug}`}
        className={`block flex flex-col focus:outline-none ${compact ? "h-[200px]" : "h-[388px]"}`}
      >
        <div className="w-full flex-1 bg-[var(--color-surface-hover)] rounded-lg mb-3" />
        <h2 className={`font-semibold text-[var(--color-text-primary)] ${compact ? "text-base" : "text-xl mb-2"}`}>
          {study.title}
        </h2>
        {!compact && (
          <p className="text-[var(--color-text-secondary)] text-sm">{study.summary}</p>
        )}
      </Link>
    </TiltCard>
  );
}
