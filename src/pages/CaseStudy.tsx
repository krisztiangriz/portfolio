import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import { PasswordGate } from "../components/PasswordGate";
import { CaseStudyCard } from "../components/CaseStudyCard";

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!study) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Not Found</h1>
        <p className="text-[var(--color-text-secondary)] mb-4">
          This case study doesn't exist.
        </p>
        <Link to="/" className="text-[var(--color-action)] hover:text-[var(--color-action-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <PasswordGate>
      <div>
        <Link
          to="/"
          className="text-sm text-[var(--color-action)] hover:text-[var(--color-action-hover)] mb-6 inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded"
        >
          &larr; Back to all projects
        </Link>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">{study.title}</h1>
        <p className="text-[var(--color-text-secondary)] mb-8">{study.summary}</p>

        <div className="space-y-8">
          {study.sections.map((section, i) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                {section.heading}
              </h2>
              <p className="text-[var(--color-text-body)] leading-relaxed mb-4">{section.body}</p>
              <img
                src={`https://placehold.co/800x450/ECF1F9/5E6E8C?text=Section+${i + 1}`}
                alt={`${section.heading} illustration`}
                className="w-full rounded-lg"
              />
            </section>
          ))}
        </div>

        <hr className="my-12 border-[var(--color-border-light)]" />

        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6">
          Other Case Studies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {caseStudies
            .filter((s) => s.slug !== slug)
            .map((s) => (
              <CaseStudyCard key={s.slug} study={s} compact />
            ))}
        </div>
      </div>
    </PasswordGate>
  );
}
