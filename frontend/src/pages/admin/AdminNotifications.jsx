import {
  useState,
  useEffect,
} from "react";
import { Send } from "lucide-react";
import GlassCard from "../../components/common/GlassCard";
import GradientButton from "../../components/common/GradientButton";
import {
  investorService,
} from "../../services/investorService";
import CreateNotificationModal
  from "../../components/notification/CreateNotificationModal";

import {
  notificationService,
} from "../../services/notificationService";

const Notifications = () => {
  const [notifications,
    setNotifications] =
    useState([]);
const [investors, setInvestors] =
  useState([]);
 

  const [showModal,
    setShowModal] =
    useState(false);

  const [loading,
    setLoading] =
    useState(true);

 useEffect(() => {
  fetchNotifications();
  fetchInvestors();
}, []);

  const fetchNotifications =
    async () => {
      try {
        setLoading(true);

       const response =
  await notificationService
    .getAll();

        setNotifications(
          response.data.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchInvestors =
  async () => {
    try {
      const response =
        await investorService.getAll();

      setInvestors(
        response.data.data || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate =
    async (data) => {
      try {
        await notificationService
          .create(data);

        setShowModal(false);

        fetchNotifications();
      } catch (error) {
        console.error(error);
      }
    };

  const handleMarkRead =
    async (id) => {
      try {
        await notificationService
          .markAsRead(id);

        fetchNotifications();
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">
            Notifications
          </h1>

          <p className="text-slate-400 mt-2">
            Manage investor notifications
          </p>
        </div>

        <GradientButton
          onClick={() =>
            setShowModal(true)
          }
        >
          Send Notification
        </GradientButton>
      </div>

     

      <GlassCard className="p-6">
        {loading ? (
          <p>
            Loading...
          </p>
        ) : (
          <div className="space-y-4">
            {notifications.map(
              (notification) => (
                <div
                  key={
                    notification.notificationId
                  }
                  className="
                    border-b
                    border-white/10
                    pb-4
                  "
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {
                          notification.title
                        }
                      </h3>

                      <p className="text-slate-400 mt-1">
                        {
                          notification.message
                        }
                      </p>
                    </div>

                    {!notification.isRead && (
                      <button
                        onClick={() =>
                          handleMarkRead(
                            notification.notificationId
                          )
                        }
                        className="
                          text-cyan-400
                        "
                      >
                        Mark Read
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mt-2">
                    {new Date(
                      notification.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </GlassCard>

      {showModal && (
        <CreateNotificationModal
  investors={investors}
  onClose={() =>
    setShowModal(false)
  }
  onSave={handleCreate}
/>
      )}
    </div>
  );
};

export default Notifications;