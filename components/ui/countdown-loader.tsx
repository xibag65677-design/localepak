'use client'

import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface CountdownLoaderProps {
  onComplete: () => void
  isDataLoading: boolean
  label?: string
}

export default function CountdownLoader({ onComplete, isDataLoading, label }: CountdownLoaderProps) {
  useEffect(() => {
    if (!isDataLoading) {
      onComplete()
    }
  }, [isDataLoading, onComplete])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#f8fafc] w-full">
      <Loader2 className="w-8 h-8 text-[#60a5fa] animate-spin mb-2" />
      <p className="text-sm text-slate-500 font-medium">{label || "Loading directory..."}</p>
    </div>
  )
}
