import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { createUser, deleteUser, getUsers, updateUser, type User } from '../server/users'

export const Route = createFileRoute('/users')({
  // loader runs before the page shows: it fetches users from MongoDB
  loader: () => getUsers(),
  component: UsersPage,
})

function UsersPage() {
  const users = Route.useLoaderData() // READ: data from the loader
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [editId, setEditId] = useState<string | null>(null)

  // After any change, re-run the loader to get fresh data from the DB
  const refresh = () => router.invalidate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email) return

    if (editId === null) {
      await createUser({ data: { name, email } }) // CREATE
    } else {
      await updateUser({ data: { id: editId, name, email } }) // UPDATE
      setEditId(null)
    }

    setName('')
    setEmail('')
    refresh()
  }

  function handleEdit(user: User) {
    setEditId(user.id)
    setName(user.name)
    setEmail(user.email)
  }

  async function handleDelete(id: string) {
    await deleteUser({ data: id }) // DELETE
    refresh()
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-3xl font-bold text-blue-600">Users (CRUD with MongoDB)</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          className="flex-1 rounded border border-gray-300 bg-white px-3 py-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="flex-1 rounded border border-gray-300 bg-white px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          {editId === null ? 'Add' : 'Update'}
        </button>
      </form>

      <table className="w-full overflow-hidden rounded bg-white shadow">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="flex gap-2 p-3">
                <button
                  onClick={() => handleEdit(user)}
                  className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
