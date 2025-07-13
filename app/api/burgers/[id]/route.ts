import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { Burger } from '@/lib/models/burger'

export async function GET(_: any, { params }: any) {
  await dbConnect()
  const burger = await Burger.findById(params.id)
  return NextResponse.json(burger)
}

export async function PUT(req: Request, { params }: any) {
  await dbConnect()
  const body = await req.json()
  const updated = await Burger.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json(updated)
}

export async function DELETE(_: any, { params }: any) {
  await dbConnect()
  await Burger.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
