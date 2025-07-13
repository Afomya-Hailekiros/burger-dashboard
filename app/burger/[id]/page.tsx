// 📄 /app/burgers/[id]/page.tsx

import { Burger } from '@/lib/models/burger'
import dbConnect from '@/lib/db'
import { Metadata } from 'next'
import Image from 'next/image'

export interface IBurger {
  _id: string
  name: string
  category: 'Beef' | 'Chicken' | 'Veggie'
  price: number
  image: string
}

type Params = {
  params: {
    id: string
  }
}

// 🧠 Dynamic SEO Metadata
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  await dbConnect()
  const burger = (await Burger.findById(params.id).lean()) as IBurger | null

  if (!burger) {
    return {
      title: 'Burger Not Found | Burger Bliss',
      description: 'Sorry, this burger does not exist.',
    }
  }

  return {
    title: `${burger.name} | Burger Bliss`,
    description: `Try our delicious ${burger.name} in the ${burger.category} category. Only $${burger.price}!`,
    openGraph: {
      images: [burger.image],
    },
  }
}

// 🍔 Burger Detail Page
export default async function BurgerPage({ params }: Params) {
  await dbConnect()
  const burger = (await Burger.findById(params.id).lean()) as IBurger | null

  if (!burger) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-red-500">Burger not found</h1>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{burger.name}</h1>
      <Image
        src={burger.image}
        alt={burger.name}
        width={800}
        height={500}
        className="rounded-lg mb-4"
      />
      <p className="text-xl text-orange-600 font-semibold">${burger.price}</p>
      <p className="mt-2 text-zinc-600 dark:text-zinc-300">Category: {burger.category}</p>
    </div>
  )
}
