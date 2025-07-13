'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function BurgerForm({ burger }: { burger?: any }) {
  const [name, setName] = useState(burger?.name || '')
  const [category, setCategory] = useState(burger?.category || 'Beef')
  const [price, setPrice] = useState(burger?.price || '')
  const [image, setImage] = useState(burger?.image || '')
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const data = { name, category, price, image }
    const method = burger ? 'PUT' : 'POST'
    const endpoint = burger ? `/api/burgers/${burger._id}` : '/api/burgers'

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      toast.success(`Burger ${burger ? 'updated' : 'created'} successfully`)
      router.push('/admin')
    } else {
      toast.error('Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-lg shadow max-w-2xl mx-auto">
      <div>
        <label className="block text-sm font-medium mb-1">Burger Name</label>
        <input
          className="w-full rounded border px-4 py-2 bg-white dark:bg-zinc-800 dark:text-white"
          placeholder="Enter burger name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          className="w-full rounded border px-4 py-2 bg-white dark:bg-zinc-800 dark:text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Beef">Beef</option>
          <option value="Chicken">Chicken</option>
          <option value="Veggie">Veggie</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price ($)</label>
        <input
          type="number"
          className="w-full rounded border px-4 py-2 bg-white dark:bg-zinc-800 dark:text-white"
          placeholder="Burger price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          className="w-full rounded border px-4 py-2 bg-white dark:bg-zinc-800 dark:text-white"
          placeholder="https://example.com/image.jpg"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition">
        {burger ? 'Update' : 'Create'} Burger
      </button>
    </form>
  )
}
