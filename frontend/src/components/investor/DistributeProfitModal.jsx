import { useState } from "react";

import GlassCard from "../common/GlassCard";
import GradientButton from "../common/GradientButton";

import { profitDistributionService }
  from "../../services/profitDistributionService";

const DistributeProfitModal = ({
  investorId,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        await profitDistributionService
          .create({
            investorId:
              Number(investorId),
          });

        onSuccess();

        onClose();
      } catch (error) {
        console.error(error);

        alert(
          "Failed to distribute profit."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/70
        flex
        items-center
        justify-center
        z-50
        p-4
      "
    >
      <GlassCard
        className="
          w-full
          max-w-md
          p-6
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            mb-4
          "
        >
          Distribute Profit
        </h2>

        <p className="text-slate-400 mb-6">
          Profit will be calculated
          automatically based on the
          investor's portfolio.
        </p>

        <div className="flex gap-3">
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
              disabled={
                loading
              }
            >
              {loading
                ? "Processing..."
                : "Distribute"}
            </GradientButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default DistributeProfitModal;