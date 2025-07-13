'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { X } from 'lucide-react'

export default function MyOrdersDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data)
    } catch (err) {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const deleteOrder = async (id: string) => {
    try {
      await fetch(`/api/orders/${id}`, { method: 'DELETE' })
      toast.success('Order deleted')
      setOrders((prev) => prev.filter((o) => o._id !== id))
    } catch (err) {
      toast.error('Failed to delete order')
    }
  }

  useEffect(() => {
    if (open) fetchOrders()
  }, [open])

  const totalPrice = orders.reduce((sum, o) => sum + Number(o.price), 0)

  return (
    <div
      className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white dark:bg-zinc-950 shadow-lg transition-transform z-[60] ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-lg font-bold">My Orders</h2>
        <button onClick={onClose}><X /></button>
      </div>

      {loading ? (
        <p className="p-4 text-zinc-600 dark:text-zinc-300">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="p-4 text-zinc-600 dark:text-zinc-300">You have no orders yet.</p>
      ) : (
        <div className="p-4 space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex gap-3 items-center border-b pb-3 dark:border-zinc-800"
            >
              <Image
                src={order.image}
                alt={order.name}
                width={60}
                height={60}
                className="rounded object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium">{order.name}</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">${order.price}</p>
              </div>
              <button
                onClick={() => deleteOrder(order._id)}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Total */}
      <div className="p-4 mt-auto border-t border-zinc-200 dark:border-zinc-800">
        <p className="font-bold">Total: ${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  )
}
