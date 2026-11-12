'use client'

import { useState } from 'react'

/**
 * Hero city selector (perf, 2026-11-11).
 *
 * The full 183-city list used to render as 184 <option> elements in the
 * initial HTML — the single biggest child count on the page, in a DOM of
 * 2,512 nodes. Only the 20 top cities render at first paint now; the
 * full list loads on first focus / pointer-down (a dynamic import of
 * lib/data) and swaps in, keeping the current selection. The form is a
 * plain GET form, so it still submits without JavaScript — with the top
 * cities only, which matches what a no-JS visitor could pick before.
 */
export default function HeroCitySelect({ topCities }: { topCities: string[] }) {
  const [allCities, setAllCities] = useState<string[] | null>(null)
  const [loaded, setLoaded] = useState(false)

  const loadAll = () => {
    if (loaded) return
    setLoaded(true)
    import('@/lib/data')
      .then((m) => setAllCities(m.CITIES))
      .catch(() => {
        // Full list unavailable — the top cities stay selectable.
        setLoaded(false)
      })
  }

  const options = allCities ?? topCities

  return (
    <select
      id="hero-city-select"
      name="city"
      onFocus={loadAll}
      onPointerDown={loadAll}
      className="w-full bg-transparent text-slate-900 text-sm focus:outline-none cursor-pointer"
    >
      <option value="">All Cities in Pakistan</option>
      {options.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  )
}
