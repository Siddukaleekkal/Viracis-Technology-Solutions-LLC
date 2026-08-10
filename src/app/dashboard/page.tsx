'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const [customerCount, setCustomerCount] = useState(0)
  const [completedRevenue, setCompletedRevenue] = useState(0)
  const [scheduledRevenue, setScheduledRevenue] = useState(0)
  const [quotedRevenue, setQuotedRevenue] = useState(0)
  const [messageCount, setMessageCount] = useState(0)
  const [jobCount, setJobCount] = useState(0)

  const loadMetrics = () => {
    try {
      let completedSum = 0
      let scheduledSum = 0
      let quotedSum = 0

      // 1. Customers Revenue & Status Breakdown
      const savedCust = localStorage.getItem('wizardwash_customers')
      if (savedCust) {
        const parsed = JSON.parse(savedCust)
        setCustomerCount(parsed.length)
        parsed.forEach((c: any) => {
          const val = parseFloat((c.totalSpent || '$0').replace(/[^0-9.]/g, '')) || 0
          if (c.status === 'Completed') completedSum += val
          else if (c.status === 'Scheduled') scheduledSum += val
          else if (c.status === 'Quoted') quotedSum += val
        })
      }

      // 2. Invoices Revenue Breakdown
      const savedInv = localStorage.getItem('wizardwash_invoices')
      if (savedInv) {
        const parsed = JSON.parse(savedInv)
        parsed.forEach((inv: any) => {
          const val = parseFloat((inv.amount || '$0').replace(/[^0-9.]/g, '')) || 0
          if (inv.status === 'Paid') completedSum += val
          else if (inv.status === 'Pending') scheduledSum += val
        })
      }

      // 3. Calendar Jobs Breakdown
      const savedJobs = localStorage.getItem('wizardwash_calendar_jobs')
      if (savedJobs) {
        const parsed = JSON.parse(savedJobs)
        setJobCount(parsed.length)
        parsed.forEach((job: any) => {
          const val = parseFloat((job.amount || '$0').replace(/[^0-9.]/g, '')) || 0
          if (job.status === 'Completed') completedSum += val
          else if (job.status === 'Confirmed' || job.status === 'Scheduled') scheduledSum += val
        })
      }

      // 4. Map Pins Breakdown
      const savedPins = localStorage.getItem('wizardwash_mappins')
      if (savedPins) {
        const parsed = JSON.parse(savedPins)
        parsed.forEach((pin: any) => {
          const val = parseFloat((pin.value || '$0').replace(/[^0-9.]/g, '')) || 0
          if (pin.status === 'Completed') completedSum += val
          else if (pin.status === 'Scheduled') scheduledSum += val
          else if (pin.status === 'Quoted') quotedSum += val
        })
      }

      // 5. Messages Count
      const savedMsgs = localStorage.getItem('wizardwash_conversations')
      if (savedMsgs) {
        const parsed = JSON.parse(savedMsgs)
        setMessageCount(parsed.length)
      }

      setCompletedRevenue(completedSum)
      setScheduledRevenue(scheduledSum)
      setQuotedRevenue(quotedSum)
    } catch (e) {
      console.error('Failed to load dashboard metrics from LocalStorage:', e)
    }
  }

  useEffect(() => {
    loadMetrics()

    const handleSync = () => loadMetrics()
    window.addEventListener('storage', handleSync)
    window.addEventListener('wizardwash_pin_added', handleSync)

    return () => {
      window.removeEventListener('storage', handleSync)
      window.removeEventListener('wizardwash_pin_added', handleSync)
    }
  }, [])

  const monthlyGoal = 30000
  const totalPipeline = completedRevenue + scheduledRevenue + quotedRevenue
  const goalPercent = Math.min(100, (completedRevenue / monthlyGoal) * 100)

  const metrics = [
    {
      name: 'Completed Revenue',
      value: `$${completedRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      change: completedRevenue > 0 ? 'Verified Paid' : '0%',
      subtext: completedRevenue > 0 ? `$${completedRevenue.toFixed(2)} from completed jobs` : '$0.00 completed revenue',
    },
    {
      name: 'Scheduled Revenue',
      value: `$${scheduledRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      change: scheduledRevenue > 0 ? 'Upcoming' : '0%',
      subtext: scheduledRevenue > 0 ? `$${scheduledRevenue.toFixed(2)} scheduled dispatches` : '$0.00 scheduled',
    },
    {
      name: 'Quoted Pipeline',
      value: `$${quotedRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      change: quotedRevenue > 0 ? 'Active Quotes' : '0%',
      subtext: quotedRevenue > 0 ? `$${quotedRevenue.toFixed(2)} pending quotes` : '$0.00 quoted',
    },
    {
      name: 'Jobs Scheduled',
      value: jobCount.toString(),
      change: jobCount > 0 ? `${jobCount} Dispatches` : '0 this week',
      subtext: jobCount > 0 ? `${jobCount} field operations` : 'No upcoming dispatches',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-900">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Wizard Wash Command Dashboard</h1>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            System Account: <span className="font-semibold text-slate-800">omar@wizardwashva.com</span> • Real-time operational overview
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/customers"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-all shadow-sm"
          >
            + Add Customer
          </Link>
          <Link
            href="/dashboard/invoices"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all shadow-sm"
          >
            + Create Invoice
          </Link>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{metric.name}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">{metric.value}</span>
              <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200">
                {metric.change}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500 font-medium">{metric.subtext}</p>
          </div>
        ))}
      </div>

      {/* Analytics & Revenue Pipeline Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue & Service Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Monthly Revenue Pipeline</h2>
              <p className="text-xs text-slate-500 mt-0.5">Target: ${monthlyGoal.toLocaleString('en-US')}.00 / month</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
              {goalPercent.toFixed(1)}% of Monthly Goal
            </span>
          </div>

          <div className="space-y-4">
            {/* Completed Revenue Bar */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Completed Jobs Revenue
                </span>
                <span className="text-slate-900 font-bold">${completedRevenue.toFixed(2)}</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${goalPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Scheduled Revenue Bar */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-blue-700 font-bold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Scheduled Jobs Pipeline
                </span>
                <span className="text-slate-900 font-bold">${scheduledRevenue.toFixed(2)}</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (scheduledRevenue / monthlyGoal) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Quoted Pipeline Bar */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-amber-700 font-bold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Quoted Estimates Pipeline
                </span>
                <span className="text-slate-900 font-bold">${quotedRevenue.toFixed(2)}</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (quotedRevenue / monthlyGoal) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Operational Metrics Grid */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Scheduled Dispatches</p>
              <p className="text-base font-bold text-slate-900 mt-1">{jobCount} Jobs</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Client Accounts</p>
              <p className="text-base font-bold text-slate-900 mt-1">{customerCount} Accounts</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Total Pipeline Value</p>
              <p className="text-base font-bold text-emerald-600 mt-1">${totalPipeline.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Audit Log / Recent Activity Feed */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Audit & Persistence Log</h2>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Auto-Sync
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100">
                <p className="font-semibold text-emerald-900">Completed Jobs Revenue Pipeline</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  When a job or account status is updated to <strong>Completed</strong>, its revenue automatically adds to your completed monthly revenue total.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <p className="font-semibold text-slate-900">Real-Time Event Listener Active</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Updates on Customers, Map Pins, Calendar, or Invoices immediately update this executive dashboard.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100 mt-6 text-right">
            <Link href="/dashboard/customers" className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              Manage Client Directory →
            </Link>
          </div>
        </div>

      </div>

    </div>
  )
}
