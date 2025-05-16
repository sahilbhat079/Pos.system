import { axiosWrapper } from "./AxiosWrapper";
import {
  LoginRequest,
  RegisterRequest,
  User,
  Table,
  CreateOrderRequest,
  VerifyPaymentRequest,
  Order,
} from "../https/api.types";

// Auth Endpoints
export const login = (data: LoginRequest) =>
  axiosWrapper.post<{  
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    accessToken: string;
  }>("/api/auth/login", data);



interface Profile{
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


interface RegisterResponse {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  accessToken: string;
  
}
   


export const register = (data: RegisterRequest) =>
  axiosWrapper.post<RegisterResponse>("/api/auth/register", data);

export const getUserData = ()=>
  axiosWrapper.get<Profile>("/api/auth/profile");

export const logout = () =>
  axiosWrapper.post<{ message: string }>("/api/auth/logout");

// Table Endpoints
export const addTable = (data: Partial<Table>) =>
  axiosWrapper.post<{ message: string; table: Table }>("/api/table/", data);

export const getTables = () =>
  axiosWrapper.get<Table[]>("/api/table");

export const updateTable = ({
  tableId,
  ...tableData
}: { tableId: string } & Partial<Table>) =>
  axiosWrapper.put<{ message: string }>(`/api/table/${tableId}`, tableData);

// Payment Endpoints
export const createOrderRazorpay = (data: CreateOrderRequest) =>
  axiosWrapper.post("/api/payment/create-order", data);

export const verifyPaymentRazorpay = (data: VerifyPaymentRequest) =>
  axiosWrapper.post("/api/payment/verify-payment", data);

// Order Endpoints
export const addOrder = (data: any) =>
  axiosWrapper.post("/api/orders/", data);

export const getOrders = () =>
  axiosWrapper.get<Order[] | any>("/api/orders");

export const updateOrderStatus = ({
  orderId,
  orderStatus,
}: {
  orderId: string;
  orderStatus: string;
}) =>
  axiosWrapper.put(`/api/orders/${orderId}`, { orderStatus });
