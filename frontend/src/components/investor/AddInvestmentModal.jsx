import { useState } from "react";

import GlassCard from "../common/GlassCard";
import GradientButton from "../common/GradientButton";

import { investmentService }
  from "../../services/investmentService";

const AddInvestmentModal = ({
  investorId,
  onClose,
  onSuccess,
}) => {
  const [amount, setAmount] =
    useState("");

  const [investmentDate, setInvestmentDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async () => {
    if (!amount) {
      alert("Please enter amount.");
      return;
    }

    try {
      setLoading(true);

      await investmentService.create({
        investorId:
          Number(investorId),

        amount:
          Number(amount),

        investmentDate:
          investmentDate,
      });

      onSuccess();

      onClose();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to add investment."
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
            mb-6
          "
        >
          Add Investment
        </h2>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) =>
              setAmount(
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

          <input
            type="date"
            value={investmentDate}
            onChange={(e) =>
              setInvestmentDate(
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
        </div>

        <div
          className="
            flex
            gap-3
            mt-6
          "
        >
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
                ? "Saving..."
                : "Save"}
            </GradientButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default AddInvestmentModal;