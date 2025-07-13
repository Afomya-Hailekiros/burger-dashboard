'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { ThemeToggle } from './ThemeToggle'
import MyOrdersDrawer from '@/components/MyOrdersDrawer'
import Link from 'next/link'
import UserNav from '@/components/user-nav' // adjust this path if needed

export default function Navbar() {
  const [showOrders, setShowOrders] = useState(false)
  const { data: session, status } = useSession()

  const isLoading = status === 'loading'
  const user = session?.user

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-zinc-900 shadow sticky top-0 z-50">
        <Link href="/">
          <h1 className="text-2xl font-bold text-orange-600 cursor-pointer">🍔 Alison Burgers</h1>
        </Link>

        <ul className="flex gap-6 text-sm font-medium text-zinc-700 dark:text-zinc-200 items-center">
          <li><a href="/">Home</a></li>
          <li><a href="#why-us">Why Us</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="#contact">Contact</a></li>

          <li>
            <button onClick={() => setShowOrders(true)} className="text-orange-600 underline">
              My Orders
            </button>
          </li>
           <ThemeToggle />

          
        </ul>
         <li>
            {!isLoading && <UserNav />}
          </li>
      </nav>

      <MyOrdersDrawer open={showOrders} onClose={() => setShowOrders(false)} />
    </>
  )
}
