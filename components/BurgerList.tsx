'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function BurgerList() {
  const [burgers, setBurgers] = useState([])

  const fetchBurgers = async () => {
    const res = await fetch('/api/burgers')
    const data = await res.json()
    setBurgers(data)
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/burgers/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Burger deleted')
      setBurgers(burgers.filter((b: any) => b._id !== id))
    } else {
      toast.error('Failed to delete')
    }
  }

  useEffect(() => {
    fetchBurgers()
  }, [])

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {burgers.map((burger: any) => (
        <div key={burger._id} className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow hover:shadow-lg transition">
          <img src={burger.image} alt={burger.name} className="rounded w-full h-40 object-cover mb-3" />
          <h3 className="text-lg font-bold mb-1">{burger.name}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-300">{burger.category}</p>
          <p className="text-orange-600 font-semibold mb-3">${burger.price}</p>
          <div className="flex gap-3">
            <Link href={`/admin/edit/${burger._id}`} className="text-sm text-blue-600 hover:underline">
              Edit
            </Link>
            <button onClick={() => handleDelete(burger._id)} className="text-sm text-red-600 hover:underline">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
