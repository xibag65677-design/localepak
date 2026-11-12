'use client'

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { CITIES } from '@/lib/data'

type CityComboboxProps = {
  value: string
  onChange: (city: string) => void
  required?: boolean
  className?: string
  placeholder?: string
}

const defaultClassName =
  'w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600'

export default function CityCombobox({
  value,
  onChange,
  required = false,
  className = defaultClassName,
  placeholder = 'Select or search your city',
}: CityComboboxProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const listboxId = useId()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return CITIES
    return CITIES.filter((c) => c.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    setHighlight(0)
  }, [query])

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [])

  useEffect(() => {
    if (!open) return
    const el = listRef.current?.children[highlight] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [highlight, open])

  function openList() {
    if (!open) {
      setQuery('')
      setHighlight(0)
      setOpen(true)
    }
  }

  function select(city: string) {
    onChange(city)
    setOpen(false)
    setQuery('')
    inputRef.current?.blur()
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) {
        openList()
        return
      }
      setHighlight((h) => Math.min(h + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (open) setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      if (open && filtered.length > 0) {
        e.preventDefault()
        select(filtered[Math.min(highlight, filtered.length - 1)])
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={open ? query : value}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        onFocus={openList}
        onClick={openList}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onKeyDown={onKeyDown}
        className={className}
      />
      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          className="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg py-1 text-sm"
        >
          {filtered.length === 0 && (
            <li className="px-4 py-2 text-slate-400">No city found</li>
          )}
          {filtered.map((city, i) => (
            <li
              key={city}
              role="option"
              aria-selected={city === value}
              onMouseDown={(e) => {
                e.preventDefault()
                select(city)
              }}
              onMouseEnter={() => setHighlight(i)}
              className={`px-4 py-2 cursor-pointer flex items-center justify-between ${
                i === highlight ? 'bg-emerald-50' : ''
              } ${city === value ? 'font-bold text-emerald-700' : 'text-slate-700'}`}
            >
              <span>{city}</span>
              {city === value && <Check className="w-4 h-4 shrink-0" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
