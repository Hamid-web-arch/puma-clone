import React from 'react'
import { Link } from 'react-router-dom'

const highlightColors = {
  gold: 'text-puma-gold',
  red: 'text-puma-red',
}

const gridColsBySectionCount = {
  4: 'grid-cols-4',
  5: 'grid-cols-5',
}

function normalizeLink(link) {
  return typeof link === 'string' ? { label: link } : link
}

function NavDropdown({ sections, slug, isOpen, onNavigate }) {
  return (
    <div
      className={`absolute left-0 top-full w-full z-40 transition-opacity duration-150 ease-in-out bg-puma-white text-puma-black border-t border-puma-border shadow-lg normal-case ${
        isOpen ? 'opacity-100' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <div className={`puma-container py-8 grid gap-10 ${gridColsBySectionCount[sections.length] ?? 'grid-cols-5'}`}>
        {sections.map((section, index) => (
          <div key={section.heading ?? `quick-links-${index}`} className="min-w-0">
            {section.heading && (
              <Link
                to={`/${slug}`}
                onClick={onNavigate}
                className="block font-bold text-lg border-b border-puma-black pb-2 mb-3 transition-colors duration-150 hover:text-puma-gold"
              >
                {section.heading}
              </Link>
            )}

            <ul className={section.heading ? 'space-y-2' : 'space-y-3'}>
              {section.links.map((link) => {
                const { label, highlight } = normalizeLink(link)
                const className = section.heading
                  ? 'text-base text-puma-gray transition-colors duration-150 hover:text-puma-black'
                  : `font-bold text-lg transition-colors duration-150 hover:text-puma-gold ${highlightColors[highlight] ?? 'text-puma-gray'} ${highlight === 'red' ? 'uppercase' : ''}`

                return (
                  <li key={label}>
                    <Link to={`/${slug}`} onClick={onNavigate} className={className}>{label}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NavDropdown
