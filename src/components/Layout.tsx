import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#/"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-[var(--color-surface)] focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-[var(--color-text-primary)]"
      >
        Skip to main content
      </a>
      <nav aria-label="Main navigation" className={`sticky top-0 z-50 bg-[var(--color-bg)] border-b px-6 py-4 transition-[border-color,box-shadow] duration-200 ${scrolled ? "border-[var(--color-border-light)] shadow-[0_4px_12px_-2px_var(--color-shadow)]" : "border-transparent"}`}>
        <div className="max-w-[800px] mx-auto flex items-center gap-6">
          <NavLink to="/" className="font-semibold text-[var(--color-text-primary)] text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded">
            Krisztián GRIZ
          </NavLink>
          <ul className="flex items-center ml-auto list-none">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `w-[70px] text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded ${isActive ? "text-[var(--color-action)] font-medium" : "text-[var(--color-text-secondary)] hover:text-[var(--color-action)] hover:underline"}`
                }
              >
                Portfolio
              </NavLink>
            </li>
            <li aria-hidden="true"><span className="w-px h-4 bg-[var(--color-border)] mx-3 block" /></li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `w-[62px] text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded ${isActive ? "text-[var(--color-action)] font-medium" : "text-[var(--color-text-secondary)] hover:text-[var(--color-action)] hover:underline"}`
                }
              >
                Contact
              </NavLink>
            </li>
            <li aria-hidden="true"><span className="w-px h-4 bg-[var(--color-border)] mx-3 block" /></li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `w-[52px] text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-action)] rounded ${isActive ? "text-[var(--color-action)] font-medium" : "text-[var(--color-text-secondary)] hover:text-[var(--color-action)] hover:underline"}`
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-[800px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
