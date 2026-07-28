import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-[var(--color-surface)] focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-[var(--color-text-primary)]"
      >
        Skip to main content
      </a>
      <nav aria-label="Main navigation" className="sticky top-0 z-50 bg-[var(--color-bg)] border-b border-[var(--color-border-light)] px-6 py-4">
        <div className="max-w-[800px] mx-auto flex items-center gap-6">
          <NavLink to="/" className="font-semibold text-[var(--color-text-primary)] text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded">
            Krisztián GRIZ
          </NavLink>
          <div className="flex items-center ml-auto">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded ${isActive ? "text-[var(--color-action)] font-medium" : "text-[var(--color-text-secondary)] hover:text-[var(--color-action)] hover:underline"}`
              }
            >
              Portfolio
            </NavLink>
            <span className="w-px h-4 bg-[var(--color-border)] mx-3" />
            <NavLink
              to="/cv"
              className={({ isActive }) =>
                `px-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded ${isActive ? "text-[var(--color-action)] font-medium" : "text-[var(--color-text-secondary)] hover:text-[var(--color-action)] hover:underline"}`
              }
            >
              CV
            </NavLink>
            <span className="w-px h-4 bg-[var(--color-border)] mx-3" />
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded ${isActive ? "text-[var(--color-action)] font-medium" : "text-[var(--color-text-secondary)] hover:text-[var(--color-action)] hover:underline"}`
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      </nav>

      <main id="main-content" className="flex-1 px-6 py-10">
        <div className="max-w-[800px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
