import GlassCard from "../common/GlassCard";

const WithdrawalHistoryTable = ({
  withdrawals = [],
}) => {
  return (
    <GlassCard className="p-5">
      <h3 className="text-lg font-semibold mb-4">
        Withdrawal History
      </h3>

      {withdrawals.length === 0 ? (
        <p className="text-slate-400">
          No withdrawals found.
        </p>
      ) : (
        <div className="space-y-3">
          {withdrawals.map(
            (withdrawal) => (
              <div
                key={
                  withdrawal.withdrawalId
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
                      withdrawal.withdrawalDate
                    ).toLocaleDateString()}
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    Withdrawal #
                    {
                      withdrawal.withdrawalId
                    }
                  </p>
                </div>

                <span
                  className="
                    text-red-400
                    font-semibold
                  "
                >
                  ₹
                  {Number(
                    withdrawal.amount
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

export default WithdrawalHistoryTable;