'use client'

import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/utils'
import MyOrdersDrawer from '@/components/MyOrdersDrawer'

export default function Navbar() {
  const [showOrders, setShowOrders] = useState(false)

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-zinc-900 shadow sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-orange-600">🍔 Alison Burgers</h1>
        <ul className="flex gap-6 text-sm font-medium text-zinc-700 dark:text-zinc-200">
          <li><a href="#">Home</a></li>
          <li><a href="#why-us">Why Us</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="#">Contact</a></li>
          <li>
            <button onClick={() => setShowOrders(true)} className="text-orange-600 underline">
              My Orders
            </button>
          </li>
        </ul>
        <ThemeToggle />
      </nav>

      <MyOrdersDrawer open={showOrders} onClose={() => setShowOrders(false)} />
    </>
  )
}
