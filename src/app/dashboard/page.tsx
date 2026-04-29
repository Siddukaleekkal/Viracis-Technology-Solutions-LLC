export default function DashboardPage() {
  // Mock data for Phase 1 MVP Dashboard
  const metrics = [
    { name: 'Jobs Booked This Week', value: '12', change: '+20%', trend: 'up' },
    { name: 'Revenue Pipeline', value: '$4,250', change: '+15%', trend: 'up' },
    { name: 'Close Rate', value: '42%', change: '+5%', trend: 'up' },
    { name: 'Cost per Job', value: '$35', change: '-10%', trend: 'down' },
  ]

  const recentActivity = [
    { id: 1, action: 'Job Booked', details: '142 Oak St - Driveway Wash', time: '2 hours ago', icon: '✅' },
    { id: 2, action: 'Quote Sent', details: '89 Pine Ave - $280', time: '5 hours ago', icon: '💬' },
    { id: 3, action: 'New Leads', details: 'Discovered 14 leads in 23220', time: '1 day ago', icon: '✨' },
    { id: 4, action: 'Postcard Sent', details: 'To 45 Maple Dr', time: '1 day ago', icon: '📬' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
        <p className="mt-2 text-sm text-gray-500">
          Your autonomous lead engine performance at a glance.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
              <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pipeline Chart placeholder */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-96 flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Pipeline by Status</h2>
          <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-sm text-gray-500 text-center px-4">
              Charts will populate here once we integrate Recharts.<br/>
              (Discovered → Enriched → Contacted → Quoted → Booked)
            </p>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-96 flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="space-y-6">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-500">{item.details}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
