import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { Order } from '@/lib/models/order'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect()
  await Order.findByIdAndDelete(params.id)
  return NextResponse.json({ message: 'Deleted' })
}
