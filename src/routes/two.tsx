import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/two')({
  component: PageTwo,
})

function PageTwo() {
  return <h1 className="text-3xl font-bold text-blue-600">Hello World - Page Two</h1>
}
