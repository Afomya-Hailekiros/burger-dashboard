import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI!
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local")
}

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable so the client is not recreated on every reload
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options)
    ;(global as any)._mongoClientPromise = client.connect()
  }
  clientPromise = (global as any)._mongoClientPromise
} else {
  // In production, don't use global
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
