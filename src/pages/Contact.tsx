import { useContent } from "../hooks/useContent";
import type { ContactData } from "../types/content";

export function Contact() {
  const { data: contact } = useContent<ContactData>("contact.json");

  if (!contact) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">Contact</h1>
      <p className="text-[var(--color-text-secondary)] mb-6">
        {contact.intro}
      </p>

      <div className="space-y-3">
        <div>
          <span className="font-medium text-[var(--color-text-primary)]">Email:</span>{" "}
          <a
            href={`mailto:${contact.email}`}
            className="text-[var(--color-action)] hover:text-[var(--color-action-hover)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded"
          >
            {contact.email}
          </a>
        </div>
        <div>
          <span className="font-medium text-[var(--color-text-primary)]">LinkedIn:</span>{" "}
          <a
            href={`https://${contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-action)] hover:text-[var(--color-action-hover)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded"
          >
            {contact.linkedin}
          </a>
        </div>
        <div>
          <span className="font-medium text-[var(--color-text-primary)]">Location:</span>{" "}
          <span className="text-[var(--color-text-body)]">{contact.location}</span>
        </div>
      </div>
    </div>
  );
}
