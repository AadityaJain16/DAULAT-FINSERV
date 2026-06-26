import { useState } from "react";

import GlassCard from "../common/GlassCard";
import GradientButton from "../common/GradientButton";

import {
  withdrawalService,
} from "../../services/withdrawalService";

const AddWithdrawalModal = ({
  investorId,
  onClose,
  onSuccess,
}) => {
  const [amount, setAmount] =
    useState("");

  const [withdrawalDate, setWithdrawalDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async () => {
      if (!amount || !withdrawalDate)
        return;

      try {
        setLoading(true);

        await withdrawalService.create({
          investorId:
            Number(investorId),

          amount:
            Number(amount),

          withdrawalDate,
        });

        onSuccess();

        onClose();
      } catch (error) {
        console.error(error);

        alert(
          "Failed to create withdrawal."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <GlassCard className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6">
          Add Withdrawal
        </h2>

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
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
            mb-4
          "
        />

        <input
          type="date"
          value={withdrawalDate}
          onChange={(e) =>
            setWithdrawalDate(
              e.target.value
            )
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

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="
              flex-1
              border
              border-white/10
              rounded-xl
              py-3
            "
          >
            Cancel
          </button>

          <div className="flex-1">
            <GradientButton
              onClick={
                handleSubmit
              }
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save"}
            </GradientButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default AddWithdrawalModal;