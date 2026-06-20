import api from "./api";

export const dashboardService = {
  getSummary: () =>
    api.get("/dashboard/summary"),

  getRecentActivity: () =>
    api.get("/dashboard/recent-activity"),
};