import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/four')({
  component: PageThree,
})

function PageThree() {
  return <h1 className="text-2xl font-bold text-brand-700 sm:text-4xl">Hello World - Page Four</h1>
}
