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
          No profit records found.
        </p>
      ) : (
        <div className="space-y-3">
          {profits.map((profit, index) => (
            <div
              key={`${profit.year}-${profit.month}-${index}`}
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
                      profit.calculationDate
                    ).toLocaleDateString()}
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    Month: {profit.month}/
                    {profit.year}
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
                    profit.monthlyProfit ?? 0
                  ).toLocaleString()}
                </span>
              </div>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-2
                  mt-3
                  text-sm
                  text-slate-400
                "
              >
                <span>
                  Opening: ₹
                  {Number(
                    profit.openingPrincipal ?? 0
                  ).toLocaleString()}
                </span>

                <span>
                  Profit Base: ₹
                  {Number(
                    profit.profitBase ?? 0
                  ).toLocaleString()}
                </span>

                <span>
                  Closing: ₹
                  {Number(
                    profit.closingPrincipal ?? 0
                  ).toLocaleString()}
                </span>

                <span>
                  Profit: ₹
                  {Number(
                    profit.monthlyProfit ?? 0
                  ).toLocaleString()}
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