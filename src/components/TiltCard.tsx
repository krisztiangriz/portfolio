import { useState, useCallback, type MouseEvent, type ReactNode } from "react";

const DEFAULT_MAX_TILT = 12;

interface TiltCardProps {
  children: ReactNode;
  maxTilt?: number;
}

export function TiltCard({ children, maxTilt = DEFAULT_MAX_TILT }: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = (e.clientX - centerX) / (rect.width / 2);
    const offsetY = (e.clientY - centerY) / (rect.height / 2);

    setTilt({
      x: offsetY * maxTilt,
      y: -offsetX * maxTilt,
    });
  }, [maxTilt]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  const shadowX = tilt.y * -1.5;
  const shadowY = tilt.x * 1.5 + (isHovered ? 20 : 0);
  const shadowBlur = isHovered ? 40 : 0;
  const shadowSpread = isHovered ? -8 : 0;

  return (
    <div className="perspective-[1000px]">
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          cursor-pointer rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-light)] overflow-hidden
          transition-[transform,box-shadow] duration-400 ease-out
          outline-2 outline-offset-2 outline-transparent focus-within:outline-[var(--color-action)]
          focus-within:shadow-[0_20px_40px_-8px_var(--color-shadow)]
        `}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px var(--color-shadow)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
