// types/api.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface Table {
  id: string;
  number: string;
  capacity: number;
  status: "available" | "occupied";
}

export interface Order {
  id: string;
  items: any[];
  status: string;
  createdAt: string;
}

export interface CreateOrderRequest {
 amount: number;
}

export interface VerifyPaymentRequest {
 razorpay_order_id: string;
 razorpay_payment_id: string;
  razorpay_signature: string;
}


export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
}
