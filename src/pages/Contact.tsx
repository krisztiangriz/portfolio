export function Contact() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">Contact</h1>
      <p className="text-[var(--color-text-secondary)] mb-6">
        Get in touch — I'm always open to discussing new projects and
        opportunities.
      </p>

      <div className="space-y-3">
        <div>
          <span className="font-medium text-[var(--color-text-primary)]">Email:</span>{" "}
          <a
            href="mailto:hello@example.com"
            className="text-[var(--color-text-secondary)] hover:underline"
          >
            hello@example.com
          </a>
        </div>
        <div>
          <span className="font-medium text-[var(--color-text-primary)]">LinkedIn:</span>{" "}
          <a
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-secondary)] hover:underline"
          >
            linkedin.com/in/yourprofile
          </a>
        </div>
        <div>
          <span className="font-medium text-[var(--color-text-primary)]">Location:</span>{" "}
          <span className="text-[var(--color-text-body)]">City, Country</span>
        </div>
      </div>
    </div>
  );
}
