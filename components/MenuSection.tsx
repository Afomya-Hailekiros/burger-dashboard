'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import SearchBar from './SearchBar' // Make sure path is correct

const categories = ['All', 'Beef', 'Chicken', 'Veggie']

export default function MenuSection() {
  const [burgers, setBurgers] = useState<any[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [ordering, setOrdering] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchBurgers = async (search = '') => {
    try {
      setLoading(true)
      const url = search ? `/api/burgers?search=${search}` : '/api/burgers'
      const res = await fetch(url)
      const data = await res.json()
      setBurgers(data)
    } catch (err) {
      toast.error('Failed to load burgers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBurgers(searchQuery)
  }, [searchQuery])

  const handleOrder = async (burger: any) => {
    setOrdering(burger._id)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          burgerId: burger._id,
          name: burger.name,
          category: burger.category,
          price: burger.price,
          image: burger.image,
        }),
      })

      if (res.ok) {
        toast.success(`Order placed for ${burger.name}`)
      } else {
        toast.error('Order failed')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setOrdering(null)
    }
  }

  const filteredItems =
    activeCategory === 'All'
      ? burgers
      : burgers.filter((item) => item.category === activeCategory)

  return (
    <section className="py-16 px-6 bg-orange-50 dark:bg-zinc-950" id="menu">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Our Menu</h2>
        <p className="text-zinc-600 dark:text-zinc-300">
          Explore our delicious range of handcrafted burgers.
        </p>
      </div>

      <SearchBar onSearch={(q) => setSearchQuery(q)} />

      {/* Category Filter */}
      <div className="flex justify-center gap-4 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium border ${
              activeCategory === cat
                ? 'bg-orange-600 text-white'
                : 'bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-800 dark:text-zinc-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-zinc-600 dark:text-zinc-300">Loading burgers...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-zinc-900 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <Image
                src={item.image}
                alt={`${item.name} - ${item.category} Burger`}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-orange-600 font-bold">${item.price}</p>
                <button
                  onClick={() => handleOrder(item)}
                  className="mt-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                  disabled={ordering === item._id}
                >
                  {ordering === item._id ? 'Ordering...' : 'Order'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
