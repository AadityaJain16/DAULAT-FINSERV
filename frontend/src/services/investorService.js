import api from "./api";

export const investorService = {
  getAll: () =>
    api.get("/investors"),

  getById: (id) =>
    api.get(`/investors/${id}`),

  create: (data) =>
    api.post("/investors", data),

  update: (id, data) =>
    api.put(`/investors/${id}`, data),

  delete: (id) =>
    api.delete(`/investors/${id}`),
};