// auth service

import type { CreateTenantData, Credentials, CreateUserData } from "../types";
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

export const getUsers = (queryString: string) => {
  return api.get(`/users?${queryString}`);
};
export const getTenants = (queryString: string) =>
    api.get(`/tenants?${queryString}`);
export const createTenant = (data: CreateTenantData) => {
  return api.post("/tenants", data);
};

export const createUser = (data: CreateUserData) => {
    return api.post("/users", data);
};

export const updateUser = (data: CreateUserData, id: string) => {
    return api.patch(`/users/${id}`, data);
};
