import Hero from '@/components/ui/Hero'
import WhyChooseUs from '@/components/WhyChooseUs'
import BurgerDrop from '@/components/BurgerDrop'
import Menu from "@/app/menu/page"
export default function HomePage() {
  return (
    <main className="bg-white dark:bg-black text-zinc-800 dark:text-white">
       <Hero />

      <WhyChooseUs />
      <Menu />
    </main>
  )
}
