import GlassCard from "../../components/common/GlassCard";

const Distributions = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">
        Profit Distributions
      </h1>

      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold">
          Distribution Records
        </h2>

        <p className="text-slate-400 mt-4">
          Profit distributions can be viewed
          from each investor's profile.
        </p>

        <p className="text-slate-400 mt-2">
          Navigate to:
        </p>

        <div className="mt-4 rounded-xl bg-white/5 p-4">
          Investors → Investor Details →
          Profit History
        </div>
      </GlassCard>
    </div>
  );
};

export default Distributions;