import {
  useEffect,
  useState,
} from "react";

import InvestmentHistoryTable
  from "../../components/investor/InvestmentHistoryTable";

import ProfitRecordsTable
  from "../../components/investor/ProfitRecordsTable";

import {
  investorPortalService,
} from "../../services/investorPortalService";

const InvestmentHistory = () => {
  const [activeTab, setActiveTab] =
    useState("investments");

  const [investments, setInvestments] =
    useState([]);

  const [profitRecords, setProfitRecords] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =
    async () => {
      try {
        const [
          investmentResponse,
          profitResponse,
        ] = await Promise.all([
          investorPortalService
            .getInvestments(),

          investorPortalService
            .getProfitRecords(),
        ]);

        setInvestments(
          investmentResponse.data.data || []
        );

        setProfitRecords(
          profitResponse.data.data || []
        );
      } catch (error) {
        console.error(
          "Failed to load history:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="p-6">
        Loading history...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1
        className="
          text-3xl
          font-bold
        "
      >
        History
      </h1>

      <div
        className="
          flex
          gap-3
          bg-slate-900/40
          p-2
          rounded-2xl
        "
      >
        <button
          onClick={() =>
            setActiveTab(
              "investments"
            )
          }
          className={`
            px-4
            py-2
            rounded-xl
            transition-all
            ${
              activeTab ===
              "investments"
                ? "bg-[#7C6FFF] text-white"
                : "text-slate-400"
            }
          `}
        >
          Investments
        </button>

        <button
          onClick={() =>
            setActiveTab(
              "profits"
            )
          }
          className={`
            px-4
            py-2
            rounded-xl
            transition-all
            ${
              activeTab ===
              "profits"
                ? "bg-[#7C6FFF] text-white"
                : "text-slate-400"
            }
          `}
        >
          Profit Records
        </button>
      </div>

      {activeTab ===
      "investments" ? (
        <InvestmentHistoryTable
          investments={
            investments
          }
        />
      ) : (
        <ProfitRecordsTable
          records={
            profitRecords
          }
        />
      )}
    </div>
  );
};

export default InvestmentHistory;