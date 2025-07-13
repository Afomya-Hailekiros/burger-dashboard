import dbConnect from '@/lib/db'
import { Burger } from '@/lib/models/burger'
import BurgerForm from '@/components/BurgerForm'

export default async function EditPage({ params }: { params: { id: string } }) {
  await dbConnect()
  const burger = await Burger.findById(params.id).lean()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Burger</h1>
      <BurgerForm burger={burger} />
    </div>
  )
}
