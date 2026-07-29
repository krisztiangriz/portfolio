import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import { PasswordGate } from "../components/PasswordGate";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { Lightbox } from "../components/Lightbox";
import type { CaseStudy as CaseStudyType, CaseStudyImage, ContactData } from "../types/content";

function resolveImage(img: CaseStudyImage): { src: string; caption?: string; captionAlign?: "left" | "center" | "right" } {
  return typeof img === "string" ? { src: img } : img;
}

function ImageSections({
  sections,
  onImageClick,
}: {
  sections: CaseStudyType["sections"];
  onImageClick: (index: number) => void;
}) {
  let imgIndex = 0;

  return (
    <div className="space-y-8">
      {sections.map((section) => {
        const sectionImages: { src: string; caption?: string; captionAlign?: "left" | "center" | "right"; idx: number }[] = [];
        if (section.image) {
          const { src, caption, captionAlign } = resolveImage(section.image);
          sectionImages.push({ src, caption, captionAlign, idx: imgIndex++ });
        }
        if (section.images) {
          for (const img of section.images) {
            const { src, caption, captionAlign } = resolveImage(img);
            sectionImages.push({ src, caption, captionAlign, idx: imgIndex++ });
          }
        }

        return (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
              {section.heading}
            </h2>
            <p className="text-[var(--color-text-body)] leading-relaxed mb-4">{section.body}</p>
            {sectionImages.map(({ src, caption, captionAlign, idx }, j) => (
              <figure key={src} className={j > 0 ? "mt-16" : "mt-8"}>
                <img
                  src={src}
                  alt={caption || `${section.heading} illustration`}
                  className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => onImageClick(idx)}
                />
                {caption && (
                  <figcaption className={`mt-2 text-sm text-[var(--color-text-secondary)] italic ${captionAlign === "right" ? "text-right" : captionAlign === "center" ? "text-center" : "text-left"}`}>
                    {caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </section>
        );
      })}
    </div>
  );
}

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { data: caseStudies } = useContent<CaseStudyType[]>("case-studies.json");
  const { data: contact } = useContent<ContactData>("contact.json");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!caseStudies) return null;

  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Not Found</h1>
        <p className="text-[var(--color-text-secondary)] mb-4">
          This case study doesn't exist.
        </p>
        <Link to="/" className="text-[var(--color-action)] hover:text-[var(--color-action-hover)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded">
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
          className="text-sm text-[var(--color-action)] hover:text-[var(--color-action-hover)] hover:underline mb-6 inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded"
        >
          &larr; Back to portfolio
        </Link>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">{study.title}</h1>
        <p className="text-[var(--color-text-secondary)] mb-8">{study.summary}</p>

        <ImageSections sections={study.sections} onImageClick={setLightboxIndex} />

        {lightboxIndex !== null && (
          <Lightbox
            images={study.sections.flatMap((s) => {
              const imgs: { src: string; caption?: string; captionAlign?: "left" | "center" | "right" }[] = [];
              if (s.image) imgs.push(resolveImage(s.image));
              if (s.images) imgs.push(...s.images.map(resolveImage));
              return imgs;
            })}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}

        <hr className="my-12 border-[var(--color-border-light)]" />

        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6">
          More Case Studies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {caseStudies
            .filter((s) => s.slug !== slug)
            .map((s) => (
              <CaseStudyCard key={s.slug} study={s} compact />
            ))}
        </div>

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
    </PasswordGate>
  );
}
