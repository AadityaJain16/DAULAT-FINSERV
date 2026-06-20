import api from "./api";

export const distributionService = {
  getByInvestor: (investorId) =>
    api.get(
      `/profit-distributions/${investorId}`
    ),

  create: (data) =>
    api.post("/profit-distributions", data),
};