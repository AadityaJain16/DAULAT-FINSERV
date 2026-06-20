import {
  useEffect,
  useState,
} from "react";

import GlassCard from "../../components/common/GlassCard";

import {
  investorPortalService,
} from "../../services/investorPortalService";

const InvestorNotifications = () => {
  const [notifications,
    setNotifications] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications =
    async () => {
      try {
        const response =
          await investorPortalService
            .getNotifications();

        setNotifications(
          response.data.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="p-6">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      <h1 className="text-3xl font-bold">
        Notifications
      </h1>

      {notifications.length === 0 ? (
        <GlassCard className="p-5">
          <p className="text-slate-400">
            No notifications found.
          </p>
        </GlassCard>
      ) : (
        notifications.map(
          (notification) => (
            <GlassCard
              key={
                notification.notificationId
              }
              className="p-5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {
                      notification.title
                    }
                  </h3>

                  <p className="text-slate-400 mt-2">
                    {
                      notification.message
                    }
                  </p>

                  <p className="text-xs text-slate-500 mt-3">
                    {new Date(
                      notification.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                {!notification.isRead && (
                  <span
                    className="
                      px-2
                      py-1
                      rounded-lg
                      text-xs
                      bg-cyan-500/20
                      text-cyan-400
                    "
                  >
                    New
                  </span>
                )}
              </div>
            </GlassCard>
          )
        )
      )}
    </div>
  );
};

export default InvestorNotifications;