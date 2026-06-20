import { motion } from "framer-motion";

const GradientButton = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className={`
        relative
        overflow-hidden
        px-6
        py-3
        rounded-2xl
        font-semibold
        text-white
        bg-gradient-to-r
        from-[#7C6FFF]
        via-[#8B5CF6]
        to-[#00D2B4]
        shadow-[0_0_25px_rgba(124,111,255,0.35)]
        hover:shadow-[0_0_40px_rgba(124,111,255,0.55)]
        transition-all
        duration-300
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      <div
        className="
          absolute
          inset-0
          opacity-0
          hover:opacity-20
          bg-white
          transition-opacity
        "
      />
    </motion.button>
  );
};

export default GradientButton;