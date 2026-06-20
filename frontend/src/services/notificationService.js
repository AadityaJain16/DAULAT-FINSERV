import api from "./api";

export const notificationService = {
  create: (data) =>
    api.post(
      "/notifications",
      data
    ),

  getAll: () =>
    api.get(
      "/notifications"
    ),

  getByInvestorId: (id) =>
    api.get(
      `/notifications/${id}`
    ),

  markAsRead: (id) =>
    api.put(
      `/notifications/${id}/read`
    ),
};