import api from "./api";

export const profitDistributionService = {
  create: (data) =>
    api.post(
      "/profitdistributions",
      data
    ),

  getByInvestorId: (id) =>
    api.get(
      `/profitdistributions/${id}`
    ),
};