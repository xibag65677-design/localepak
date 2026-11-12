'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import CitySearchDropdown from '@/components/ui/city-search-dropdown'

export default function HeroSearchForm() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      const slug = query.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
      router.push(`/business/${slug}`)
    } else {
      router.push('/add-business')
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className="mt-6 sm:mt-8 lg:mt-10 bg-white rounded-2xl shadow-2xl p-3 sm:p-4 flex flex-col sm:flex-row gap-3"
      role="search"
      aria-label="Search businesses"
    >
      <div className="flex items-center gap-2 flex-1 px-3">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" aria-hidden="true" />
        <input
          id="search-query-input"
          name="q"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search businesses, categories..."
          className="flex-1 text-gray-800 placeholder-gray-400 bg-transparent outline-none text-sm sm:text-base py-1"
          aria-label="Search query"
        />
      </div>
      <div className="flex items-center gap-2 sm:border-l border-gray-200 sm:pl-3 px-3 flex-1">
        <CitySearchDropdown
          value={city}
          onChange={setCity}
          placeholder="All Cities"
          className="w-full"
          inputClassName="border-none focus:ring-0 py-1 pl-8"
        />
      </div>
      <button
        id="hero-search-submit"
        type="submit"
        className="bg-[#0f2b3d] hover:bg-[#1a3f57] text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-colors duration-200 text-sm sm:text-base cursor-pointer"
        aria-label="Submit business search"
      >
        Search
      </button>
    </form>
  )
}
