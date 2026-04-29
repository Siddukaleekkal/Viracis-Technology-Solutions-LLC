'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SidebarNav() {
  const pathname = usePathname()

  const links = [
    { name: 'Overview', href: '/dashboard' },
    { name: 'Pipeline', href: '/dashboard/pipeline' },
    { name: 'Calendar', href: '/dashboard/calendar' },
    { name: 'Map View', href: '/dashboard/map' },
  ]

  return (
    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
      {links.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              isActive
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {link.name}
          </Link>
        )
      })}
    </nav>
  )
}
