import { useAdminDashboard } from '../../hooks/useAdminDashboard.js'
import StatTile from '../../components/admin/StatTile.jsx'
import DonationTrendChart from '../../components/admin/DonationTrendChart.jsx'
import StatusBreakdownChart from '../../components/admin/StatusBreakdownChart.jsx'
import TopProgramsChart from '../../components/admin/TopProgramsChart.jsx'
import TopDonorsList from '../../components/admin/TopDonorsList.jsx'

const formatMoney = (amount) =>
  `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const Card = ({ title, children }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
    <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
)

const AdminDashboard = () => {
  const { summary, loading, error } = useAdminDashboard()

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>
  }

  if (error || !summary) {
    return (
      <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
        {error?.message ?? 'Unable to load the dashboard.'}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatTile label="Total Donors" value={summary.total_donors.toLocaleString()} />
        <StatTile label="Total Raised" value={formatMoney(summary.total_raised)} />
        <StatTile
          label="Today's Donations"
          value={formatMoney(summary.today.amount)}
          caption={`· ${summary.today.count} gift${summary.today.count === 1 ? '' : 's'}`}
        />
        <StatTile
          label="This Month"
          value={formatMoney(summary.this_month.amount)}
          caption={`· ${summary.this_month.count} gift${summary.this_month.count === 1 ? '' : 's'}`}
          delta={summary.growth_percent}
          deltaLabel="vs last month"
        />
        <StatTile label="Recurring Donors" value={summary.recurring_donors.toLocaleString()} />
        <StatTile label="Pending Payments" value={summary.pending_payments.toLocaleString()} />
        <StatTile label="Failed Payments" value={summary.failed_payments.toLocaleString()} />
        <StatTile label="Receipts Generated" value={summary.receipts_generated.toLocaleString()} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Donations — Last 30 Days">
            <DonationTrendChart data={summary.trend} />
          </Card>
        </div>
        <Card title="Payment Status">
          <StatusBreakdownChart breakdown={summary.status_breakdown} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Top Programs">
          <TopProgramsChart programs={summary.top_programs} />
        </Card>
        <Card title="Top 10 Donors">
          <TopDonorsList donors={summary.top_donors} />
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
