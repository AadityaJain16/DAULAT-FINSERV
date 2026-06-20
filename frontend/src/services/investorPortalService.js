import api from "./api";

export const investorPortalService = {
  getDashboard: () =>
    api.get("/investor/dashboard"),

  getInvestments: () =>
    api.get("/investor/investments"),

  getWithdrawals: () =>
    api.get("/investor/withdrawals"),

  getProfitRecords: () =>
    api.get("/profitrecords/my"),

  getNotifications: () =>
    api.get("/investor/notifications"),
};