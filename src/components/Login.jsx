import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PasswordResetModal from "./PasswordResetModal"; // Adjust the import path as needed
import { useDispatch } from "react-redux";
import { signin } from "../actions/auth";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.username) {
      errors.username = "Username is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('role',role);
      dispatch(signin(formData,role, navigate));
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between bg-white dark:bg-zinc-800 p-4 shadow-md">
        <div className="flex items-center">
          <img
            src="https://placehold.co/50x50"
            alt="Logo"
            className="h-8 w-8 mr-2"
          />
          <span className="text-xl font-semibold text-zinc-800 dark:text-white">
            MLM MARKETING
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <NavLink
              to="/login"
              className={`flex items-center p-2 text-zinc-800 dark:text-white rounded-md `}
            >
              <span>Login</span>
            </NavLink>
            <span>|</span>
            <NavLink
              to="/signup"
              className={`flex items-center p-2 text-zinc-800 dark:text-white rounded-md`}
            >
              <span>Signup</span>
            </NavLink>
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-center h-screen bg-zinc-100 dark:bg-zinc-800 px-4 overflow-hidden"
        style={{ maxHeight: "80vh" }}
      >
        <div className="flex flex-col items-center w-full max-w-md p-6 bg-white dark:bg-zinc-700 shadow-md rounded">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                value={formData.username}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="**************"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="flex items-center mt-5">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="customer"
                  name="role"
                  value="customer"
                  className="form-radio h-5 w-5 text-blue-600"
                  checked={role === 'customer'}
                  onChange={()=>setRole('customer')}
                  required
                />
                <label htmlFor="customer" className="ml-2 text-zinc-700">
                  Customer
                </label>
              </div>
              <div className="flex items-center ml-6">
                <input
                  type="radio"
                  id="admin"
                  name="role"
                  value="admin"
                  className="form-radio h-5 w-5 text-blue-600"
                  checked={role === 'admin'}
                  onChange={()=>setRole('admin')}
                  required
                />
                <label htmlFor="admin" className="ml-2 text-zinc-700">
                  Admin
                </label>
              </div>
              {errors.role && (
                <span className="text-red-500 ml-2">{errors.role}</span>
              )}
              <span className="text-red-500 ml-2">*</span>
            </div>

            <div className="flex items-center mt-4 justify-between">
              <button
                className="bg-purple-500 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
                onClick={() => setIsModalOpen(true)}
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="text-center text-zinc-500 text-xs mt-4">
            New user?{" "}
            <NavLink to="/signup">
              <span>Signup</span>
            </NavLink>
          </p>
        </div>
        <PasswordResetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Login;
