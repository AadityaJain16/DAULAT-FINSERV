import api from "./api";

export const investorDetailsService = {
  getInvestor: (id) =>
    api.get(`/investors/${id}`),

  getInvestments: (id) =>
    api.get(`/investments/${id}`),

  getProfits: (id) =>
    api.get(
      `/profitdistributions/${id}`
    ),
};