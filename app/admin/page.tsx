import Link from 'next/link'
import BurgerList from '@/components/BurgerList'
import AdminAnalytics from '@/components/AdminAnalytics'
import AdminSummaryCards from '@/components/AdminSummaryCards'
import AdminDailyChart from '@/components/AdminDailyChart'

export default function AdminPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 p-6 border-r border-zinc-200 dark:border-zinc-700">
        <h2 className="text-2xl font-bold text-orange-600 mb-8">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/admin" className="block text-zinc-800 dark:text-zinc-200 hover:text-orange-600">
              🧾 Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/create" className="block text-zinc-800 dark:text-zinc-200 hover:text-orange-600">
              ➕ Add Burger
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🍔 Admin Dashboard</h1>
        </div>

        <div className="mb-6">
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow text-center text-zinc-500 dark:text-zinc-400">
            <AdminSummaryCards />
            <AdminAnalytics />
            <AdminDailyChart />
          </div>
        </div>

        <BurgerList />
      </main>
    </div>
  )
}
