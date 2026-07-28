import { useContent } from "../hooks/useContent";
import type { CVData } from "../types/content";

export function CV() {
  const { data: cv } = useContent<CVData>("cv.json");

  if (!cv) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">CV</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">Experience</h2>
        <div className="space-y-4">
          {cv.experience.map((job) => (
            <div key={`${job.title}-${job.company}`}>
              <h3 className="font-medium text-[var(--color-text-primary)]">{job.title}</h3>
              <p className="text-sm text-[var(--color-text-placeholder)]">{job.company} &middot; {job.period}</p>
              <p className="text-[var(--color-text-body)] mt-1">{job.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">Education</h2>
        <div className="space-y-4">
          {cv.education.map((edu) => (
            <div key={`${edu.title}-${edu.institution}`}>
              <h3 className="font-medium text-[var(--color-text-primary)]">{edu.title}</h3>
              <p className="text-sm text-[var(--color-text-placeholder)]">{edu.institution} &middot; {edu.period}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {cv.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-[var(--color-surface-hover)] text-[var(--color-text-body)] rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
