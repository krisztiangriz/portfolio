import { useState, useCallback, type MouseEvent, type ReactNode } from "react";

const MAX_TILT = 12;

interface TiltCardProps {
  children: ReactNode;
}

export function TiltCard({ children }: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = (e.clientX - centerX) / (rect.width / 2);
    const offsetY = (e.clientY - centerY) / (rect.height / 2);

    setTilt({
      x: offsetY * MAX_TILT,
      y: -offsetX * MAX_TILT,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div className="perspective-[1000px]">
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          cursor-pointer rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-light)] p-6
          transition-all duration-400 ease-out
          ${isHovered ? "shadow-[0_25px_50px_-12px_var(--color-shadow)]" : "shadow-none"}
        `}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}
