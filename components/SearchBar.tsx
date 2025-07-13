'use client'

import { useState } from 'react'

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [value, setValue] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSearch(value)
      }}
      className="mb-6 flex gap-2 justify-center"
    >
      <input
        type="text"
        placeholder="Search burgers..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input w-60"
      />
      <button type="submit" className="btn bg-orange-600 text-white">Search</button>
    </form>
  )
}
