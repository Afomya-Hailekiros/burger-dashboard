'use client'

import { LineChart, Title, Card, Text } from '@tremor/react'
import { useEffect, useState } from 'react'

// Define the shape of each data point
type DailyStat = {
  date: string
  Orders: number
}

export default function AdminDailyChart() {
  const [data, setData] = useState<DailyStat[]>([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics/daily')
        const raw = await res.json()

        if (!Array.isArray(raw)) {
          console.error('Expected array but got:', raw)
          return
        }

        setData(raw)
      } catch (err) {
        console.error('Failed to load analytics data', err)
      }
    }

    fetchStats()
  }, [])

  return (
    <Card className="mt-6">
      <Title>📅 Daily Orders</Title>
      <Text className="mb-4 text-zinc-600">Number of orders per day</Text>
      <LineChart
        data={data}
        index="date"
        categories={['Orders']}
        colors={['emerald']}
        yAxisWidth={48}
        className="h-72"
      />
    </Card>
  )
}
