'use client'

import { Card, Metric, Text, Grid } from '@tremor/react'
import { useEffect, useState } from 'react'

export default function AdminSummaryCards() {
  const [summary, setSummary] = useState<any>(null)

  useEffect(() => {
    fetch('/api/analytics/summary')
      .then((res) => res.json())
      .then(setSummary)
  }, [])

  if (!summary) return null

  return (
    <Grid numItemsSm={2} numItemsLg={4} className="gap-4 mt-6">
      <Card>
        <Text>Total Orders</Text>
        <Metric>{summary.totalOrders}</Metric>
      </Card>
      <Card>
        <Text>Total Revenue</Text>
        <Metric>${summary.totalRevenue.toFixed(2)}</Metric>
      </Card>
      <Card>
        <Text>Top Burger</Text>
        <Metric>{summary.bestBurger}</Metric>
      </Card>
      <Card>
        <Text>Orders Today</Text>
        <Metric>{summary.ordersToday}</Metric>
      </Card>
    </Grid>
  )
}
