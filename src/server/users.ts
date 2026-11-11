import { createServerFn } from '@tanstack/react-start'
import { ObjectId } from 'mongodb'
import { getDb } from './db'

// createServerFn = code that runs ONLY on the server (backend).
// The frontend calls these like normal functions; TanStack sends the request for you.

export type User = { id: string; name: string; email: string }
type UserInput = { name: string; email: string }

async function usersCollection() {
  const db = await getDb()
  return db.collection('users')
}

// READ
export const getUsers = createServerFn({ method: 'GET' }).handler(async () => {
  const col = await usersCollection()
  const docs = await col.find().toArray()
  return docs.map((d) => ({ id: d._id.toString(), name: d.name, email: d.email }))
})

// CREATE
export const createUser = createServerFn({ method: 'POST' })
  .validator((data: UserInput) => data)
  .handler(async ({ data }) => {
    const col = await usersCollection()
    await col.insertOne({ name: data.name, email: data.email })
  })

// UPDATE
export const updateUser = createServerFn({ method: 'POST' })
  .validator((data: User) => data)
  .handler(async ({ data }) => {
    const col = await usersCollection()
    await col.updateOne(
      { _id: new ObjectId(data.id) },
      { $set: { name: data.name, email: data.email } },
    )
  })

// DELETE
export const deleteUser = createServerFn({ method: 'POST' })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const col = await usersCollection()
    await col.deleteOne({ _id: new ObjectId(id) })
  })
