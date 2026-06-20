import GlassCard from "./GlassCard";

const StatCard = ({
  title,
  value,
  change,
}) => {
  return (
    <GlassCard className="p-5">

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2 text-white">
        {value}
      </h2>

      <p className="text-emerald-400 mt-2 text-sm">
        {change}
      </p>

    </GlassCard>
  );
};

export default StatCard;