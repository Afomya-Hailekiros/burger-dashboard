import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { Order } from '@/lib/models/order'

export const dynamic = 'force-dynamic'

export async function GET() {
  await dbConnect()
  const orders = await Order.find()

  const dailyStats = orders.reduce((acc: Record<string, number>, order: any) => {
    const date = new Date(order.createdAt).toISOString().split('T')[0]
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  const result = Object.entries(dailyStats).map(([date, count]) => ({
    date,
    Orders: count,
  }))

  return NextResponse.json(result)
}
