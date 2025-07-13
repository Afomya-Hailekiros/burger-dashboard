'use client'

import { useEffect, useState } from 'react'
import { BarChart, Card, Title, Text } from '@tremor/react'

// ✅ Add this type definition
type AnalyticsData = {
  name: string
  Orders: number
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData[]>([]) // ✅ Now TypeScript knows this type

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics')
        const raw = await res.json()

        console.log('Analytics API response:', raw)

        if (!Array.isArray(raw)) {
          console.error('Expected an array, got:', raw)
          return
        }

        const formatted: AnalyticsData[] = raw.map((item: any) => ({
          name: item._id,
          Orders: item.count,
        }))

        setData(formatted)
      } catch (err) {
        console.error('Failed to load analytics data', err)
      }
    }

    fetchStats()
  }, [])

  return (
    <Card className="mt-6">
      <Title>📊 Top Ordered Burgers</Title>
      <Text className="mb-4 text-zinc-600">Based on total order count</Text>
      <BarChart
        data={data}
        index="name"
        categories={['Orders']}
        colors={['orange']}
        valueFormatter={(number) => `${number} orders`}
        yAxisWidth={48}
        className="h-72"
      />
    </Card>
  )
}
