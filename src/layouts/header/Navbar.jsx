import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavDropdown from './NavDropdown'
import { navItems, navDropdowns } from '../../data/navMenu'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSlug, setOpenSlug] = useState(null)

  function closeDropdown() {
    setOpenSlug(null)
  }

  return (
    <nav className="flex items-center h-full">
      <Link to="/" className="flex items-center shrink-0">
        <img src="/puma-logo.svg" alt="Logo" className="h-10 w-10 invert" />
      </Link>

      <button
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-label="Menu"
        className="lg:hidden flex flex-col gap-1.5 ml-4 cursor-pointer"
      >
        <span className="w-6 h-0.5 bg-puma-white" />
        <span className="w-6 h-0.5 bg-puma-white" />
        <span className="w-6 h-0.5 bg-puma-white" />
      </button>

      <ul className="hidden lg:flex items-center h-full ml-5 text-base font-bold uppercase">
        {navItems.map(({ slug, label }) => (
          <li
            key={slug}
            className="h-full"
            onMouseEnter={() => setOpenSlug(slug)}
            onMouseLeave={() => setOpenSlug((current) => (current === slug ? null : current))}
          >
            <Link to={`/${slug}`} onClick={closeDropdown} className="flex items-center h-full px-4">
              <span
                className={`transition-opacity duration-150 ${
                  openSlug && openSlug !== slug ? 'opacity-50' : ''
                }`}
              >
                {label}
              </span>
            </Link>
            {navDropdowns[slug] && (
              <NavDropdown
                {...navDropdowns[slug]}
                slug={slug}
                isOpen={openSlug === slug}
                onNavigate={closeDropdown}
              />
            )}
          </li>
        ))}
      </ul>

      {isMenuOpen && (
        <ul className="lg:hidden absolute left-0 top-full w-full bg-puma-black border-t border-white/10 py-2">
          {navItems.map(({ slug, label }) => (
            <li key={slug}>
              <Link
                to={`/${slug}`}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-puma-white font-bold uppercase"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar
