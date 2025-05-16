// import axios, {
//   AxiosInstance,
//   AxiosRequestConfig,
//   AxiosResponse,
// } from "axios";

// // Default headers
// const defaultHeader = {
//   "Content-Type": "application/json",
//   Accept: "application/json",
// };

// // Axios instance
// const axiosInstance: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
//   withCredentials: true,
//   headers: { ...defaultHeader },
// });

// // Generic wrapper functions
// export const axiosWrapper = {
//   get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//     const response: AxiosResponse<T> = await axiosInstance.get(url, config);
//     return response.data;
//   },

//   post: async <T>(
//     url: string,
//     data?: any,
//     config?: AxiosRequestConfig
//   ): Promise<T> => {
//     const response: AxiosResponse<T> = await axiosInstance.post(url, data, config);
//     return response.data;
//   },

//   put: async <T>(
//     url: string,
//     data?: any,
//     config?: AxiosRequestConfig
//   ): Promise<T> => {
//     const response: AxiosResponse<T> = await axiosInstance.put(url, data, config);
//     return response.data;
//   },

//   delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//     const response: AxiosResponse<T> = await axiosInstance.delete(url, config);
//     return response.data;
//   },
// };




// ///
// // import axios from "axios";

// // const defaultHeader = {
// //   "Content-Type": "application/json",
// //   Accept: "application/json",
// // };

// // export const axiosWrapper = axios.create({
// //   baseURL: import.meta.env.VITE_BACKEND_URL,
// //   withCredentials: true,
// //   headers: { ...defaultHeader },
// // });

// // src/https/axiosWrapper.













import axios from "axios";
import { store } from "../store/store"; 

const defaultHeader = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: { ...defaultHeader },
});

// 🔐 Interceptor to inject Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().userReducer?.accessToken;
    if (accessToken && config.headers) {
      console.log("[AxiosWrapper] Access Token:", accessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const axiosWrapper = {
  get: async <T>(url: string, config?: any): Promise<T> => {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },

  post: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  },

  put: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, config?: any): Promise<T> => {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  },
};
