import GlassCard from "../common/GlassCard";

const ActivityTimeline = ({
  activities,
}) => {
  return (
    <GlassCard className="p-5">
      <h3 className="text-lg font-semibold mb-4">
        Recent Activity
      </h3>

      <div className="space-y-4">
        {activities.map(
          (activity) => (
            <div
              key={`${activity.activityType}-${activity.activityDate}`}
              className="
                border-b
                border-white/10
                pb-3
              "
            >
              <p className="font-medium">
                {
                  activity.activityType
                }
              </p>

              <p className="text-slate-400 text-sm mt-1">
                {
                  activity.description
                }
              </p>

              <p className="text-xs text-slate-500 mt-2">
              new Date(
    activity.activityDate
).toLocaleDateString()
              </p>
            </div>
          )
        )}
      </div>
    </GlassCard>
  );
};

export default ActivityTimeline;