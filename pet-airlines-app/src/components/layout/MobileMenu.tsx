'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export interface MobileMenuLink {
  href: string
  label: string
}

interface MobileMenuProps {
  links: MobileMenuLink[]
  ctaHref: string
  ctaLabel: string
}

const PANEL_ID = 'mobile-nav-panel'

export function MobileMenu({ links, ctaHref, ctaLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        className="text-pet-navy p-2"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div
        id={PANEL_ID}
        hidden={!open}
        className="absolute left-0 right-0 top-20 bg-white shadow-md border-t border-gray-100 px-4 py-4"
      >
        <ul className="flex flex-col space-y-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-pet-navy font-semibold hover:text-pet-blue transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="block text-center bg-pet-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
            >
              {ctaLabel}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
