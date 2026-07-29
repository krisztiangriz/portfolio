import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import { useCrypto } from "../hooks/useCrypto";
import { PasswordGate } from "../components/PasswordGate";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { Lightbox } from "../components/Lightbox";
import { EncryptedImage } from "../components/EncryptedImage";
import type { CaseStudy as CaseStudyType, CaseStudyImage, ContactData, PortfolioCard } from "../types/content";

function resolveImage(img: CaseStudyImage): { src: string; caption?: string; captionAlign?: "left" | "center" | "right" } {
  return typeof img === "string" ? { src: img } : img;
}

function isCoverImage(src: string): boolean {
  return src.includes("-cover.");
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
                {isCoverImage(src) ? (
                  <img
                    src={src}
                    alt={caption || `${section.heading} illustration`}
                    className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onImageClick(idx)}
                  />
                ) : (
                  <EncryptedImage
                    src={src}
                    alt={caption || `${section.heading} illustration`}
                    onClick={() => onImageClick(idx)}
                  />
                )}
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
  const { isUnlocked, decryptJson, decryptImageUrl } = useCrypto();
  const { data: cards } = useContent<PortfolioCard[]>("portfolio-cards.json");
  const { data: contact } = useContent<ContactData>("contact.json");

  const [caseStudies, setCaseStudies] = useState<CaseStudyType[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxUrls, setLightboxUrls] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!isUnlocked) return;
    decryptJson<CaseStudyType[]>("content/case-studies.enc").then(setCaseStudies);
  }, [isUnlocked, decryptJson]);

  const study = caseStudies?.find((s) => s.slug === slug);

  const allImages = useMemo(() => study
    ? study.sections.flatMap((s) => {
        const imgs: { src: string; caption?: string; captionAlign?: "left" | "center" | "right" }[] = [];
        if (s.image) imgs.push(resolveImage(s.image));
        if (s.images) imgs.push(...s.images.map(resolveImage));
        return imgs;
      })
    : [], [study]);

  useEffect(() => {
    if (lightboxIndex === null || !isUnlocked) return;
    const img = allImages[lightboxIndex];
    if (!img || isCoverImage(img.src) || lightboxUrls.has(img.src)) return;

    const base = import.meta.env.BASE_URL;
    const relative = img.src.startsWith(base) ? img.src.slice(base.length) : img.src.replace(/^\//, "");
    decryptImageUrl(`${relative}.enc`).then((url) => {
      setLightboxUrls((prev) => new Map(prev).set(img.src, url));
    });
  }, [lightboxIndex, allImages, isUnlocked, decryptImageUrl, lightboxUrls]);

  if (!cards) return null;

  const cardForSlug = cards.find((c) => c.slug === slug);
  if (!cardForSlug) {
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

        {study ? (
          <>
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">{study.title}</h1>
            <p className="text-[var(--color-text-secondary)] mb-8">{study.summary}</p>

            <ImageSections sections={study.sections} onImageClick={setLightboxIndex} />

            {lightboxIndex !== null && (
              <Lightbox
                images={allImages.map((img) => ({
                  ...img,
                  src: lightboxUrls.get(img.src) ?? img.src,
                }))}
                currentIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
              />
            )}

            <hr className="my-12 border-[var(--color-border-light)]" />

            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6">
              More Case Studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cards
                .filter((c) => c.slug !== slug)
                .map((c) => (
                  <CaseStudyCard key={c.slug} study={c} compact />
                ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[var(--color-text-secondary)] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {contact && (
          <>
            <hr className="my-12 border-[var(--color-border-light)]" />
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
              Contact
            </h2>
            <div className="flex items-center justify-center pb-[100px]">
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
