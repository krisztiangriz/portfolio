import { useState, useCallback, type MouseEvent } from "react";
import { useContent } from "../hooks/useContent";
import type { CVData, ContactData } from "../types/content";

function AboutFlipCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) / (rect.width / 2);
    const offsetY = (e.clientY - centerY) / (rect.height / 2);
    setTilt({ x: offsetY * 12, y: -offsetX * 12 });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  const shadowX = tilt.y * -1.5;
  const shadowY = tilt.x * 1.5 + (isHovered ? 20 : 0);
  const shadowBlur = isHovered ? 40 : 0;
  const shadowSpread = isHovered ? -8 : 0;
  const flipRotation = isFlipped ? 180 : 0;

  return (
    <div className="w-[266px] h-[266px] shrink-0 perspective-[1000px]">
      <div
        role="button"
        tabIndex={0}
        aria-label="Flip card to reveal photo"
        aria-pressed={isFlipped}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setIsFlipped(!isFlipped); } }}
        className="w-full h-full cursor-pointer rounded-xl transition-[transform,box-shadow] duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)]"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + flipRotation}deg)`,
          transformStyle: "preserve-3d",
          boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px var(--color-shadow)`,
        }}
      >
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/contact-footer.webp`}
            alt="Illustration of trees on a small island"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/contact-footer-alt.webp`}
            alt="Portrait photo of Krisztián Griz"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export function About() {
  const { data: cv } = useContent<CVData>("about.json");
  const { data: contact } = useContent<ContactData>("contact.json");

  if (!cv) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">About</h1>

      <section className="mb-10 flex flex-col min-[860px]:flex-row gap-6 items-center min-[860px]:items-start">
        <div className="space-y-4 flex-1">
          {cv.intro.split("\n").map((paragraph, i) => (
            <p key={i} className="text-[var(--color-text-body)] leading-relaxed">{paragraph}</p>
          ))}
        </div>
        <AboutFlipCard />
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
  );
}
