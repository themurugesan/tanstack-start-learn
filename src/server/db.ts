import { MongoClient } from 'mongodb'

// Reads MONGODB_URL and MONGODB_DB from the .env file (server only).
const client = new MongoClient(process.env.MONGODB_URL!)

export async function getDb() {
  await client.connect() // safe to call many times: connects only once
  return client.db(process.env.MONGODB_DB)
}
