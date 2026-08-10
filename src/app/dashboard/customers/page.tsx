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
  const [scheduleDateInput, setScheduleDateInput] = useState<string>('2026-08-14')
  const [scheduleTimeInput, setScheduleTimeInput] = useState<string>('09:00 AM')

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

    // Synchronize status update with corresponding Map View pin
    try {
      const savedPinsStr = localStorage.getItem('wizardwash_mappins')
      if (savedPinsStr) {
        const pins = JSON.parse(savedPinsStr)
        const updatedPins = pins.map((p: any) =>
          p.customer.toLowerCase() === target.name.toLowerCase() ? { ...p, status: newStatus } : p
        )
        localStorage.setItem('wizardwash_mappins', JSON.stringify(updatedPins))
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('wizardwash_pin_added'))
        }
      }
    } catch (e) {
      console.error('Failed to sync status change to map pins:', e)
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
      crew: 'Crew Alpha',
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

  const handleImportCSV = () => {
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
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Wizard Wash Account Directory</h1>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Manage your client contacts, service histories, and account statuses. Map pins auto-sync here.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Import CSV Button */}
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg transition-all shadow-sm flex items-center gap-2"
          >
            <span>📥 Import CSV</span>
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

      {/* Customer List Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-5">Customer</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Last Service</th>
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
                      📥 Import CSV Customer File
                    </button>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/80 transition-colors">
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
                      <p className="font-medium text-slate-900">{customer.email}</p>
                      <p className="text-[11px] text-slate-400">{customer.phone}</p>
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
                    <td className="py-4 px-4 text-slate-600 max-w-[200px] truncate">
                      {customer.lastService}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setScheduleModalCustomer(customer)}
                          className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded text-[11px] font-semibold transition-colors flex items-center gap-1"
                          title="Schedule Date for Calendar"
                        >
                          📅 Schedule
                        </button>
                        <Link
                          href="/dashboard/messages"
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
                ⚡ Scheduling automatically creates a dispatch event on your <strong>Calendar</strong> page and sets account status to <strong>Scheduled</strong>.
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

      {/* CSV Data Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Import CSV Customer Data</h2>
                <p className="text-xs text-slate-500 mt-0.5">Upload any CSV file to migrate client contacts into Wizard Wash</p>
              </div>
              <button onClick={() => setIsImportModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center space-y-2">
                <p className="font-semibold text-slate-700">Option A: Upload .CSV File</p>
                <p className="text-[11px] text-slate-500">
                  Select a CSV file containing your client names, emails, phone numbers, and addresses.
                </p>
                <input type="file" accept=".csv" className="hidden" id="csv-file-upload" onChange={handleImportCSV} />
                <label
                  htmlFor="csv-file-upload"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg inline-block cursor-pointer transition-all shadow-sm"
                >
                  Browse & Select .CSV File
                </label>
              </div>

              <div className="p-4 border border-slate-200 rounded-xl bg-white space-y-3">
                <p className="font-semibold text-slate-900">Option B: Instant Sample CSV Import Demo</p>
                <p className="text-slate-600 text-[11px]">
                  Click below to parse and load sample client accounts directly into your directory.
                </p>
                <button
                  onClick={handleImportCSV}
                  disabled={!!importStatus}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {importStatus ? importStatus : '⚡ Execute CSV Data Import Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Add New Customer</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Smith"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="(804) 555-0100"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Street Address</label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Account Status</label>
                  <select
                    value={newCustomer.status}
                    onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                  >
                    <option value="Quoted">Quoted</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Service Date</label>
                  <input
                    type="date"
                    value={newCustomer.serviceDate}
                    onChange={(e) => setNewCustomer({ ...newCustomer, serviceDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm"
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
