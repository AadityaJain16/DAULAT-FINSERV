import GlassCard from "../common/GlassCard";

const PortfolioHero = ({
  totalInvestment = 0,
  investorName = "",
}) => {
  return (
    <GlassCard className="p-6">
      <p className="text-slate-400 text-sm">
        Welcome
      </p>

      <h2 className="text-xl font-semibold mt-2">
        {investorName}
      </h2>

      <p className="text-slate-400 text-sm mt-4">
        Current Portfolio Value
      </p>

      <h1
        className="
          text-3xl
          md:text-5xl
          font-bold
          mt-3
        "
      >
        ₹
        {Number(
          totalInvestment
        ).toLocaleString()}
      </h1>

      <p className="text-emerald-400 mt-3">
        Active Investor
      </p>
    </GlassCard>
  );
};

export default PortfolioHero;