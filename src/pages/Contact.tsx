import { useState, useCallback, type MouseEvent } from "react";
import { useContent } from "../hooks/useContent";
import type { ContactData } from "../types/content";

function FlipCard() {
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
    <div className="mt-12 mx-auto w-[386px] h-[386px] perspective-[1000px]">
      <div
        role="button"
        tabIndex={0}
        aria-label="Flip card to reveal photo"
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
        <div className="absolute inset-0 rounded-xl overflow-hidden [backface-visibility:hidden]">
          <img
            src={`${import.meta.env.BASE_URL}images/contact-footer.png`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0 rounded-xl overflow-hidden [backface-visibility:hidden] flex items-center justify-center"
          style={{ transform: "rotateY(180deg)" }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/contact-footer-alt.png`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

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
            aria-label="LinkedIn (opens in new tab)"
            className="text-[var(--color-action)] hover:text-[var(--color-action-hover)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded"
          >
            {contact.linkedin}
          </a>
        </div>
      </div>

      <FlipCard />
    </div>
  );
}
