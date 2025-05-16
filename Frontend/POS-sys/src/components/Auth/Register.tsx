import React, { useState, ChangeEvent, FormEvent } from "react";
import { register } from  "../../https/index";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useAppDispatch } from "../../hooks/reduxhooks";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  setIsRegister: (value: boolean) => void;
}

interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

interface RegisterResponse {
 _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  accessToken: string;
}

const Register: React.FC<RegisterProps> = ({ setIsRegister }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });


  const dispatch = useAppDispatch();
const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelection = (selectedRole: string) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const registerMutation = useMutation({
     mutationFn: async (reqData: RegisterFormData): Promise<RegisterResponse> => {
      const res = await register(reqData);
      return res;
    },
    onSuccess: (res: RegisterResponse) => {
      enqueueSnackbar(`Signed in as ${res.name}`, { variant: "success" });

  dispatch(setUser({
    _id: res._id,
    name: res.name,
    email: res.email,
    phone: res.phone,
    role: res.role,
    accessToken: res.accessToken,
    isAuth: true,
  }));
  localStorage.setItem("token", res.accessToken);

  navigate("/");


      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });
      setTimeout(() => {
        setIsRegister(false);
      }, 1500);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Registration failed";
      enqueueSnackbar(message, { variant: "error" });
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Employee Name
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter employee name"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

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
            Employee Phone
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter employee phone"
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

        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Choose your role
          </label>

          <div className="flex item-center gap-3 mt-4">
            {["Waiter", "Cashier", "Admin"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelection(role)}
                className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] ${
                  formData.role === role ? "bg-indigo-700" : ""
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
