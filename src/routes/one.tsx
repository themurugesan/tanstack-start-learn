import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/one')({
  component: PageOne,
})

function PageOne() {
  return <h1 className="text-3xl font-bold text-blue-600">Hello World - Page One</h1>
}
