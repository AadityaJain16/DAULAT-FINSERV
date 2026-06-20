import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AdminLayout from "../layouts/AdminLayout";
import InvestorLayout from "../layouts/InvestorLayout";
import Login from "../pages/auth/Login";
import ProfitRecords
  from "../pages/investor/ProfitRecords";
// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import Investors from "../pages/admin/Investors";
import InvestorDetails from "../pages/admin/InvestorDetails";
import Reports from "../pages/admin/Reports";
import AdminNotifications from "../pages/admin/AdminNotifications";
import ActivityLogs from "../pages/admin/ActivityLogs";

// Investor Pages
import InvestorDashboard from "../pages/investor/InvestorDashboard";
import Portfolio from "../pages/investor/Portfolio";
import InvestmentHistory from "../pages/investor/InvestmentHistory";
import InvestorNotifications from "../pages/investor/InvestorNotifications";
import Profile from "../pages/investor/Profile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}

        <Route path="/" element={<Login />} />

        {/* Admin Routes */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/investors"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminLayout>
                <Investors />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/activity-logs"
  element={
    <AdminLayout>
      <ActivityLogs />
    </AdminLayout>
  }
/>
      <Route
  path="/investor/profit-records"
  element={
    <ProtectedRoute
      allowedRole="INVESTOR"
    >
      <InvestorLayout>
        <ProfitRecords />
      </InvestorLayout>
    </ProtectedRoute>
  }
/>
        <Route
          path="/admin/investors/:id"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminLayout>
                <InvestorDetails />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/reports"
  element={
    <AdminLayout>
      <Reports />
    </AdminLayout>
  }
/>

        

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminLayout>
                <Reports />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminLayout>
                <AdminNotifications />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
       

        {/* Investor Routes */}

        <Route
          path="/investor/dashboard"
          element={
            <ProtectedRoute allowedRole="INVESTOR">
              <InvestorLayout>
                <InvestorDashboard />
              </InvestorLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/investor/portfolio"
          element={
            <ProtectedRoute allowedRole="INVESTOR">
              <InvestorLayout>
                <Portfolio />
              </InvestorLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/investor/history"
          element={
            <ProtectedRoute allowedRole="INVESTOR">
              <InvestorLayout>
                <InvestmentHistory />
              </InvestorLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/investor/notifications"
          element={
            <ProtectedRoute allowedRole="INVESTOR">
              <InvestorLayout>
                <InvestorNotifications />
              </InvestorLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/investor/profile"
          element={
            <ProtectedRoute allowedRole="INVESTOR">
              <InvestorLayout>
                <Profile />
              </InvestorLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;