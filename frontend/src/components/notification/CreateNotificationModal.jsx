import { useState } from "react";

import GlassCard from "../common/GlassCard";
import PremiumInput from "../common/PremiumInput";
import GradientButton from "../common/GradientButton";

const CreateNotificationModal = ({
  onClose,
  onSave,
  investors = [],
}) => {
  const [formData, setFormData] =
    useState({
      investorId: "",
      title: "",
      message: "",
    });

  const handleChange = (
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.investorId) {
      alert(
        "Please select an investor."
      );
      return;
    }

    if (!formData.title.trim()) {
      alert(
        "Please enter a title."
      );
      return;
    }

    if (!formData.message.trim()) {
      alert(
        "Please enter a message."
      );
      return;
    }

    onSave({
      investorId: Number(
        formData.investorId
      ),
      title: formData.title,
      message: formData.message,
    });
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
          max-w-lg
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
          Send Notification
        </h2>

        <div className="space-y-4">
          <div>
            <label
              className="
                block
                text-sm
                text-slate-400
                mb-2
              "
            >
              Select Investor
            </label>

            <select
              value={
                formData.investorId
              }
              onChange={(e) =>
                handleChange(
                  "investorId",
                  e.target.value
                )
              }
              className="
  w-full
  bg-slate-900
  border
  border-white/10
  rounded-xl
  p-3
  text-white
  outline-none
"
            >
              <option
  value=""
  disabled
  className="
    bg-slate-900
    text-white
  "
>
  Select Investor
</option>

              {investors.map((investor) => (
  <option
    key={investor.investorId}
    value={investor.investorId}
    className="
      bg-slate-900
      text-white
    "
  >
    {investor.fullName}
    {" "}
    (ID: {investor.investorId})
  </option>
))}
            </select>
          </div>

          <PremiumInput
            label="Title"
            value={
              formData.title
            }
            onChange={(e) =>
              handleChange(
                "title",
                e.target.value
              )
            }
            placeholder="Notification title"
          />

          <textarea
            value={
              formData.message
            }
            onChange={(e) =>
              handleChange(
                "message",
                e.target.value
              )
            }
            rows={4}
            placeholder="Enter notification message..."
            className="
              w-full
              bg-white/5
              border
              border-white/10
              rounded-xl
              p-3
              text-white
              outline-none
              resize-none
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
              hover:bg-white/5
              transition
            "
          >
            Cancel
          </button>

          <div className="flex-1">
            <GradientButton
              onClick={
                handleSubmit
              }
            >
              Send
            </GradientButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default CreateNotificationModal;