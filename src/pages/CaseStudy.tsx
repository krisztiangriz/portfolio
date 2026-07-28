import { useParams, Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import { PasswordGate } from "../components/PasswordGate";
import { CaseStudyCard } from "../components/CaseStudyCard";

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Not Found</h1>
        <p className="text-[var(--color-text-secondary)] mb-4">
          This case study doesn't exist.
        </p>
        <Link to="/" className="text-[var(--color-text-secondary)] hover:underline">
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
          className="text-sm text-[var(--color-text-placeholder)] hover:text-[var(--color-text-body)] mb-6 inline-block"
        >
          &larr; Back to all projects
        </Link>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">{study.title}</h1>
        <p className="text-[var(--color-text-secondary)] mb-8">{study.summary}</p>

        <div className="space-y-8">
          {study.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                {section.heading}
              </h2>
              <p className="text-[var(--color-text-body)] leading-relaxed">{section.body}</p>
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
