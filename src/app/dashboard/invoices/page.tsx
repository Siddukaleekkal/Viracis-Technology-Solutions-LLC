'use client'

import { useState, useEffect } from 'react'

interface Invoice {
  id: string
  customer: string
  service: string
  issueDate: string
  dueDate: string
  amount: string
  status: 'Paid' | 'Pending' | 'Overdue'
}

const initialInvoices: Invoice[] = []

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices)
  const [filter, setFilter] = useState<string>('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newInvoice, setNewInvoice] = useState({
    customer: '',
    service: 'Power Wash',
    amount: '350.00',
    dueDate: '2026-08-20',
  })

  // Load persistent invoices from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wizardwash_invoices')
      if (saved) {
        setInvoices(JSON.parse(saved))
      }
    } catch (e) {
      console.error('Failed to load invoices:', e)
    }
  }, [])

  const saveInvoices = (updated: Invoice[]) => {
    setInvoices(updated)
    try {
      localStorage.setItem('wizardwash_invoices', JSON.stringify(updated))
    } catch (e) {
      console.error('Failed to save invoices:', e)
    }
  }

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newInvoice.customer) return

    const created: Invoice = {
      id: `INV-${Math.floor(1053 + Math.random() * 100)}`,
      customer: newInvoice.customer,
      service: newInvoice.service,
      issueDate: 'Today',
      dueDate: newInvoice.dueDate,
      amount: `$${newInvoice.amount}`,
      status: 'Pending',
    }

    saveInvoices([created, ...invoices])
    setIsModalOpen(false)
    setNewInvoice({ customer: '', service: 'Power Wash', amount: '350.00', dueDate: '2026-08-20' })
  }

  const markPaid = (id: string) => {
    saveInvoices(invoices.map((inv) => (inv.id === id ? { ...inv, status: 'Paid' } : inv)))
  }

  const filteredInvoices = invoices.filter((inv) => filter === 'All' || inv.status === filter)

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-900">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Wizard Wash Billing & Invoicing Suite</h1>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Track client payments, send statements, and manage outstanding balances.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <span>+</span> Create New Invoice
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Receivables</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">$0.00</p>
          <p className="text-xs text-slate-500 font-medium mt-1">YTD Processed</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Paid Invoices</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">$0.00</p>
          <p className="text-xs text-slate-400 font-semibold mt-1">0% Collected</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pending Due</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">$0.00</p>
          <p className="text-xs text-slate-400 font-semibold mt-1">0 Pending Invoices</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Overdue Balance</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">$0.00</p>
          <p className="text-xs text-slate-400 font-semibold mt-1">0 Overdue</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
        {['All', 'Paid', 'Pending', 'Overdue'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === tab
                ? 'bg-slate-900 text-white shadow-sm font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-5">Invoice ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Dates</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-slate-400 space-y-2">
                    <p className="text-sm font-semibold text-slate-600">No invoices generated yet.</p>
                    <p className="text-xs">Click <strong className="text-slate-900 font-semibold">'+ Create New Invoice'</strong> above to generate your first statement.</p>
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5 font-bold text-slate-900">{inv.id}</td>
                    <td className="py-4 px-4 font-bold text-slate-900">{inv.customer}</td>
                    <td className="py-4 px-4 text-slate-600">{inv.service}</td>
                    <td className="py-4 px-4 text-slate-500">
                      <p>Issue: {inv.issueDate}</p>
                      <p className="text-[10px] text-slate-400">Due: {inv.dueDate}</p>
                    </td>
                    <td className="py-4 px-4 font-extrabold text-slate-900">{inv.amount}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : inv.status === 'Pending'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {inv.status !== 'Paid' && (
                          <button
                            onClick={() => markPaid(inv.id)}
                            className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[11px] font-semibold transition-colors"
                          >
                            Mark Paid
                          </button>
                        )}
                        <button
                          onClick={() => alert(`Generating PDF statement for ${inv.id}...`)}
                          className="px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded text-[11px] font-semibold transition-colors"
                        >
                          PDF
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

      {/* Create Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Create Invoice</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robert Taylor"
                  value={newInvoice.customer}
                  onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Service Rendered</label>
                <input
                  type="text"
                  value={newInvoice.service}
                  onChange={(e) => setNewInvoice({ ...newInvoice, service: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Amount ($)</label>
                  <input
                    type="text"
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
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
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
