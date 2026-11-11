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

  const input =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100'

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-brand-700 sm:text-4xl">Users</h1>

      {/* Mobile: fields stacked (flex-col). sm and up: in one row (sm:flex-row) */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row"
      >
        <input className={input} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className={input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button
          type="submit"
          className="rounded-lg bg-brand-600 px-5 py-2 font-medium text-white hover:bg-brand-700"
        >
          {editId === null ? 'Add' : 'Update'}
        </button>
      </form>

      {users.length === 0 && <p className="text-center text-slate-500">No users yet. Add one above.</p>}

      {/* Each user is a card. Mobile: stacked. sm and up: one row */}
      <ul className="flex flex-col gap-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(user)}
                className="flex-1 rounded-lg border border-brand-600 px-4 py-1.5 text-brand-600 hover:bg-brand-50 sm:flex-none"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="flex-1 rounded-lg bg-red-600 px-4 py-1.5 text-white hover:bg-red-700 sm:flex-none"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
