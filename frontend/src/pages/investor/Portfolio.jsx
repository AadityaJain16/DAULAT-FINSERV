import {
  useEffect,
  useState,
} from "react";

import PortfolioHero
  from "../../components/dashboard/PortfolioHero";

import GlassCard
  from "../../components/common/GlassCard";

import PortfolioGrowthChart
  from "../../components/charts/InvestorOverviewChart";

import {
  investorPortalService,
} from "../../services/investorPortalService";

const Portfolio = () => {
  const [dashboard, setDashboard] =
    useState(null);

  const [profitRecords, setProfitRecords] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio =
    async () => {
      try {
        const [
          dashboardResponse,
          profitResponse,
        ] = await Promise.all([
          investorPortalService
            .getDashboard(),

          investorPortalService
            .getProfitRecords(),
        ]);

        setDashboard(
          dashboardResponse.data.data
        );

        setProfitRecords(
          profitResponse.data.data || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="p-6">
        Loading portfolio...
      </div>
    );
  }

  const totalProfit =
    profitRecords.reduce(
      (sum, item) =>
        sum + item.monthlyProfit,
      0
    );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Portfolio
      </h1>

      <PortfolioHero
        investorName={
          dashboard?.fullName
        }
        totalInvestment={
          dashboard?.totalInvestment
        }
      />

      <div className="grid grid-cols-2 gap-4">
        <GlassCard className="p-5">
          <p className="text-slate-400 text-sm">
            Current Principal
          </p>

          <h2 className="text-2xl font-bold mt-2">
            ₹
            {Number(
              dashboard?.totalInvestment ?? 0
            ).toLocaleString()}
          </h2>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="text-slate-400 text-sm">
            Total Profit Earned
          </p>

          <h2
            className="
              text-2xl
              font-bold
              mt-2
              text-emerald-400
            "
          >
            ₹
            {Number(
              totalProfit
            ).toLocaleString()}
          </h2>
        </GlassCard>
      </div>

      <PortfolioGrowthChart
        summary={dashboard}
      />

      <GlassCard className="p-5">
        <h2 className="text-xl font-semibold mb-4">
          Recent Profit Records
        </h2>

        {profitRecords.length === 0 ? (
          <p className="text-slate-400">
            No profit records found.
          </p>
        ) : (
          <div className="space-y-3">
            {profitRecords
              .slice(0, 5)
              .map((record, index) => (
                <div
                  key={index}
                  className="
                    flex
                    justify-between
                    items-center
                    border-b
                    border-white/10
                    pb-3
                  "
                >
                  <div>
                    <p>
                      {record.month}/
                      {record.year}
                    </p>

                    <p
                      className="
                        text-xs
                        text-slate-400
                      "
                    >
                      Profit Base:
                      ₹
                      {Number(
                        record.profitBase
                      ).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className="
                      text-emerald-400
                      font-semibold
                    "
                  >
                    ₹
                    {Number(
                      record.monthlyProfit
                    ).toLocaleString()}
                  </span>
                </div>
              ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default Portfolio;