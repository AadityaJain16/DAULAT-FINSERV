import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StatCard from "../../components/common/StatCard";
import PortfolioHero from "../../components/dashboard/PortfolioHero";
import GradientButton from "../../components/common/GradientButton";

import InvestmentHistoryTable from "../../components/investor/InvestmentHistoryTable";
import ProfitHistoryTable from "../../components/investor/ProfitHistoryTable";
import WithdrawalHistoryTable from "../../components/investor/WithdrawalHistoryTable";

import AddInvestmentModal from "../../components/investor/AddInvestmentModal";
import AddWithdrawalModal from "../../components/investor/AddWithdrawalModal";

import { investorDetailsService } from "../../services/investorDetailsService";
import { withdrawalService } from "../../services/withdrawalService";

const InvestorDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [investor, setInvestor] = useState(null);

  const [investments, setInvestments] = useState([]);

  const [profits, setProfits] = useState([]);

  const [withdrawals, setWithdrawals] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [showWithdrawalModal, setShowWithdrawalModal] =
    useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const investorResponse =
        await investorDetailsService.getInvestor(id);

      const investmentsResponse =
        await investorDetailsService.getInvestments(id);

      const profitsResponse =
        await investorDetailsService.getProfits(id);

      const withdrawalsResponse =
        await withdrawalService.getByInvestorId(id);

      setInvestor(
        investorResponse.data.data
      );

      setInvestments(
        investmentsResponse.data.data ?? []
      );

      setProfits(
        profitsResponse.data.data ?? []
      );

      setWithdrawals(
        withdrawalsResponse.data.data ?? []
      );
    } catch (error) {
      console.error(
        "Failed to load investor details:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        Loading investor...
      </div>
    );
  }

  const totalProfit =
    profits.reduce(
      (sum, item) =>
        sum + (item.monthlyProfit || 0),
      0
    );

  const totalWithdrawals =
    withdrawals.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          {investor?.fullName}
        </h1>

        <p className="text-slate-400 mt-2">
          {investor?.mobileNumber}
        </p>
      </div>

      <PortfolioHero
  investorName={investor?.fullName}
  totalInvestment={
    (investor?.totalInvestment ?? 0) +
    (investor?.accumulatedInterest ?? 0)
  }
/>

      <div className="grid md:grid-cols-3 gap-4">
       <StatCard
  title="Total Invested"
  value={`₹${Number(
    investor?.totalInvested ?? 0
  ).toLocaleString()}`}
  change={`${investments.length} Investments`}
/>

<StatCard
  title="Total Profit"
  value={`₹${Number(
    investor?.totalProfitEarned ?? 0
  ).toLocaleString()}`}
  change={`${profits.length} Profit Records`}
/>

        <StatCard
  title="Withdrawals"
  value={`₹${Number(
    investor?.totalWithdrawn ?? 0
  ).toLocaleString()}`}
  change={`${withdrawals.length} Withdrawals`}
 />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <GradientButton
          onClick={() =>
            setShowModal(true)
          }
        >
          Add Investment
        </GradientButton>

        <GradientButton
          onClick={() =>
            setShowWithdrawalModal(
              true
            )
          }
        >
          Add Withdrawal
        </GradientButton>
      </div>

      <InvestmentHistoryTable
        investments={investments}
      />

      <ProfitHistoryTable
        profits={profits}
      />

      <WithdrawalHistoryTable
        withdrawals={
          withdrawals
        }
      />

      {showModal && (
        <AddInvestmentModal
          investorId={id}
          onClose={() =>
            setShowModal(false)
          }
          onSuccess={fetchData}
        />
      )}

      {showWithdrawalModal && (
        <AddWithdrawalModal
          investorId={id}
          onClose={() =>
            setShowWithdrawalModal(
              false
            )
          }
          onSuccess={fetchData}
        />
      )}
    </div>
  );
};

export default InvestorDetails;