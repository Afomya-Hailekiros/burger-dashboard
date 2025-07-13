import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { Order } from '@/lib/models/order'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect()
  const updated = await Order.findByIdAndUpdate(
    params.id,
    { status: 'completed' },
    { new: true }
  )
  return NextResponse.json(updated)
}
