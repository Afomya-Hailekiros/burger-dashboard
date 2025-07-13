import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { Burger } from '@/lib/models/burger'

export async function GET(req: Request) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('search')
  const burgers = query
    ? await Burger.find({ $text: { $search: query } })
    : await Burger.find()
  return NextResponse.json(burgers)
}

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()
  const newBurger = await Burger.create(body)
  return NextResponse.json(newBurger, { status: 201 })
}
