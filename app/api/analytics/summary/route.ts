import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { Order } from '@/lib/models/order'

export const dynamic = 'force-dynamic'

export async function GET() {
  await dbConnect()
  const allOrders = await Order.find()

  const totalOrders = allOrders.length
  const totalRevenue = allOrders.reduce((sum: number, o: any) => sum + Number(o.price), 0)

  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const ordersToday = allOrders.filter((o: any) => new Date(o.createdAt) >= today).length

  const topBurger = allOrders.reduce((acc: Record<string, number>, order: any) => {
    acc[order.name] = (acc[order.name] || 0) + 1
    return acc
  }, {})

  const sorted = Object.entries(topBurger).sort((a, b) => b[1] - a[1])
  const bestBurger = (sorted[0] as [string, number] | undefined)?.[0] || 'N/A'

  return NextResponse.json({ totalOrders, totalRevenue, ordersToday, bestBurger })
}
