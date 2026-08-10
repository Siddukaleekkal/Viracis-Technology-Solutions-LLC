'use client'

import dynamic from 'next/dynamic'

// Dynamically import AppleMapComponent with SSR disabled for Leaflet client rendering
const AppleMapComponent = dynamic(() => import('@/components/AppleMapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[720px] rounded-3xl bg-slate-900 border border-gray-800 shadow-2xl flex flex-col items-center justify-center p-8 text-white space-y-4">
      <div className="w-12 h-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin"></div>
      <p className="text-sm font-semibold tracking-wide text-cyan-300">
        Loading Field Operations Hub...
      </p>
    </div>
  ),
})

export default function MapViewPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Field Operations Hub
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Real-time GPS mapping, territory job density, turn-by-turn dispatch, and route planning.
          </p>
        </div>
      </div>

      {/* Interactive Apple Map */}
      <AppleMapComponent />

    </div>
  )
}
