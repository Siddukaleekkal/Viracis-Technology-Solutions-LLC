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
      name: 'Completed Rev',
      value: `$${completedRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      change: completedRevenue > 0 ? 'Paid' : '$0',
      subtext: `$${completedRevenue.toFixed(0)} total`,
    },
    {
      name: 'Scheduled Rev',
      value: `$${scheduledRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      change: scheduledRevenue > 0 ? 'Upcoming' : '$0',
      subtext: `$${scheduledRevenue.toFixed(0)} queued`,
    },
    {
      name: 'Quoted Pipeline',
      value: `$${quotedRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      change: quotedRevenue > 0 ? 'Quoted' : '$0',
      subtext: `$${quotedRevenue.toFixed(0)} quotes`,
    },
    {
      name: 'Dispatches',
      value: jobCount.toString(),
      change: `${jobCount} Jobs`,
      subtext: `${jobCount} field jobs`,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-4 font-sans text-slate-900">
      
      {/* Executive Header - Streamlined for Mobile */}
      <div className="flex items-center justify-between gap-2 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">Wizard Wash Dashboard</h1>
          <p className="hidden sm:block mt-0.5 text-xs text-slate-500 font-medium">
            System Account: <span className="font-semibold text-slate-800">omar@wizardwashva.com</span> • Real-time operational overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/customers"
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            + Client
          </Link>
          <Link
            href="/dashboard/invoices"
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            + Invoice
          </Link>
        </div>
      </div>

      {/* KPI Metrics - Compact 2x2 Grid on Mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-5 shadow-sm">
            <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">{metric.name}</p>
            <div className="mt-1 sm:mt-2 flex items-baseline justify-between">
              <span className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">{metric.value}</span>
            </div>
            <p className="mt-1 text-[10px] sm:text-xs text-slate-500 font-medium">{metric.subtext}</p>
          </div>
        ))}
      </div>

      {/* Analytics & Revenue Pipeline Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Revenue & Service Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">Revenue Pipeline</h2>
              <p className="text-[11px] text-slate-500">Target: ${monthlyGoal.toLocaleString('en-US')}.00 / mo</p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              {goalPercent.toFixed(1)}% Goal
            </span>
          </div>

          <div className="space-y-3">
            {/* Completed Revenue Bar */}
            <div>
              <div className="flex justify-between text-[11px] sm:text-xs font-semibold mb-1">
                <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Completed Jobs
                </span>
                <span className="text-slate-900 font-bold">${completedRevenue.toFixed(0)}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${goalPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Scheduled Revenue Bar */}
            <div>
              <div className="flex justify-between text-[11px] sm:text-xs font-semibold mb-1">
                <span className="text-blue-700 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> Scheduled Jobs
                </span>
                <span className="text-slate-900 font-bold">${scheduledRevenue.toFixed(0)}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (scheduledRevenue / monthlyGoal) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Quoted Pipeline Bar */}
            <div>
              <div className="flex justify-between text-[11px] sm:text-xs font-semibold mb-1">
                <span className="text-amber-700 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Quoted Estimates
                </span>
                <span className="text-slate-900 font-bold">${quotedRevenue.toFixed(0)}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (quotedRevenue / monthlyGoal) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Operational Metrics Grid */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 sm:p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">Dispatches</p>
              <p className="text-xs sm:text-base font-extrabold text-slate-900 mt-0.5">{jobCount}</p>
            </div>
            <div className="p-2 sm:p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">Clients</p>
              <p className="text-xs sm:text-base font-extrabold text-slate-900 mt-0.5">{customerCount}</p>
            </div>
            <div className="p-2 sm:p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">Total Pipeline</p>
              <p className="text-xs sm:text-base font-extrabold text-emerald-600 mt-0.5">${totalPipeline.toFixed(0)}</p>
            </div>
          </div>
        </div>

        {/* Audit Log / Desktop Activity Feed */}
        <div className="hidden sm:flex bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex-col justify-between">
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
