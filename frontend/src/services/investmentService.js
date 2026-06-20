import api from "./api";

export const investmentService = {
  getByInvestor: (investorId) =>
    api.get(`/investments/${investorId}`),

  create: (data) =>
    api.post("/investments", data),
};