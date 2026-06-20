import { motion } from "framer-motion";

const PageContainer = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#080B12] text-white overflow-hidden relative">
      
      {/* Purple Ambient Glow */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-32
          -left-32
          w-[400px]
          h-[400px]
          rounded-full
          bg-[#7C6FFF]/10
          blur-[150px]
        "
      />

      {/* Teal Ambient Glow */}
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-0
          right-0
          w-[300px]
          h-[300px]
          rounded-full
          bg-[#00D2B4]/6
          blur-[150px]
        "
      />

      {/* Background Grid */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;