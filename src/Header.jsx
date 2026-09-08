import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import vantoraLogo from './assets/vantora-logo.png'

function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'Services', path: '/services' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Contact Us', path: '/contact' },
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">

        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="block shrink-0"
        >
          <img
            src={vantoraLogo}
            alt="Vantora Global Recruitment"
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(item.path)
                  ? 'text-[#D4A72C]'
                  : 'text-[#0B1F3A] hover:text-[#D4A72C]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* DESKTOP CTA */}
        <Link
          to="/jobs"
          className="hidden shrink-0 rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-[#0B1F3A] lg:inline-flex"
        >
          Find a Job
        </Link>

        {/* MOBILE RIGHT SIDE */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">

          {/* MOBILE FIND A JOB */}
          <Link
            to="/jobs"
            onClick={closeMenu}
            className="shrink-0 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-[#0B1F3A]"
          >
            Find a Job
          </Link>

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-[#0B1F3A] transition hover:border-[#D4A72C] hover:text-[#D4A72C]"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* MOBILE NAVIGATION MENU */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white shadow-lg lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6">

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`block border-b border-slate-100 px-2 py-3.5 text-sm font-medium transition-colors duration-200 last:border-b-0 ${
                  isActive(item.path)
                    ? 'text-[#D4A72C]'
                    : 'text-[#0B1F3A] hover:text-[#D4A72C]'
                }`}
              >
                {item.label}
              </Link>
            ))}

          </nav>
        </div>
      )}
    </header>
  )
}

export default Header