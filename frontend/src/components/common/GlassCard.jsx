import { motion } from "framer-motion";

const GlassCard = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        backdrop-blur-xl
        bg-white/[0.04]
        border border-white/10
        rounded-[28px]
        shadow-2xl
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;