import api from "./api";

export const reportService = {
  getDashboard: () =>
    api.get("/reports/dashboard"),

  getRecentActivity: () =>
    api.get(
      "/reports/recent-activity"
    ),
};