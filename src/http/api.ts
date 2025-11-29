// auth service

import type { CreateTenantData, Credentials, CreateUserData, OrderStatus } from "../types";
import api from "./client";

export const AUTH_SERVICE = '/api/auth';
export const CATALOG_SERVICE = '/api/catalog';
const ORDER_SERVICE = '/api/order';

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



// Catelog service
export const getCategories = () => api.get(`${CATALOG_SERVICE}/categories`);
export const getProducts = (queryParam: string) =>  
    api.get(`${CATALOG_SERVICE}/products?${queryParam}`);
export const createProduct = (product: FormData) =>
    api.post(`${CATALOG_SERVICE}/products`, product, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const getCategory = (id: string) => api.get(`${CATALOG_SERVICE}/categories/${id}`);
export const updateProduct = (product: FormData, id: string) => {
    return api.put(`${CATALOG_SERVICE}/products/${id}`, product, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
export const updateCategory = (category: FormData, id: string) => {
    return api.put(`${CATALOG_SERVICE}/categories/${id}`, category, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};


// Order service
export const getOrders = (queryString: string) => api.get(`${ORDER_SERVICE}/orders?${queryString}`);
export const getSingle = (orderId: string, queryString: string) =>
    api.get(`${ORDER_SERVICE}/orders/${orderId}?${queryString}`);
export const changeStatus = (orderId: string, data: { status: OrderStatus }) =>
    api.patch(`${ORDER_SERVICE}/orders/change-status/${orderId}`, data);
