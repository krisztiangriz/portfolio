import { useState, useEffect, useRef, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const CORRECT_PASSWORD = import.meta.env.VITE_CASE_STUDY_PASSWORD;
const SESSION_KEY = "portfolio_unlocked";

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (unlocked) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableSelector = 'input, button, [tabindex]:not([tabindex="-1"])';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = dialog.querySelectorAll<HTMLElement>(focusableSelector);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [unlocked]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="blur-sm pointer-events-none select-none" aria-hidden="true" inert={true}>
        {children}
      </div>

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="password-gate-title"
        className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-overlay)] backdrop-blur-sm"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--color-surface)] rounded-xl shadow-2xl p-8 w-full max-w-sm mx-4 relative"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 id="password-gate-title" className="text-xl font-semibold text-[var(--color-text-primary)]">
              Password Required
            </h2>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded"
              aria-label="Back to portfolio"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <p className="text-[var(--color-text-secondary)] text-sm mb-6">
            Enter password to view case studies.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            autoFocus
            aria-invalid={error}
            aria-describedby={error ? "password-error" : undefined}
            className={`w-full px-4 py-2 border rounded-lg transition-colors bg-[var(--color-input-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] ${
              error
                ? "border-[var(--color-negative)] focus:border-[var(--color-negative)]"
                : "border-[var(--color-input-border)] focus:border-[var(--color-text-primary)]"
            }`}
          />
          {error && (
            <p id="password-error" className="text-[var(--color-negative)] text-sm mt-2" role="alert">
              Incorrect password.
            </p>
          )}
          <button
            type="submit"
            className="mt-4 w-full bg-[var(--color-text-primary)] text-white py-2 rounded-lg hover:bg-[var(--color-text-body)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)]"
          >
            View Case Study
          </button>
        </form>
      </div>
    </>
  );
}
