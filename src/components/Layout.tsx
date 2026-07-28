import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-[var(--color-bg)] border-b border-[var(--color-border-light)] px-6 py-4">
        <div className="max-w-[800px] mx-auto flex items-center gap-6">
          <NavLink to="/" className="font-semibold text-[var(--color-text-primary)] text-lg">
            Portfolio
          </NavLink>
          <div className="flex gap-4 ml-auto">
            <NavLink
              to="/cv"
              className={({ isActive }) =>
                isActive ? "text-[var(--color-text-primary)] font-medium" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }
            >
              CV
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-[var(--color-text-primary)] font-medium" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-[800px] mx-auto">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-[var(--color-border-light)] px-6 py-4">
        <div className="max-w-[800px] mx-auto text-center text-sm text-[var(--color-text-placeholder)]">
          &copy; {new Date().getFullYear()} Krisztian Griz
        </div>
      </footer>
    </div>
  );
}
