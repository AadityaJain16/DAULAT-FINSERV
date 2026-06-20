import {
  useEffect,
  useState,
} from "react";

import GlassCard from "../../components/common/GlassCard";
import GradientButton from "../../components/common/GradientButton";

import {
  investorPortalService,
} from "../../services/investorPortalService";

import { useAuth }
  from "../../context/AuthContext";

const Profile = () => {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const { logout } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {
      try {
        const response =
          await investorPortalService
            .getDashboard();

        setDashboard(
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
        Loading profile...
      </div>
    );
  }

  const initials =
    dashboard?.fullName
      ?.split(" ")
      .map((x) => x[0])
      .join("")
      .toUpperCase();

  return (
    <div className="p-4 md:p-6 space-y-6">
      <GlassCard className="p-6">
        <div className="flex flex-col items-center">
          <div
            className="
              h-24
              w-24
              rounded-full
              bg-gradient-to-r
              from-[#7C6FFF]
              to-[#00D2B4]
              flex
              items-center
              justify-center
              text-3xl
              font-bold
            "
          >
            {initials}
          </div>

          <h2 className="text-2xl font-bold mt-4">
            {dashboard?.fullName}
          </h2>

          <p className="text-slate-400">
            Investor
          </p>
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <h3 className="font-semibold mb-4">
          Account Information
        </h3>

        <div className="space-y-3">
          <InfoRow
            label="Mobile"
            value={
              dashboard?.mobileNumber
            }
          />

          <InfoRow
            label="Total Investment"
            value={`₹${Number(
              dashboard?.totalInvestment ??
                0
            ).toLocaleString()}`}
          />

          <InfoRow
            label="Investments"
            value={
              dashboard?.totalInvestments
            }
          />

          <InfoRow
            label="Withdrawals"
            value={
              dashboard?.totalWithdrawals
            }
          />

          <InfoRow
            label="Notifications"
            value={
              dashboard?.totalNotifications
            }
          />
        </div>
      </GlassCard>

      <GradientButton
        onClick={logout}
      >
        Logout
      </GradientButton>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
}) => (
  <div className="flex justify-between">
    <span className="text-slate-400">
      {label}
    </span>

    <span>{value}</span>
  </div>
);

export default Profile;