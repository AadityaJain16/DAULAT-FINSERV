import {
  useEffect,
  useState,
} from "react";

import PortfolioHero from "../../components/dashboard/PortfolioHero";
import PortfolioGrowthChart from "../../components/charts/InvestorOverviewChart";
import TransactionTimeline from "../../components/investor/TransactionTimeline";
import StatCard from "../../components/common/StatCard";

import { investorPortalService }
  from "../../services/investorPortalService";

const InvestorDashboard = () => {
  const [dashboard, setDashboard] =
    useState(null);

  const [transactions, setTransactions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {
      try {
        const dashboardResponse =
          await investorPortalService
            .getDashboard();

        setDashboard(
          dashboardResponse.data.data ??
          dashboardResponse.data
        );

        const investmentResponse =
          await investorPortalService
            .getInvestments();

        const recentTransactions =
          (investmentResponse.data.data || [])
            .slice(0, 5)
            .map((item) => ({
              title:
                "Investment Added",
              amount: item.amount,
              date: new Date(
                item.investmentDate
              ).toLocaleDateString(),
            }));

        setTransactions(
          recentTransactions
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
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1
        className="
          text-2xl
          md:text-3xl
          font-bold
        "
      >
        Welcome Back 👋
      </h1>

      <PortfolioHero
        investorName={
          dashboard?.fullName
        }
        totalInvestment={
          dashboard?.totalInvestment ?? 0
        }
      />

      {/* Row 1 */}

      <div
        className="
          grid
          grid-cols-2
          gap-4
        "
      >
        <StatCard
          title="Invested"
          value={`₹${Number(
            dashboard?.totalInvestment ?? 0
          ).toLocaleString()}`}
          change={`${dashboard?.totalInvestments ?? 0} Investments`}
        />

        <StatCard
          title="Accumulated Interest"
          value={`₹${Number(
            dashboard?.accumulatedInterest ?? 0
          ).toLocaleString()}`}
          change="Pending Compounding"
        />
      </div>

      {/* Row 2 */}

      <div
        className="
          grid
          grid-cols-2
          gap-4
        "
      >
        <StatCard
          title="Profit Earned"
          value={`₹${Number(
            dashboard?.totalProfitEarned ?? 0
          ).toLocaleString()}`}
          change="Lifetime Profit"
        />

        <StatCard
          title="Profit Records"
          value={
            dashboard?.totalProfitRecords ?? 0
          }
          change="Monthly Records"
        />
      </div>

      {/* Row 3 */}

      <div
        className="
          grid
          grid-cols-2
          gap-4
        "
      >
        <StatCard
          title="Withdrawals"
          value={`₹${Number(
            dashboard?.totalWithdrawals ?? 0
          ).toLocaleString()}`}
          change="Total Withdrawn"
        />

        <StatCard
          title="Notifications"
          value={
            dashboard?.totalNotifications ?? 0
          }
          change="Alerts"
        />
      </div>

      <PortfolioGrowthChart
        summary={dashboard}
      />

      <TransactionTimeline
        transactions={
          transactions
        }
      />
    </div>
  );
};

export default InvestorDashboard;