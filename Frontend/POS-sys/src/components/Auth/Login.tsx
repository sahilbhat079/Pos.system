import React, { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../https/index";
import { useAppDispatch } from "../../hooks/reduxhooks";
import { useSnackbar } from "notistack";

import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    accessToken: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(`[handleChange] ${e.target.name}: ${e.target.value}`);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("[handleSubmit] Submitting form with data:", formData);
    loginMutation.mutate(formData);
  };

  const loginMutation = useMutation({
    mutationFn: async (reqData: LoginFormData) => {
      // console.log("[mutationFn] Sending login request with:", reqData);
      const res = await login(reqData);
      // console.log("[mutationFn] Response received:", res);
      if (!res){
        throw new Error("Invalid response from server: missing user data");
      }
      return res;
    },
    onSuccess: (res: LoginResponse) => {
      // console.log("[onSuccess] Login successful:", res);
      const { _id, name, email, phone, role, accessToken } = res;

      dispatch(setUser({ _id, name, email,phone, role, accessToken, isAuth:true }));
      
      navigate("/");
    },
    onError: (error: any) => {
      // console.error("[onError] Login failed:", error);
      const { response } = error;
      enqueueSnackbar(response?.message || "Login failed", {
        variant: "error",
      });
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Employee Email
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter employee email"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Password
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
