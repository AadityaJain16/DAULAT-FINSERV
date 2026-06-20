import GlassCard from "../common/GlassCard";

const TransactionTimeline = ({
  transactions = [],
}) => {
  return (
    <GlassCard className="p-5">
      <h3 className="text-lg font-semibold mb-4">
        Recent Activity
      </h3>

      {transactions.length === 0 ? (
        <p className="text-slate-400">
          No activity found.
        </p>
      ) : (
        <div className="space-y-4">
          {transactions.map(
            (item, index) => (
              <div
                key={index}
                className="
                  flex
                  justify-between
                  items-center
                "
              >
                <div>
                  <p className="font-medium">
                    {item.title}
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    {item.date}
                  </p>
                </div>

                <span
                  className="
                    text-emerald-400
                    font-medium
                  "
                >
                  ₹
                  {Number(
                    item.amount ?? 0
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

export default TransactionTimeline;