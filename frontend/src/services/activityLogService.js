import api from "./api";

export const activityLogService = {
  getAll: () =>
    api.get("/activitylogs"),
};