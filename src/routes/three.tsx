import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/three')({
  component: PageThree,
})

function PageThree() {
  return <h1 className="text-3xl font-bold text-blue-600">Hello World - Page Three</h1>
}
