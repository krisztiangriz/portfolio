import { useState, type FormEvent } from "react";

const CORRECT_PASSWORD = import.meta.env.VITE_CASE_STUDY_PASSWORD;
const SESSION_KEY = "portfolio_unlocked";

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

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
      <div className="blur-sm pointer-events-none select-none" aria-hidden>
        {children}
      </div>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-overlay)] backdrop-blur-sm">
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--color-surface)] rounded-xl shadow-2xl p-8 w-full max-w-sm mx-4"
        >
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
            Password Required
          </h2>
          <p className="text-[var(--color-text-secondary)] text-sm mb-6">
            Enter the password to view this case study.
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
            className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors bg-[var(--color-input-bg)] ${
              error
                ? "border-[var(--color-negative)] focus:border-[var(--color-negative)]"
                : "border-[var(--color-input-border)] focus:border-[var(--color-text-primary)]"
            }`}
          />
          {error && (
            <p className="text-[var(--color-negative)] text-sm mt-2">Incorrect password.</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full bg-[var(--color-text-primary)] text-white py-2 rounded-lg hover:bg-[var(--color-text-body)] transition-colors"
          >
            Unlock
          </button>
        </form>
      </div>
    </>
  );
}
