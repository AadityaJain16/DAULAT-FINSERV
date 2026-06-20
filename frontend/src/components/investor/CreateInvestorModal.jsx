import { useState } from "react";

import GlassCard from "../common/GlassCard";
import PremiumInput from "../common/PremiumInput";
import GradientButton from "../common/GradientButton";

const CreateInvestorModal = ({
  onClose,
  onSave,
}) => {
  const [formData, setFormData] =
    useState({
      fullName: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
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
    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert(
        "Passwords do not match."
      );
      return;
    }

    onSave({
      fullName:
        formData.fullName,
      mobileNumber:
        formData.mobileNumber,
      password:
        formData.password,
    });
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/60
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
          Create Investor
        </h2>

        <div className="space-y-4">
          <PremiumInput
            label="Full Name"
            value={
              formData.fullName
            }
            onChange={(e) =>
              handleChange(
                "fullName",
                e.target.value
              )
            }
            placeholder="Enter investor name"
          />

          <PremiumInput
            label="Mobile Number"
            value={
              formData.mobileNumber
            }
            onChange={(e) =>
              handleChange(
                "mobileNumber",
                e.target.value
              )
            }
            placeholder="Enter mobile number"
          />

          <PremiumInput
            label="Password"
            type="password"
            value={
              formData.password
            }
            onChange={(e) =>
              handleChange(
                "password",
                e.target.value
              )
            }
            placeholder="Enter password"
          />

          <PremiumInput
            label="Confirm Password"
            type="password"
            value={
              formData.confirmPassword
            }
            onChange={(e) =>
              handleChange(
                "confirmPassword",
                e.target.value
              )
            }
            placeholder="Confirm password"
          />
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-3
            mt-6
          "
        >
          <button
  type="button"
  onClick={() =>
    onClose()
  }
  className="
    border
    border-white/10
    rounded-xl
    py-3
    hover:bg-white/5
    transition-all
    duration-300
  "
>
  Cancel
</button>

          <GradientButton
            onClick={
              handleSubmit
            }
          >
            Create
          </GradientButton>
        </div>
      </GlassCard>
    </div>
  );
};

export default CreateInvestorModal;