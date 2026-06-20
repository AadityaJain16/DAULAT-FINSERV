import {
  useEffect,
  useState,
} from "react";

import ProfitHistoryTable
  from "../../components/investor/ProfitHistoryTable";

import {
  investorPortalService,
} from "../../services/investorPortalService";

const ProfitHistory = () => {
  const [profits, setProfits] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProfitHistory();
  }, []);

  const fetchProfitHistory =
    async () => {
      try {
        const response =
          await investorPortalService
            .getProfitDistributions();

        setProfits(
          response.data.data || []
        );
      } catch (error) {
        console.error(
          "Failed to load profit history:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="p-6">
        Loading profit history...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Profit History
      </h1>

      <ProfitHistoryTable
        profits={profits}
      />
    </div>
  );
};

export default ProfitHistory;