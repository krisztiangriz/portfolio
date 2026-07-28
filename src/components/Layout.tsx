import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-6">
          <NavLink to="/" className="font-semibold text-gray-900 text-lg">
            Portfolio
          </NavLink>
          <div className="flex gap-4 ml-auto">
            <NavLink
              to="/cv"
              className={({ isActive }) =>
                isActive ? "text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              CV
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Krisztian Griz
      </footer>
    </div>
  );
}
