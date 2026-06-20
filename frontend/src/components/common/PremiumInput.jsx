import { useState } from "react";
import {
  Eye,
  EyeOff,
} from "lucide-react";

const PremiumInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] =
    useState(false);

  const isPassword =
    type === "password";

  return (
    <div className="space-y-2">
      <label
        className="
          text-xs
          uppercase
          tracking-wider
          text-slate-400
        "
      >
        {label}
      </label>

      <div className="relative">
        <input
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="
            w-full
            bg-white/[0.04]
            border
            border-white/10
            rounded-xl
            px-4
            py-3
            pr-12
            text-white
            placeholder:text-slate-500
            outline-none
            transition
            focus:border-[#7C6FFF]
            focus:ring-2
            focus:ring-[#7C6FFF]/30
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        />

        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-400
              hover:text-white
              transition
            "
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default PremiumInput;