import GlassCard from "../common/GlassCard";

const InvestmentHistoryTable = ({
  investments = [],
}) => {
  return (
    <GlassCard className="p-5">
      <h3 className="text-lg font-semibold mb-4">
        Investment History
      </h3>

      {investments.length === 0 ? (
        <p className="text-slate-400">
          No investments found.
        </p>
      ) : (
        <div className="space-y-3">
          {investments.map(
            (investment) => (
              <div
                key={
                  investment.investmentId
                }
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
                    {new Date(
                      investment.investmentDate
                    ).toLocaleDateString()}
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    Investment #
                    {
                      investment.investmentId
                    }
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
                    investment.amount ?? 0
                  ).toLocaleString()}
                </span>
              </div>
            )
          )}
        </div>
      )}
    </GlassCard>
  );
};

export default InvestmentHistoryTable;