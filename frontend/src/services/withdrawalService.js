import api from "./api";

export const withdrawalService = {
  create: (data) =>
    api.post(
      "/withdrawals",
      data
    ),

  getByInvestorId: (id) =>
    api.get(
      `/withdrawals/${id}`
    ),
};