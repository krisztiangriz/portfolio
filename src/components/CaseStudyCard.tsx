import { Link } from "react-router-dom";
import { TiltCard } from "./TiltCard";

interface CaseStudyCardProps {
  study: { slug: string; title: string; summary: string; cover?: string };
  compact?: boolean;
}

export function CaseStudyCard({ study, compact }: CaseStudyCardProps) {
  return (
    <TiltCard className={compact ? "max-md:w-fit max-md:mx-auto" : "w-fit"}>
      <Link
        to={`/case-study/${study.slug}`}
        className={`block relative overflow-hidden focus-visible:outline-none ${compact ? "h-[386px] w-[386px] md:h-[200px] md:w-full" : "h-[386px] w-[386px]"}`}
      >
        <img
          src={study.cover ?? `https://placehold.co/800x450/ECF1F9/5E6E8C?text=${encodeURIComponent(study.title)}`}
          alt={study.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/75 p-4">
          <h2 className={`font-semibold text-white ${compact ? "text-xl md:text-base" : "text-xl"}`}>
            {study.title}
          </h2>
          {!compact && (
            <p className="text-gray-300 text-sm mt-1">{study.summary}</p>
          )}
          {compact && (
            <p className="text-gray-300 text-sm mt-1 md:hidden">{study.summary}</p>
          )}
        </div>
      </Link>
    </TiltCard>
  );
}
