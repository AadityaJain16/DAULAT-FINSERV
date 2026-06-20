import {
  useEffect,
  useState,
} from "react";

import GlassCard
  from "../../components/common/GlassCard";

import {
  activityLogService,
} from "../../services/activityLogService";

const ActivityLogs = () => {
  const [logs, setLogs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response =
        await activityLogService
          .getAll();

      setLogs(
        response.data.data
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs =
    logs.filter(
      (log) =>
        log.activityType
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        log.description
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          Activity Logs
        </h1>

        <p className="text-slate-400 mt-2">
          Complete audit trail
        </p>
      </div>

      <input
        type="text"
        placeholder="Search activity..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="
          w-full
          bg-white/5
          border
          border-white/10
          rounded-xl
          p-3
          text-white
          outline-none
        "
      />

      <GlassCard className="p-6">
        {loading ? (
          <p>
            Loading...
          </p>
        ) : filteredLogs.length ===
          0 ? (
          <p>
            No activity found.
          </p>
        ) : (
          <div className="space-y-5">
            {filteredLogs.map(
              (log) => (
                <div
                  key={log.id}
                  className="
                    border-b
                    border-white/10
                    pb-4
                  "
                >
                  <div className="flex justify-between">
                    <div>
                      <span
                        className="
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          bg-[#7C6FFF]/20
                          text-[#B8AEFF]
                        "
                      >
                        {
                          log.activityType
                        }
                      </span>

                      <p className="mt-3">
                        {
                          log.description
                        }
                      </p>
                    </div>

                    <span
                      className="
                        text-slate-400
                        text-sm
                      "
                    >
                      {new Date(
                        log.createdAt
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default ActivityLogs;