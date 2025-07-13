import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { Order } from '@/lib/models/order'

export async function POST(req: Request) {
  await dbConnect()
  const body = await req.json()

  try {
    const order = await Order.create(body)
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Order failed' }, { status: 500 })
  }
}
export async function GET(req: Request) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  try {
    const query = userId ? { userId } : {}
    const orders = await Order.find(query).sort({ createdAt: -1 }).lean()
    return NextResponse.json(orders, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch orders' }, { status: 500 })
  }
}
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect()
  const body = await req.json()

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    )
    return NextResponse.json(updatedOrder, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update order' }, { status: 500 })
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect()
  try {
    await Order.findByIdAndDelete(params.id)
    return NextResponse.json({ message: 'Order deleted' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete order' }, { status: 500 })
  }
}