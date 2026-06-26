import {
  useEffect,
  useState,
} from "react";

import GradientButton
  from "../../components/common/GradientButton";

import GlassCard
  from "../../components/common/GlassCard";

import StatCard
  from "../../components/common/StatCard";

import {
  exportReportPdf,
} from "../../utils/reportExport";

import {
  reportService,
} from "../../services/reportService";

const Reports = () => {
  const [dashboard, setDashboard] =
    useState(null);

  const [activities, setActivities] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports =
    async () => {
      try {
        const dashboardResponse =
          await reportService
            .getDashboard();

        const activityResponse =
          await reportService
            .getRecentActivity();

        setDashboard(
          dashboardResponse.data.data
        );

        setActivities(
          activityResponse.data.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div>
        Loading reports...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div
        className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
        "
      >
        <div>
          <h1 className="text-4xl font-bold">
            Reports
          </h1>

          <p className="text-slate-400 mt-2">
            Business analytics and activity
          </p>
        </div>

        <GradientButton
          onClick={() =>
            exportReportPdf(
              dashboard,
              activities
            )
          }
        >
          Export PDF
        </GradientButton>
      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-6
          gap-4
        "
      >
        <StatCard
          title="Investors"
          value={
            dashboard?.totalInvestors ??
            0
          }
          change="Registered"
        />

        <StatCard
          title="Investment"
          value={`₹${Number(
            dashboard?.totalInvestment ??
              0
          ).toLocaleString()}`}
          change="Total"
        />

        <StatCard
          title="Withdrawals"
          value={`₹${Number(
            dashboard?.totalWithdrawals ??
              0
          ).toLocaleString()}`}
          change="Processed"
        />

        <StatCard
          title="Profit Earned"
          value={`₹${Number(
            dashboard?.totalProfitEarned ??
              0
          ).toLocaleString()}`}
          change="Generated"
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
          title="Notifications"
          value={
            dashboard?.totalNotifications ??
            0
          }
          change="Sent"
        />
      </div>

      <GlassCard className="p-6">
        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          Recent Activity
        </h2>

        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-slate-400">
              No activity found.
            </p>
          ) : (
            activities.map(
              (
                activity,
                index
              ) => (
                <div
                  key={`${activity.activityType}-${activity.activityDate}-${index}`}
                  className="
                    border-b
                    border-white/10
                    pb-4
                  "
                >
                  <div
                    className="
                      flex
                      justify-between
                      gap-4
                    "
                  >
                    <h3 className="font-semibold">
                      {
                        activity.activityType
                      }
                    </h3>

                    <span
                      className="
                        text-sm
                        text-slate-400
                      "
                    >
                      {new Date(
                        activity.createdAt
                      ).toLocaleString()}
                    </span>
                  </div>

                  <p
                    className="
                      text-slate-400
                      mt-1
                    "
                  >
                    {
                      activity.description
                    }
                  </p>
                </div>
              )
            )
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default Reports;