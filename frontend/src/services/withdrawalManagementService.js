import api from "./api";

export const withdrawalManagementService = {
  getByInvestorId: (investorId) =>
    api.get(
      `/withdrawals/${investorId}`
    ),
};