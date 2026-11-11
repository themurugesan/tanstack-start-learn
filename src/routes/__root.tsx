import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { useState } from 'react'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      // Required for mobile: makes the page fit the phone screen width
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TanStack Start Learn' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

const links = [
  { to: '/one', label: 'One' },
  { to: '/two', label: 'Two' },
  { to: '/three', label: 'Three' },
  { to: '/four', label: 'Four' },
  { to: '/users', label: 'Users' },
] as const

function RootDocument({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased">
        <header className="bg-brand-600 text-white shadow">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link to="/one" className="text-lg font-bold">
              TanStack Learn
            </Link>

            {/* Mobile: hamburger button (hidden on md screens and up) */}
            <button
              className="rounded p-2 hover:bg-brand-700 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? '✕' : '☰'}
            </button>

            {/* Desktop: links in a row (hidden on mobile) */}
            <div className="hidden gap-1 md:flex">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded px-3 py-2 hover:bg-brand-700"
                  activeProps={{ className: 'bg-brand-700 font-semibold' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile: dropdown menu, shown only when menuOpen is true */}
          {menuOpen && (
            <div className="flex flex-col border-t border-brand-500 px-4 py-2 md:hidden">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded px-3 py-2 hover:bg-brand-700"
                  activeProps={{ className: 'bg-brand-700 font-semibold' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </header>

        <main className="mx-auto max-w-5xl px-4 py-6 sm:py-10">{children}</main>
        <Scripts />
      </body>
    </html>
  )
}
