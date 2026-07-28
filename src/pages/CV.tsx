export function CV() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">CV</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">Experience</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-[var(--color-text-primary)]">Senior Designer</h3>
            <p className="text-sm text-[var(--color-text-placeholder)]">Company Name &middot; 2022 – Present</p>
            <p className="text-[var(--color-text-body)] mt-1">
              Placeholder description of role and responsibilities.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-[var(--color-text-primary)]">Product Designer</h3>
            <p className="text-sm text-[var(--color-text-placeholder)]">Previous Company &middot; 2019 – 2022</p>
            <p className="text-[var(--color-text-body)] mt-1">
              Placeholder description of role and responsibilities.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">Education</h2>
        <div>
          <h3 className="font-medium text-[var(--color-text-primary)]">Degree in Design</h3>
          <p className="text-sm text-[var(--color-text-placeholder)]">University Name &middot; 2015 – 2019</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {["UI Design", "UX Research", "Prototyping", "Design Systems", "Figma", "React"].map(
            (skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-[var(--color-surface-hover)] text-[var(--color-text-body)] rounded-full text-sm"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </section>
    </div>
  );
}
