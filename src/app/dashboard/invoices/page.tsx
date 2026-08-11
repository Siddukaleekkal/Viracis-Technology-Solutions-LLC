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
    service: 'Driveway Power Wash',
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
    setNewInvoice({ customer: '', service: 'Driveway Power Wash', amount: '350.00', dueDate: '2026-08-20' })
  }

  const markPaid = (id: string) => {
    saveInvoices(invoices.map((inv) => (inv.id === id ? { ...inv, status: 'Paid' } : inv)))
  }

  const filteredInvoices = invoices.filter((inv) => filter === 'All' || inv.status === filter)

  // Calculations for summary metrics
  const totalProcessed = invoices.reduce((acc, inv) => acc + (parseFloat(inv.amount.replace(/[^0-9.]/g, '')) || 0), 0)
  const paidTotal = invoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((acc, inv) => acc + (parseFloat(inv.amount.replace(/[^0-9.]/g, '')) || 0), 0)
  const pendingTotal = invoices
    .filter((inv) => inv.status === 'Pending')
    .reduce((acc, inv) => acc + (parseFloat(inv.amount.replace(/[^0-9.]/g, '')) || 0), 0)
  const overdueTotal = invoices
    .filter((inv) => inv.status === 'Overdue')
    .reduce((acc, inv) => acc + (parseFloat(inv.amount.replace(/[^0-9.]/g, '')) || 0), 0)

  return (
    <div className="max-w-7xl mx-auto space-y-4 font-sans text-slate-900">
      
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">Viracis Billing & Invoices</h1>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Track client statements, record payments, and manage outstanding balances.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
        >
          <span>+</span> Create Invoice
        </button>
      </div>

      {/* Summary KPI Cards (Compact 2x2 Grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Receivables</p>
          <p className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-1">${totalProcessed.toFixed(0)}</p>
          <p className="text-[10px] text-slate-500 font-medium mt-0.5">{invoices.length} Statements</p>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">Paid Invoices</p>
          <p className="text-lg sm:text-2xl font-extrabold text-emerald-600 mt-1">${paidTotal.toFixed(0)}</p>
          <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
            {totalProcessed > 0 ? ((paidTotal / totalProcessed) * 100).toFixed(0) : 0}% Collected
          </p>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Due</p>
          <p className="text-lg sm:text-2xl font-extrabold text-blue-600 mt-1">${pendingTotal.toFixed(0)}</p>
          <p className="text-[10px] text-blue-700 font-semibold mt-0.5">
            {invoices.filter((i) => i.status === 'Pending').length} Pending
          </p>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">Overdue Balance</p>
          <p className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-1">${overdueTotal.toFixed(0)}</p>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
            {invoices.filter((i) => i.status === 'Overdue').length} Overdue
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1.5 overflow-x-auto">
        {['All', 'Paid', 'Pending', 'Overdue'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
              filter === tab
                ? 'bg-slate-900 text-white shadow-sm font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 2x2 Invoices Grid View (Saves Vertical Space) */}
      {filteredInvoices.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3 shadow-sm">
          <p className="text-sm font-semibold text-slate-600">No invoice records found in billing feed.</p>
          <p className="text-xs text-slate-400">Click '+ Create Invoice' above to issue a statement.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-50 text-blue-700 font-bold text-xs rounded-xl hover:bg-blue-100 transition-colors inline-block"
          >
            + Create New Invoice
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredInvoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3 font-sans hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              {/* Card Header: Invoice ID, Status Pill, & Amount */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">{inv.id}</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md border ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : inv.status === 'Pending'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-red-100 text-red-800 border-red-200'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-800 mt-0.5">{inv.customer}</p>
                </div>

                <div className="text-right">
                  <span className="text-base font-extrabold text-slate-900 block">{inv.amount}</span>
                  <span className="text-[10px] text-slate-400 font-medium">Due: {inv.dueDate}</span>
                </div>
              </div>

              {/* Service Rendered */}
              <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Service Item</p>
                <p className="font-semibold text-slate-900 mt-0.5">{inv.service}</p>
              </div>

              {/* Actions Row */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-[10px] text-slate-400">Issued: {inv.issueDate}</span>
                
                <div className="flex items-center gap-2">
                  {inv.status !== 'Paid' && (
                    <button
                      onClick={() => markPaid(inv.id)}
                      className="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold transition-colors"
                    >
                      Mark Paid
                    </button>
                  )}
                  <button
                    onClick={() => alert(`Generating PDF statement for ${inv.id}...`)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                  >
                    PDF Statement
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Create New Invoice</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robert Taylor"
                  value={newInvoice.customer}
                  onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Service Rendered</label>
                <input
                  type="text"
                  value={newInvoice.service}
                  onChange={(e) => setNewInvoice({ ...newInvoice, service: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Amount ($)</label>
                  <input
                    type="text"
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm"
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
