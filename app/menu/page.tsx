// app/menu/page.tsx
import MenuSection from '@/components/MenuSection'

export const metadata = {
  title: 'Our Menu | Alison Burgers',
  description: 'Explore our handcrafted burgers made with fresh ingredients.',
  openGraph: {
    title: 'Our Menu | Alison Burgers',
    description: 'Delicious beef, chicken, and veggie burgers made fresh daily.',
    images: ['/images/menu-og.jpg'], // optional
  },
}

export default function MenuPage() {
  return <MenuSection />
}
