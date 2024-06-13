import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signupAction } from "../actions/auth";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobileNo: "",
    bank_name: "",
    branch_name: "",
    account_holder_name: "",
    account_no: "",
    pan_card_no: "",
    ifsc_code: "",
    username: "",
    password: "",
    confirmPassword:""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(signupAction(formData, navigate));
    }
  };

  const renderInputField = (label, id, type) => (
    <div className="w-full md:w-1/3 px-2 mb-4">
      <label
        className="block text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        name={id}
        type={type}
        required
        placeholder={label}
        value={formData[id]}
        onChange={handleChange}
      />
      {errors[id] && (
        <p className="text-red-500 text-xs mt-1">{errors[id]}</p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between mt-4 mb-2 bg-white dark:bg-zinc-800 p-4 shadow-md">
        <div className="flex items-center">
          <img src="https://placehold.co/50x50" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-xl font-semibold text-zinc-800 dark:text-white">MLM MARKETING</span>
        </div>
        <div className="flex items-center space-x-4">
          <NavLink to="/login" className="flex items-center p-2 text-zinc-800 dark:text-white rounded-md">
            <span>Login</span>
          </NavLink>
          <span>|</span>
          <NavLink to="/signup" className="flex items-center p-2 text-zinc-800 dark:text-white rounded-md">
            <span>Signup for Admin</span>
          </NavLink>
        </div>
      </div>
      <div className="flex items-center justify-center flex-grow bg-zinc-100 dark:bg-zinc-800 px-4">
        <div className="flex flex-col items-center w-full max-w-3xl p-6 bg-white dark:bg-zinc-700 shadow-md rounded">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-2">
              {renderInputField('First Name', 'first_name', 'text')}
              {renderInputField('Last Name', 'last_name', 'text')}
              {renderInputField('Email', 'email', 'email')}
            </div>
            <div className="flex flex-wrap -mx-2">
              {renderInputField('Mobile Number', 'mobileNo', 'text')}
              {renderInputField('Bank Name', 'bank_name', 'text')}
              {renderInputField('Branch Name', 'branch_name', 'text')}
            </div>
            <div className="flex flex-wrap -mx-2">
              {renderInputField('Account Holder Name', 'account_holder_name', 'text')}
              {renderInputField('Account Number', 'account_no', 'text')}
              {renderInputField('PAN Card Number', 'pan_card_no', 'text')}
            </div>
            <div className="flex flex-wrap -mx-2">
              {renderInputField('IFSC Code', 'ifsc_code', 'text')}
              {renderInputField('Username', 'username', 'text')}
            </div>
            <div className="flex flex-wrap -mx-2">
              {renderInputField('Password', 'password', 'password')}
              {renderInputField('Confirm Password', 'confirmPassword', 'password')}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-purple-500 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-center text-zinc-500 text-xs mt-4">
            Already have an account?{" "}
            <NavLink to="/login">
              <span className="text-purple-500">Login</span>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
