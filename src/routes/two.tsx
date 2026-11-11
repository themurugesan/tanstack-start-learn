import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/two')({
  component: PageTwo,
})

function PageTwo() {
  return <h1 className="text-2xl font-bold text-brand-700 sm:text-4xl">Hello World - Page Two</h1>
}
