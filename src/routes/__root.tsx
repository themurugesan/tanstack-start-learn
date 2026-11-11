import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [{ charSet: 'utf-8' }, { title: 'TanStack Start Learn' }],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <nav className="flex gap-4 bg-blue-600 px-6 py-3 text-white">
          <Link to="/one" activeProps={{ className: 'font-bold underline' }}>One</Link>
          <Link to="/two" activeProps={{ className: 'font-bold underline' }}>Two</Link>
          <Link to="/three" activeProps={{ className: 'font-bold underline' }}>Three</Link>
          <Link to="/users" activeProps={{ className: 'font-bold underline' }}>Users</Link>
        </nav>
        <main className="p-6">{children}</main>
        <Scripts />
      </body>
    </html>
  )
}
