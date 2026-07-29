import { useEffect, useRef, useState, useCallback } from "react";

interface LightboxImage {
  src: string;
  caption?: string;
  captionAlign?: "left" | "center" | "right";
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, currentIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(currentIndex);
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const goPrev = useCallback(() => {
    if (zoomed) return;
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length, zoomed]);

  const goNext = useCallback(() => {
    if (zoomed) return;
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length, zoomed]);

  const toggleZoom = useCallback(() => {
    setZoomed((z) => {
      if (!z) {
        setPan({ x: 0, y: 0 });
      }
      return !z;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoomed(false);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetZoom();
  }, [index, resetZoom]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goPrev();
          break;
        case "ArrowRight":
          goNext();
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goPrev, goNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!zoomed) return;
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStart.current = { ...pan };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !zoomed) return;
    setPan({
      x: panStart.current.x + (e.clientX - dragStart.current.x),
      y: panStart.current.y + (e.clientY - dragStart.current.y),
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 outline-none"
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4l12 12M16 4L4 16" />
        </svg>
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={goPrev}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 4l-6 6 6 6" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={goNext}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 4l6 6-6 6" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className="flex items-center justify-center w-full h-full p-12"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: zoomed ? (dragging ? "grabbing" : "grab") : "zoom-in" }}
      >
        <img
          src={images[index].src}
          alt={images[index].caption || `Image ${index + 1} of ${images.length}`}
          onDoubleClick={toggleZoom}
          onClick={(e) => {
            if (!zoomed) {
              e.stopPropagation();
              toggleZoom();
            }
          }}
          draggable={false}
          className="select-none transition-transform duration-200"
          style={{
            maxWidth: zoomed ? "none" : "100%",
            maxHeight: zoomed ? "none" : "100%",
            objectFit: "contain",
            transform: zoomed
              ? `scale(2) translate(${pan.x / 2}px, ${pan.y / 2}px)`
              : "scale(1)",
          }}
        />
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 max-w-[80vw]">
        {images[index].caption && (
          <span className={`text-white text-sm ${images[index].captionAlign === "left" ? "text-left self-start" : images[index].captionAlign === "right" ? "text-right self-end" : "text-center"}`}>
            {images[index].caption}
          </span>
        )}
        <div className="flex items-center gap-4">
          {images.length > 1 && (
            <span className="text-white/70 text-sm">
              {index + 1} / {images.length}
            </span>
          )}
          <button
            onClick={toggleZoom}
            aria-label={zoomed ? "Zoom out" : "Zoom in"}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="7" cy="7" r="5" />
              <path d="M11 11l3.5 3.5" />
              {!zoomed && <path d="M7 5v4M5 7h4" />}
              {zoomed && <path d="M5 7h4" />}
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
