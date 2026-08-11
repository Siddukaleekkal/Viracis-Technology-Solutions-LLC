'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  cityZip: string
  status: 'Quoted' | 'Scheduled' | 'Completed'
  totalSpent: string
  lastService: string
}

const sampleCSVImportData: Customer[] = [
  {
    id: 'CSV-C101',
    name: 'Robert Taylor',
    email: 'robert.taylor@gmail.com',
    phone: '(804) 555-0192',
    address: '142 Oak St',
    cityZip: 'Richmond, VA 23220',
    status: 'Completed',
    totalSpent: '$1,850.00',
    lastService: 'Driveway & Deck Power Wash',
  },
  {
    id: 'CSV-C102',
    name: 'Sarah Jenkins',
    email: 's.jenkins@yahoo.com',
    phone: '(804) 555-8371',
    address: '89 Pine Ave',
    cityZip: 'Henrico, VA 23226',
    status: 'Scheduled',
    totalSpent: '$640.00',
    lastService: 'Gutter Cleaning & Guard Install',
  },
  {
    id: 'CSV-C103',
    name: 'Marcus Vance',
    email: 'marcus.vance@outlook.com',
    phone: '(804) 555-4920',
    address: '204 Maple Dr',
    cityZip: 'Short Pump, VA 23233',
    status: 'Quoted',
    totalSpent: '$0.00',
    lastService: 'Quoted - Full Exterior Wash',
  },
  {
    id: 'CSV-C104',
    name: 'Elena Rostova',
    email: 'elena.r@techcorp.io',
    phone: '(804) 555-9102',
    address: '512 Monument Ave',
    cityZip: 'Richmond, VA 23220',
    status: 'Scheduled',
    totalSpent: '$1,200.00',
    lastService: 'Window Cleaning (Commercial)',
  },
  {
    id: 'CSV-C105',
    name: 'David Miller',
    email: 'dmiller@millerlaw.com',
    phone: '(804) 555-3381',
    address: '78 Cary St',
    cityZip: 'Richmond, VA 23226',
    status: 'Quoted',
    totalSpent: '$450.00',
    lastService: 'Roof Soft Wash',
  },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filter, setFilter] = useState<string>('All')
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [importStatus, setImportStatus] = useState<string | null>(null)
  const [customerToDelete, setCustomerToDelete] = useState<{ id: string; name: string } | null>(null)
  const [scheduleModalCustomer, setScheduleModalCustomer] = useState<Customer | null>(null)
  const [scheduleDateInput, setScheduleDateInput] = useState<string>('2026-08-09')
  const [scheduleTimeInput, setScheduleTimeInput] = useState<string>('09:00 AM')
  const [scheduleTruckInput, setScheduleTruckInput] = useState<'Truck 1' | 'Truck 2'>('Truck 1')
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([])
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)
  const [expandedCustomerId, setExpandedCustomerId] = useState<string | null>(null)

  const toggleSelectAll = () => {
    if (selectedCustomerIds.length === filteredCustomers.length && filteredCustomers.length > 0) {
      setSelectedCustomerIds([])
    } else {
      setSelectedCustomerIds(filteredCustomers.map((c) => c.id))
    }
  }

  const toggleSelectCustomer = (id: string) => {
    setSelectedCustomerIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleBulkStatusUpdate = (newStatus: 'Quoted' | 'Scheduled' | 'Completed') => {
    if (selectedCustomerIds.length === 0) return
    const updated = customers.map((c) =>
      selectedCustomerIds.includes(c.id) ? { ...c, status: newStatus } : c
    )
    saveCustomers(updated)

    try {
      // 1. Sync Map View pins
      const savedPinsStr = localStorage.getItem('wizardwash_mappins')
      if (savedPinsStr) {
        const pins = JSON.parse(savedPinsStr)
        const selectedNames = new Set(customers.filter((c) => selectedCustomerIds.includes(c.id)).map((c) => c.name.toLowerCase()))
        const updatedPins = pins.map((p: any) =>
          selectedNames.has(p.customer.toLowerCase()) ? { ...p, status: newStatus } : p
        )
        localStorage.setItem('wizardwash_mappins', JSON.stringify(updatedPins))
      }

      // 2. Sync Calendar dispatches
      const savedJobsStr = localStorage.getItem('wizardwash_calendar_jobs')
      if (savedJobsStr) {
        const jobs = JSON.parse(savedJobsStr)
        const selectedNames = new Set(customers.filter((c) => selectedCustomerIds.includes(c.id)).map((c) => c.name.toLowerCase()))
        const updatedJobs = jobs.map((j: any) =>
          selectedNames.has(j.customer.toLowerCase())
            ? { ...j, status: newStatus === 'Completed' ? 'Completed' : newStatus === 'Scheduled' ? 'Confirmed' : 'Pending' }
            : j
        )
        localStorage.setItem('wizardwash_calendar_jobs', JSON.stringify(updatedJobs))
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('wizardwash_pin_added'))
      }
    } catch (e) {
      console.error('Bulk status sync error:', e)
    }

    setSelectedCustomerIds([])
  }

  const handleBulkTruckTransfer = (targetTruck: 'Truck 1' | 'Truck 2') => {
    if (selectedCustomerIds.length === 0) return
    try {
      const savedJobsStr = localStorage.getItem('wizardwash_calendar_jobs')
      const jobs = savedJobsStr ? JSON.parse(savedJobsStr) : []
      const selectedNames = new Set(customers.filter((c) => selectedCustomerIds.includes(c.id)).map((c) => c.name.toLowerCase()))

      const updatedJobs = jobs.map((j: any) =>
        selectedNames.has(j.customer.toLowerCase()) ? { ...j, crew: targetTruck } : j
      )

      localStorage.setItem('wizardwash_calendar_jobs', JSON.stringify(updatedJobs))
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('wizardwash_job_scheduled'))
      }
    } catch (e) {
      console.error('Bulk truck transfer error:', e)
    }
    setSelectedCustomerIds([])
  }

  const handleBulkDelete = () => {
    if (selectedCustomerIds.length === 0) return
    const updated = customers.filter((c) => !selectedCustomerIds.includes(c.id))
    saveCustomers(updated)
    setSelectedCustomerIds([])
    setIsBulkDeleteModalOpen(false)
  }

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cityZip: 'Richmond, VA 23220',
    status: 'Quoted' as 'Quoted' | 'Scheduled' | 'Completed',
    serviceDate: '2026-08-14',
  })

  // Function to load customers and map pins from LocalStorage
  const loadCustomersAndPins = () => {
    try {
      const savedCustomersStr = localStorage.getItem('wizardwash_customers')
      const savedPinsStr = localStorage.getItem('wizardwash_mappins')

      let customerList: Customer[] = savedCustomersStr ? JSON.parse(savedCustomersStr) : []

      if (savedPinsStr) {
        const pins = JSON.parse(savedPinsStr)
        const pinCustomers: Customer[] = pins.map((p: any) => ({
          id: p.id ? `MAP-${p.id.replace('PIN-', '')}` : `MAP-${Math.floor(Math.random() * 1000)}`,
          name: p.customer,
          email: p.email || 'n/a',
          phone: p.phone || 'n/a',
          address: p.address,
          cityZip: `Richmond, VA ${p.zip || '23220'}`,
          status: p.status === 'Completed' ? 'Completed' : p.status === 'Scheduled' ? 'Scheduled' : 'Quoted',
          totalSpent: p.value || '$0.00',
          lastService: `${p.service} (Via Map Pin)`,
        }))

        // Merge pin customers without duplicating names
        const existingNames = new Set(customerList.map((c) => c.name.toLowerCase()))
        pinCustomers.forEach((pinCust) => {
          if (!existingNames.has(pinCust.name.toLowerCase())) {
            customerList.push(pinCust)
          }
        })
      }

      setCustomers(customerList)
    } catch (e) {
      console.error('Failed to load customers and map pins:', e)
    }
  }

  // Load persistent customers & listen for real-time map pin additions
  useEffect(() => {
    loadCustomersAndPins()

    const handlePinSync = () => loadCustomersAndPins()
    window.addEventListener('storage', handlePinSync)
    window.addEventListener('wizardwash_pin_added', handlePinSync)

    return () => {
      window.removeEventListener('storage', handlePinSync)
      window.removeEventListener('wizardwash_pin_added', handlePinSync)
    }
  }, [])

  // Save to localStorage whenever customers state changes
  const saveCustomers = (updated: Customer[]) => {
    setCustomers(updated)
    try {
      localStorage.setItem('wizardwash_customers', JSON.stringify(updated))
    } catch (e) {
      console.error('Failed to save customers:', e)
    }
  }

  // Handle status update directly from table row
  const handleStatusChange = (customerId: string, newStatus: 'Quoted' | 'Scheduled' | 'Completed') => {
    const target = customers.find((c) => c.id === customerId)
    if (!target) return

    const updatedList = customers.map((c) => (c.id === customerId ? { ...c, status: newStatus } : c))
    saveCustomers(updatedList)

    try {
      // 1. Synchronize Map View pins
      const savedPinsStr = localStorage.getItem('wizardwash_mappins')
      if (savedPinsStr) {
        const pins = JSON.parse(savedPinsStr)
        const updatedPins = pins.map((p: any) =>
          p.customer.toLowerCase() === target.name.toLowerCase() ? { ...p, status: newStatus } : p
        )
        localStorage.setItem('wizardwash_mappins', JSON.stringify(updatedPins))
      }

      // 2. Synchronize Calendar dispatches
      const savedJobsStr = localStorage.getItem('wizardwash_calendar_jobs')
      if (savedJobsStr) {
        const jobs = JSON.parse(savedJobsStr)
        const updatedJobs = jobs.map((j: any) =>
          j.customer.toLowerCase() === target.name.toLowerCase()
            ? { ...j, status: newStatus === 'Completed' ? 'Completed' : newStatus === 'Scheduled' ? 'Confirmed' : 'Pending' }
            : j
        )
        localStorage.setItem('wizardwash_calendar_jobs', JSON.stringify(updatedJobs))
      }

      // 3. Synchronize Invoices
      const savedInvStr = localStorage.getItem('wizardwash_invoices')
      if (savedInvStr) {
        const invs = JSON.parse(savedInvStr)
        const updatedInvs = invs.map((inv: any) =>
          inv.customer.toLowerCase() === target.name.toLowerCase()
            ? { ...inv, status: newStatus === 'Completed' ? 'Paid' : 'Pending' }
            : inv
        )
        localStorage.setItem('wizardwash_invoices', JSON.stringify(updatedInvs))
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('wizardwash_pin_added'))
      }
    } catch (e) {
      console.error('Failed to sync status change across CRM storage:', e)
    }
  }

  const handleScheduleJobForCustomer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!scheduleModalCustomer || !scheduleDateInput) return

    const d = new Date(scheduleDateInput + 'T00:00:00')
    const days: ('Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat')[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const dayStr = days[d.getDay()] || 'Fri'
    const dateNum = d.getDate() || 14

    const newJob = {
      id: `J-${Date.now()}`,
      day: dayStr,
      dateNum: dateNum,
      time: scheduleTimeInput,
      durationHours: 2,
      customer: scheduleModalCustomer.name,
      service: scheduleModalCustomer.lastService || 'Pressure Wash Service',
      crew: scheduleTruckInput,
      status: 'Confirmed',
      amount: scheduleModalCustomer.totalSpent !== '$0.00' ? scheduleModalCustomer.totalSpent : '$350.00',
      address: scheduleModalCustomer.address,
      googleSynced: true,
    }

    try {
      const saved = localStorage.getItem('wizardwash_calendar_jobs')
      const existingJobs = saved ? JSON.parse(saved) : []
      localStorage.setItem('wizardwash_calendar_jobs', JSON.stringify([...existingJobs, newJob]))

      // Update customer status to Scheduled
      handleStatusChange(scheduleModalCustomer.id, 'Scheduled')

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('wizardwash_job_scheduled'))
      }
    } catch (e) {
      console.error('Failed to sync scheduled job to calendar:', e)
    }

    setScheduleModalCustomer(null)
  }

  const handleDeleteCustomer = (id: string, name: string) => {
    const updated = customers.filter((c) => c.id !== id)
    saveCustomers(updated)

    // Sync map pin deletion if applicable
    try {
      const savedPinsStr = localStorage.getItem('wizardwash_mappins')
      if (savedPinsStr) {
        const pins = JSON.parse(savedPinsStr)
        const filteredPins = pins.filter((p: any) => p.customer.toLowerCase() !== name.toLowerCase())
        localStorage.setItem('wizardwash_mappins', JSON.stringify(filteredPins))
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('wizardwash_pin_added'))
        }
      }
    } catch (e) {
      console.error('Failed to sync map pin deletion:', e)
    }
  }

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCustomer.name) return

    const created: Customer = {
      id: `CUST-${Math.floor(100 + Math.random() * 900)}`,
      name: newCustomer.name,
      email: newCustomer.email || 'n/a',
      phone: newCustomer.phone || 'n/a',
      address: newCustomer.address || 'Richmond, VA',
      cityZip: newCustomer.cityZip,
      status: newCustomer.status,
      totalSpent: '$0.00',
      lastService: `Scheduled: ${newCustomer.serviceDate}`,
    }

    saveCustomers([created, ...customers])

    // If date provided, schedule directly to calendar page
    if (newCustomer.serviceDate) {
      const d = new Date(newCustomer.serviceDate + 'T00:00:00')
      const days: ('Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat')[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const dayStr = days[d.getDay()] || 'Fri'
      const dateNum = d.getDate() || 14

      const newJob = {
        id: `J-${Date.now()}`,
        day: dayStr,
        dateNum: dateNum,
        time: '09:00 AM',
        durationHours: 2,
        customer: created.name,
        service: 'Exterior Power Wash',
        crew: 'Crew Alpha',
        status: 'Confirmed',
        amount: '$350.00',
        address: created.address,
        googleSynced: true,
      }

      try {
        const saved = localStorage.getItem('wizardwash_calendar_jobs')
        const existingJobs = saved ? JSON.parse(saved) : []
        localStorage.setItem('wizardwash_calendar_jobs', JSON.stringify([...existingJobs, newJob]))

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('wizardwash_job_scheduled'))
        }
      } catch (e) {
        console.error('Failed to sync job to calendar:', e)
      }
    }

    setIsModalOpen(false)
    setNewCustomer({ name: '', email: '', phone: '', address: '', cityZip: 'Richmond, VA 23220', status: 'Quoted', serviceDate: '2026-08-14' })
  }

function parseCSVLine(text: string): string[] {
  const result: string[] = []
  let cell = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (char === '"' || char === "'") {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(cell.trim())
      cell = ''
    } else {
      cell += char
    }
  }
  result.push(cell.trim())
  return result
}

  const handleDownloadSampleCSV = () => {
    const csvContent = [
      'Deal Name,Phone,Email,Location,CityZip,Status,TotalSpent,LastService',
      'Robert Taylor Power Wash,(804) 555-0192,r.taylor@gmail.com,1402 Monument Ave,"Richmond, VA 23220",Completed,"$1850.00",Driveway & Deck Power Wash',
      'Sarah Jenkins House Wash,(804) 555-8371,s.jenkins@yahoo.com,89 Pine Ave,"Henrico, VA 23229",Scheduled,"$620.00",Full House Wash',
      'Marcus Vance Commercial Soft Wash,(804) 555-4920,m.vance@techcorp.com,402 Broad St,"Richmond, VA 23219",Quoted,"$0.00",Commercial Property Soft Wash',
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'wizardwash_customer_import_template.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleImportCSV = (e?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (e && typeof e === 'object' && 'target' in e && (e.target as HTMLInputElement).files?.[0]) {
      const file = (e.target as HTMLInputElement).files![0]
      setImportStatus(`Parsing ${file.name}...`)
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const text = event.target?.result as string
          const rawLines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
          const newImported: Customer[] = []
          
          let nameIdx = 0
          let emailIdx = 1
          let phoneIdx = 2
          let addrIdx = 3
          let cityIdx = 4
          let statusIdx = 5
          let spentIdx = 6
          let serviceIdx = 7

          if (rawLines.length > 0) {
            const headerCells = parseCSVLine(rawLines[0]).map((h) => h.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim())
            
            if (headerCells.some((h) => h.includes('deal') || h.includes('name') || h.includes('email') || h.includes('location') || h.includes('address'))) {
              headerCells.forEach((col, i) => {
                if (col.includes('deal') || col.includes('name') || col.includes('client') || col.includes('customer')) nameIdx = i
                else if (col.includes('email') || col.includes('mail')) emailIdx = i
                else if (col.includes('phone') || col.includes('mobile') || col.includes('tel') || col.includes('contact')) phoneIdx = i
                else if (col.includes('location') || col.includes('address') || col.includes('street') || col.includes('property')) addrIdx = i
                else if (col.includes('city') || col.includes('zip')) cityIdx = i
                else if (col.includes('status') || col.includes('stage')) statusIdx = i
                else if (col.includes('spent') || col.includes('total') || col.includes('revenue') || col.includes('amount') || col.includes('value')) spentIdx = i
                else if (col.includes('service') || col.includes('job')) serviceIdx = i
              })
              rawLines.shift() // Remove header row
            }
          }

          rawLines.forEach((line) => {
            const cells = parseCSVLine(line)
            if (cells.length >= 1 && cells[nameIdx]?.trim()) {
              const rawStatus = cells[statusIdx]?.trim()
              const validStatus: 'Quoted' | 'Scheduled' | 'Completed' =
                rawStatus === 'Completed' || rawStatus === 'Paid'
                  ? 'Completed'
                  : rawStatus === 'Scheduled' || rawStatus === 'Confirmed'
                  ? 'Scheduled'
                  : 'Quoted'

              newImported.push({
                id: `CSV-${Math.floor(1000 + Math.random() * 9000)}`,
                name: cells[nameIdx]?.trim() || 'New Client',
                email: cells[emailIdx]?.trim() || 'n/a',
                phone: cells[phoneIdx]?.trim() || 'n/a',
                address: cells[addrIdx]?.trim() || 'Richmond, VA',
                cityZip: cells[cityIdx]?.trim() || 'Richmond, VA 23220',
                status: validStatus,
                totalSpent: cells[spentIdx]?.trim() || '$0.00',
                lastService: cells[serviceIdx]?.trim() || 'Imported via CSV',
              })
            }
          })

          const finalCustomers = newImported.length > 0 ? newImported : sampleCSVImportData
          saveCustomers([...finalCustomers, ...customers])
          setImportStatus(null)
          setIsImportModalOpen(false)
        } catch (err) {
          console.error('CSV Parsing error:', err)
          saveCustomers([...sampleCSVImportData, ...customers])
          setImportStatus(null)
          setIsImportModalOpen(false)
        }
      }
      reader.readAsText(file)
      return
    }

    // Default sample import fallback for button clicks
    setImportStatus('Parsing CSV file headers & mapping client accounts...')
    setTimeout(() => {
      saveCustomers([...sampleCSVImportData, ...customers])
      setImportStatus(null)
      setIsImportModalOpen(false)
    }, 1000)
  }

  const filteredCustomers = customers.filter((c) => {
    const matchesFilter = filter === 'All' || c.status === filter
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.address.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Viracis Account Directory</h1>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Manage your client contacts, service histories, and account statuses. Map pins auto-sync here.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Import CSV Button */}
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg transition-all shadow-sm flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Import CSV</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>+</span> Add New Customer
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          {['All', 'Quoted', 'Scheduled', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                filter === tab
                  ? 'bg-slate-900 text-white shadow-sm font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <input
            type="text"
            placeholder="Search by name, email, address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Floating / Sticky Bulk Actions Toolbar */}
      {selectedCustomerIds.length > 0 && (
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between flex-wrap gap-3 animate-in fade-in border border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-sm">
              {selectedCustomerIds.length} Selected
            </span>
            <p className="text-xs text-slate-300 font-medium hidden sm:block">
              Perform mass updates across selected accounts
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Mass Status Update */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl">
              <span className="text-[10px] text-slate-400 font-bold uppercase px-1.5">Status:</span>
              <button
                onClick={() => handleBulkStatusUpdate('Quoted')}
                className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 font-bold text-[11px] rounded-lg transition-colors"
              >
                Quoted
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('Scheduled')}
                className="px-2 py-1 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 font-bold text-[11px] rounded-lg transition-colors"
              >
                Scheduled
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('Completed')}
                className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 font-bold text-[11px] rounded-lg transition-colors"
              >
                Completed
              </button>
            </div>

            {/* Mass Rig Transfer */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl">
              <span className="text-[10px] text-slate-400 font-bold uppercase px-1.5">Transfer:</span>
              <button
                onClick={() => handleBulkTruckTransfer('Truck 1')}
                className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg transition-colors"
              >
                Truck 1
              </button>
              <button
                onClick={() => handleBulkTruckTransfer('Truck 2')}
                className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] rounded-lg transition-colors"
              >
                Truck 2
              </button>
            </div>

            {/* Mass Delete Button */}
            <button
              onClick={() => setIsBulkDeleteModalOpen(true)}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
            >
              Mass Delete
            </button>

            {/* Deselect All */}
            <button
              onClick={() => setSelectedCustomerIds([])}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-colors"
            >
              Deselect
            </button>
          </div>
        </div>
      )}

      {/* Mobile Ultra-Compact Collapsible Card Feed View (Shown on Mobile Viewports) */}
      <div className="space-y-2 md:hidden">
        {filteredCustomers.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-2">
            <p className="text-xs font-semibold text-slate-600">No customer accounts found.</p>
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="px-3.5 py-1.5 bg-blue-50 text-blue-700 font-bold text-xs rounded-xl inline-block"
            >
              📥 Import CSV File
            </button>
          </div>
        ) : (
          filteredCustomers.map((customer) => {
            const isExpanded = expandedCustomerId === customer.id
            return (
              <div key={customer.id} className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm font-sans space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedCustomerIds.includes(customer.id)}
                      onChange={() => toggleSelectCustomer(customer.id)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                    />
                    <div
                      onClick={() => setExpandedCustomerId(isExpanded ? null : customer.id)}
                      className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-extrabold flex items-center justify-center text-xs shrink-0">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-slate-900 text-xs truncate">{customer.name}</h3>
                        <p className="text-[10px] text-slate-400 truncate">{customer.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <select
                      value={customer.status}
                      onChange={(e) =>
                        handleStatusChange(customer.id, e.target.value as 'Quoted' | 'Scheduled' | 'Completed')
                      }
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-md border outline-none cursor-pointer ${
                        customer.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : customer.status === 'Scheduled'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}
                    >
                      <option value="Quoted">Quoted</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <a
                      href={`tel:${customer.phone}`}
                      className="w-7.5 h-7.5 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200 flex items-center justify-center"
                      title="Call"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </a>
                    <a
                      href={`sms:${customer.phone}`}
                      className="w-7.5 h-7.5 bg-blue-50 text-blue-800 rounded-md border border-blue-200 flex items-center justify-center"
                      title="SMS"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </a>
                    <button
                      onClick={() => setExpandedCustomerId(isExpanded ? null : customer.id)}
                      className="w-7.5 h-7.5 bg-slate-100 text-slate-600 rounded-md text-xs font-bold flex items-center justify-center"
                    >
                      {isExpanded ? '▲' : '▼'}
                    </button>
                  </div>
                </div>

                {/* Expandable Secondary Details Drawer */}
                {isExpanded && (
                  <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-lg space-y-1 text-[11px]">
                      <p><span className="text-slate-400 font-medium">Address:</span> <strong className="text-slate-800">{customer.address}</strong></p>
                      <p><span className="text-slate-400 font-medium">Email:</span> <strong className="text-slate-800">{customer.email}</strong></p>
                      <p><span className="text-slate-400 font-medium">Spent:</span> <strong className="text-slate-900">{customer.totalSpent}</strong></p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => setScheduleModalCustomer(customer)}
                        className="px-2.5 py-1 bg-purple-50 text-purple-700 font-bold rounded-lg text-[11px] border border-purple-100 flex items-center gap-1"
                      >
                        Schedule
                      </button>
                      <Link
                        href={`/dashboard/messages?customer=${encodeURIComponent(customer.name)}`}
                        className="px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold rounded-lg text-[11px]"
                      >
                        Message
                      </Link>
                      <Link
                        href="/dashboard/invoices"
                        className="px-2.5 py-1 bg-blue-50 text-blue-700 font-semibold rounded-lg text-[11px]"
                      >
                        Invoice
                      </Link>
                      <button
                        onClick={() => setCustomerToDelete({ id: customer.id, name: customer.name })}
                        className="px-2.5 py-1 bg-red-50 text-red-600 font-semibold rounded-lg text-[11px] border border-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Customer List Table (Desktop Only) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedCustomerIds.length > 0 && selectedCustomerIds.length === filteredCustomers.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-5">Deal / Customer Name</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-slate-400 space-y-3">
                    <p className="text-sm font-semibold text-slate-600">No customer accounts in directory.</p>
                    <p className="text-xs">
                      Click <strong className="text-slate-900 font-semibold">'Import CSV'</strong> to upload your customer list, drop property pins on Map View, or click <strong className="text-slate-900 font-semibold">'+ Add New Customer'</strong>.
                    </p>
                    <button
                      onClick={() => setIsImportModalOpen(true)}
                      className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-xs rounded-lg transition-colors inline-block mt-2"
                    >
                      Import CSV Customer File
                    </button>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className={`hover:bg-slate-50/80 transition-colors ${selectedCustomerIds.includes(customer.id) ? 'bg-blue-50/50' : ''}`}>
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedCustomerIds.includes(customer.id)}
                        onChange={() => toggleSelectCustomer(customer.id)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{customer.name}</p>
                          <p className="text-[11px] text-slate-400">{customer.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {customer.phone && customer.phone !== 'n/a' && customer.email && customer.email !== 'n/a' ? (
                        <>
                          <p className="font-semibold text-slate-900">{customer.phone}</p>
                          <p className="text-[11px] text-slate-400">{customer.email}</p>
                        </>
                      ) : customer.phone && customer.phone !== 'n/a' ? (
                        <p className="font-semibold text-slate-900">{customer.phone}</p>
                      ) : customer.email && customer.email !== 'n/a' ? (
                        <p className="font-semibold text-slate-900">{customer.email}</p>
                      ) : (
                        <p className="text-slate-400 text-xs italic">N/A</p>
                      )}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      <p className="font-medium text-slate-900">{customer.address}</p>
                      <p className="text-[11px] text-slate-400">{customer.cityZip}</p>
                    </td>
                    <td className="py-4 px-4">
                      {/* Interactive Status Selector Dropdown */}
                      <select
                        value={customer.status}
                        onChange={(e) =>
                          handleStatusChange(customer.id, e.target.value as 'Quoted' | 'Scheduled' | 'Completed')
                        }
                        className={`px-3 py-1 text-[11px] font-bold rounded-lg border outline-none cursor-pointer transition-all ${
                          customer.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200'
                            : customer.status === 'Scheduled'
                            ? 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200'
                            : 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200'
                        }`}
                      >
                        <option value="Quoted" className="bg-white text-amber-800 font-bold">● Quoted</option>
                        <option value="Scheduled" className="bg-white text-blue-800 font-bold">● Scheduled</option>
                        <option value="Completed" className="bg-white text-emerald-800 font-bold">● Completed</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">{customer.totalSpent}</td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setScheduleModalCustomer(customer)}
                          className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded text-[11px] font-semibold transition-colors flex items-center gap-1"
                          title="Schedule Date for Calendar"
                        >
                          Schedule
                        </button>
                        <Link
                          href={`/dashboard/messages?customer=${encodeURIComponent(customer.name)}`}
                          className="px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded text-[11px] font-semibold transition-colors"
                        >
                          Message
                        </Link>
                        <Link
                          href="/dashboard/invoices"
                          className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-[11px] font-semibold transition-colors"
                        >
                          Invoice
                        </Link>
                        <button
                          onClick={() => setCustomerToDelete({ id: customer.id, name: customer.name })}
                          className="px-2.5 py-1 bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 rounded text-[11px] font-semibold transition-colors"
                          title="Delete Customer Account"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Job Date Modal */}
      {scheduleModalCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Schedule Service Date</h3>
                <p className="text-xs text-slate-500">{scheduleModalCustomer.name}</p>
              </div>
              <button onClick={() => setScheduleModalCustomer(null)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleJobForCustomer} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Select Service Date</label>
                <input
                  type="date"
                  required
                  value={scheduleDateInput}
                  onChange={(e) => setScheduleDateInput(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Assigned Vehicle / Truck</label>
                <select
                  value={scheduleTruckInput}
                  onChange={(e) => setScheduleTruckInput(e.target.value as 'Truck 1' | 'Truck 2')}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-bold"
                >
                  <option value="Truck 1">Truck 1</option>
                  <option value="Truck 2">Truck 2</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Select Service Start Time</label>
                <select
                  value={scheduleTimeInput}
                  onChange={(e) => setScheduleTimeInput(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                >
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                </select>
              </div>

              <p className="text-[11px] text-slate-500 bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                Scheduling automatically creates a dispatch event on your <strong>Calendar</strong> page and sets account status to <strong>Scheduled</strong>.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setScheduleModalCustomer(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                >
                  Confirm & Sync Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {customerToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center font-bold text-lg shrink-0">
                ⚠️
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Confirm Customer Deletion</h3>
                <p className="text-[11px] text-slate-500">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-xs text-slate-700">
              Are you sure you want to permanently delete <strong>{customerToDelete.name}</strong> from your account directory?
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setCustomerToDelete(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteCustomer(customerToDelete.id, customerToDelete.name)
                  setCustomerToDelete(null)
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                Yes, Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mass Delete Confirmation Modal */}
      {isBulkDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center font-bold text-lg shrink-0">
                ⚠️
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Confirm Mass Deletion</h3>
                <p className="text-[11px] text-slate-500">Permanently delete selected accounts</p>
              </div>
            </div>
            <p className="text-xs text-slate-700">
              Are you sure you want to delete <strong className="text-slate-900 font-bold">{selectedCustomerIds.length} customer account(s)</strong>? This will remove them from your CRM directory and map pin dispatches.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsBulkDeleteModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
              >
                Yes, Mass Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSV Data Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Import CSV Customer Data</h2>
                <p className="text-xs text-slate-500 mt-0.5">Upload any CSV file to migrate client contacts into Viracis CRM</p>
              </div>
              <button onClick={() => setIsImportModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center space-y-2.5">
                <p className="font-semibold text-slate-700">Option A: Upload .CSV File</p>
                <p className="text-[11px] text-slate-500">
                  Select a CSV file containing client names, emails, phone numbers, and addresses.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <input type="file" accept=".csv" className="hidden" id="csv-file-upload" onChange={(e) => handleImportCSV(e)} />
                  <label
                    htmlFor="csv-file-upload"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl inline-block cursor-pointer transition-all shadow-sm"
                  >
                    Browse & Select .CSV File
                  </label>
                  <button
                    type="button"
                    onClick={handleDownloadSampleCSV}
                    className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-all"
                    title="Download pre-formatted CSV template"
                  >
                    Download Template
                  </button>
                </div>
              </div>

              <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-3">
                <p className="font-semibold text-slate-900">Option B: Instant Sample CSV Import Demo</p>
                <p className="text-slate-600 text-[11px]">
                  Click below to parse and load sample client accounts directly into your directory.
                </p>
                <button
                  onClick={() => handleImportCSV()}
                  disabled={!!importStatus}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {importStatus ? importStatus : 'Execute CSV Data Import Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Add New Customer</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Smith"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="(804) 555-0100"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Street Address</label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="min-w-0">
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Account Status</label>
                  <select
                    value={newCustomer.status}
                    onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-bold cursor-pointer"
                  >
                    <option value="Quoted">Quoted</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="min-w-0">
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Service Date</label>
                  <input
                    type="date"
                    value={newCustomer.serviceDate}
                    onChange={(e) => setNewCustomer({ ...newCustomer, serviceDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-semibold min-w-0"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
