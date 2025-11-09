// auth service

import type { CreateTenantData, Credentials, CreateUserData } from "../types";
import api from "./client";

export const AUTH_SERVICE = '/api/auth';
export const CATALOG_SERVICE = '/api/catalog';

export const login = (credentials: Credentials) => {
  return api.post(`${AUTH_SERVICE}/auth/login`, credentials);
};
export const logout = () => {
  return api.post(`${AUTH_SERVICE}/auth/logout`);
};

export const self = () => {
  return api.get(`${AUTH_SERVICE}/auth/self`);
};

export const getUsers = (queryString: string) => {
  return api.get(`${AUTH_SERVICE}/users?${queryString}`);
};
export const getTenants = (queryString: string) =>
    api.get(`${AUTH_SERVICE}/tenants?${queryString}`);
export const createTenant = (data: CreateTenantData) => {
  return api.post(`${AUTH_SERVICE}/tenants`, data);
};

export const createUser = (data: CreateUserData) => {
    return api.post(`${AUTH_SERVICE}/users`, data);
};

export const updateUser = (data: CreateUserData, id: string) => {
    return api.patch(`${AUTH_SERVICE}/users/${id}`, data);
};
