import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { Order } from '@/lib/models/order'

export async function GET() {
  await dbConnect()

  try {
    const result = await Order.aggregate([
      { $group: { _id: '$name', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ])

    return NextResponse.json(result, { status: 200 }) // ✅ Returns array
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json([], { status: 500 }) // fallback to empty array
  }
}
