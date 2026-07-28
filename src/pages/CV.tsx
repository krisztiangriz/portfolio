import { useContent } from "../hooks/useContent";
import type { CVData, ContactData } from "../types/content";

export function CV() {
  const { data: cv } = useContent<CVData>("about.json");
  const { data: contact } = useContent<ContactData>("contact.json");

  if (!cv) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">About</h1>

      <section className="mb-10">
        <div className="space-y-4">
          {cv.intro.split("\n").map((paragraph, i) => (
            <p key={i} className="text-[var(--color-text-body)] leading-relaxed">{paragraph}</p>
          ))}
        </div>
      </section>

      <hr className="mb-10 border-[var(--color-border-light)]" />

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
        <div className="space-y-4">
          {cv.skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-medium text-[var(--color-text-primary)] mb-2">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[var(--color-surface-hover)] text-[var(--color-text-body)] rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {contact && (
        <>
          <hr className="my-12 border-[var(--color-border-light)]" />
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
            Contact
          </h2>
          <div className="flex items-center pb-[100px]">
            <a
              href={`mailto:${contact.email}`}
              className="text-[var(--color-action)] hover:text-[var(--color-action-hover)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded"
            >
              {contact.email}
            </a>
            <span className="w-px h-4 bg-[var(--color-border)] mx-3" aria-hidden="true" />
            <a
              href={`https://${contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in new tab)"
              className="text-[var(--color-action)] hover:text-[var(--color-action-hover)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded"
            >
              LinkedIn
            </a>
          </div>
        </>
      )}
    </div>
  );
}
