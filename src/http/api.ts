// auth service

import type { CreateTenantData, Credentials } from "../types";
import api from "./client";

export const login = (credentials: Credentials) => {
  return api.post("/auth/login", credentials);
};
export const logout = () => {
  return api.post("/auth/logout");
};

export const self = () => {
  return api.get("/auth/self");
};

export const getUsers = () => {
  return api.get("/users");
};
export const getTenants = (queryString: string) =>
    api.get(`/tenants?${queryString}`);
export const createTenant = (data: CreateTenantData) => {
  return api.post("/tenants", data);
};
