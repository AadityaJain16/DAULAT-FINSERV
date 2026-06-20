import {
  useEffect,
  useState,
} from "react";

import StatCard
  from "../../components/common/StatCard";

import AdminOverviewChart
  from "../../components/charts/AdminOverviewChart";

import ActivityTimeline
  from "../../components/dashboard/ActivityTimeline";

import api
  from "../../services/api";

const AdminDashboard = () => {
  const [dashboard, setDashboard] =
    useState(null);

  const [activities, setActivities] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {
      try {
        const [
          dashboardResponse,
          activityResponse,
        ] = await Promise.all([
          api.get(
            "/reports/dashboard"
          ),
          api.get(
            "/reports/recent-activity"
          ),
        ]);

        setDashboard(
          dashboardResponse.data.data
        );

        setActivities(
          activityResponse.data.data
        );
      } catch (error) {
        console.error(
          "Dashboard Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="text-xl">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Business overview and activity
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-5
          gap-6
        "
      >
        <StatCard
          title="Total Investors"
          value={
            dashboard?.totalInvestors ??
            0
          }
          change="Registered Investors"
        />

        <StatCard
          title="Total Invested"
          value={`₹${Number(
            dashboard?.totalInvestment ??
              0
          ).toLocaleString()}`}
          change="Total Investment"
        />

        <StatCard
  title="Profit Earned"
  value={`₹${Number(
    dashboard?.totalProfitEarned ??
      0
  ).toLocaleString()}`}
  change="Generated Profit"
/>
<StatCard
  title="Accumulated Interest"
  value={`₹${Number(
    dashboard?.totalAccumulatedInterest ??
      0
  ).toLocaleString()}`}
  change="Pending Compounding"
/>

        <StatCard
          title="Total Withdrawals"
          value={`₹${Number(
            dashboard?.totalWithdrawals ??
              0
          ).toLocaleString()}`}
          change="Withdrawn Amount"
        />
      </div>

      <AdminOverviewChart
        summary={dashboard}
      />

      <ActivityTimeline
        activities={activities}
      />
    </div>
  );
};

export default AdminDashboard;