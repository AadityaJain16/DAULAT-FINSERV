import GlassCard from "../common/GlassCard";

const ProfitHistoryTable = ({
  profits = [],
}) => {
  return (
    <GlassCard className="p-5">
      <h3 className="text-lg font-semibold mb-4">
        Profit History
      </h3>

      {profits.length === 0 ? (
        <p className="text-slate-400">
          No profit distributions found.
        </p>
      ) : (
        <div className="space-y-3">
          {profits.map((profit) => (
            <div
              key={
                profit.profitDistributionId
              }
              className="
                border-b
                border-white/10
                pb-3
              "
            >
              <div
                className="
                  flex
                  justify-between
                  items-center
                "
              >
                <div>
                  <p>
                    {new Date(
                      profit.distributionDate
                    ).toLocaleDateString()}
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    Distribution #
                    {
                      profit.profitDistributionId
                    }
                  </p>
                </div>

                <span
                  className="
                    text-cyan-400
                    font-semibold
                  "
                >
                  ₹
                  {Number(
                    profit.profitAmount ?? 0
                  ).toLocaleString()}
                </span>
              </div>

              <div
                className="
                  flex
                  justify-between
                  mt-2
                  text-sm
                  text-slate-400
                "
              >
                <span>
                  Investment: ₹
                  {Number(
                    profit.investmentAmount ?? 0
                  ).toLocaleString()}
                </span>

                <span>
                  {Number(
                    profit.profitPercentage ?? 0
                  )}
                  %
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
};

export default ProfitHistoryTable;