'use client'

import { useState, useRef, useEffect } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'
import { CITIES } from '@/lib/data'

interface CitySearchDropdownProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  inputClassName?: string
}

export default function CitySearchDropdown({ 
  value,
  onChange, 
  placeholder = "Select city...", 
  className = "",
  inputClassName = ""
}: CitySearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [displayValue, setDisplayValue] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Filter cities based on search term
  const filteredCities = CITIES.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle initial value
  useEffect(() => {
    if (value && CITIES.includes(value)) {
      setDisplayValue(value)
    }
  }, [value])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const term = e.target.value
    setSearchTerm(term)
    setDisplayValue(term)
    setIsOpen(true)
  }

  function handleCitySelect(city: string) {
    setDisplayValue(city)
    setSearchTerm('')
    onChange(city)
    setIsOpen(false)
  }

  function handleInputFocus() {
    setIsOpen(true)
    setSearchTerm(displayValue)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setIsOpen(false)
      setSearchTerm('')
    }
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div className="relative">
        <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        <input
          id="city-search-input"
          name="city"
          aria-label="Search by city"
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-white ${inputClassName}`}
        />
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {filteredCities.length === 0 ? (
            <div className="px-4 py-3 text-gray-500 text-sm">
              No city found. Try a different search term.
            </div>
          ) : (
            <div className="max-h-60 overflow-y-auto">
              {filteredCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleCitySelect(city)}
                  className="w-full px-4 py-2.5 text-left hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none transition-colors text-sm"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-900">{city}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
