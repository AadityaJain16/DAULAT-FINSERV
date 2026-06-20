import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import GlassCard from "../../components/common/GlassCard";
import GradientButton from "../../components/common/GradientButton";
import CreateInvestorModal from "../../components/investor/CreateInvestorModal";

import { investorService } from "../../services/investorService";

const Investors = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [investors, setInvestors] = useState([]);

  const [stats, setStats] = useState({
    totalInvestors: 0,
    totalInvested: 0,
    totalPortfolioValue: 0,
  });

  useEffect(() => {
    fetchInvestors();
  }, []);

  const fetchInvestors = async () => {
    try {
      setLoading(true);

      const response =
        await investorService.getAll();

      const investorData =
        response.data.data || [];

      setInvestors(investorData);

      setStats({
        totalInvestors:
          investorData.length,

        totalInvested:
          investorData.reduce(
            (sum, investor) =>
              sum +
              (investor.totalInvestment ||
                0),
            0
          ),

        totalPortfolioValue:
          investorData.reduce(
            (sum, investor) =>
              sum +
              (investor.totalInvestment ||
                0),
            0
          ),
      });
    } catch (error) {
  console.error(
    "Failed to create investor:",
    error
  );

  console.log(
    "Response Data:",
    error.response?.data
  );

  alert(
    JSON.stringify(
      error.response?.data,
      null,
      2
    )
  );
} finally {
      setLoading(false);
    }
  };

  const handleCreateInvestor =
    async (investorData) => {
      try {
        await investorService.create(
          investorData
        );

        await fetchInvestors();

        setShowModal(false);
      } catch (error) {
        console.error(
          "Failed to create investor:",
          error
        );
      }
    };

  const filteredInvestors =
    investors.filter((investor) =>
      investor.fullName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Investors
          </h1>

          <p className="text-slate-400 mt-2">
            Manage all investors
          </p>
        </div>

        <GradientButton
  onClick={() =>
    setShowModal(true)
  }
  className="
    h-14
    min-w-[220px]
    rounded-2xl
    backdrop-blur-xl
  "
>
  <UserPlus size={20} />

  <div className="text-left">
    <p className="font-semibold">
      Add Investor
    </p>

    <p className="text-xs opacity-80">
      Create new investor account
    </p>
  </div>
</GradientButton>
      </div>

      <input
        type="text"
        placeholder="Search investor..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          bg-white/5
          border
          border-white/10
          rounded-xl
          p-3
          text-white
          outline-none
        "
      />

      <div className="grid md:grid-cols-3 gap-4">
        <GlassCard className="p-5">
          <p className="text-slate-400 text-sm">
            Total Investors
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.totalInvestors}
          </h2>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="text-slate-400 text-sm">
            Total Invested
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹
            {stats.totalInvested.toLocaleString()}
          </h2>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="text-slate-400 text-sm">
            Portfolio Value
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹
            {stats.totalPortfolioValue.toLocaleString()}
          </h2>
        </GlassCard>
      </div>

      {loading ? (
        <GlassCard className="p-8 text-center">
          Loading investors...
        </GlassCard>
      ) : filteredInvestors.length ===
        0 ? (
        <GlassCard className="p-8 text-center">
          <h3 className="text-xl font-semibold">
            No Investors Found
          </h3>

          <p className="text-slate-400 mt-2">
            Create your first investor.
          </p>
        </GlassCard>
      ) : (
        <div className="grid gap-4">
          {filteredInvestors.map(
            (investor) => (
              <GlassCard
                key={
                  investor.investorId
                }
                className="
                  p-5
                  cursor-pointer
                  hover:scale-[1.01]
                  hover:border-[#7C6FFF]/30
                  transition-all
                  duration-300
                "
                onClick={() =>
                  navigate(
                    `/admin/investors/${investor.investorId}`
                  )
                }
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {
                        investor.fullName
                      }
                    </h3>

                    <p className="text-slate-400 mt-1">
                      {
                        investor.mobileNumber
                      }
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400">
                      View Details →
                    </span>
                  </div>
                </div>
              </GlassCard>
            )
          )}
        </div>
      )}

      {showModal && (
  <CreateInvestorModal
    onClose={() =>
      setShowModal(false)
    }
    onSave={
      handleCreateInvestor
    }
  />
)}
    </div>
  );
};

export default Investors;