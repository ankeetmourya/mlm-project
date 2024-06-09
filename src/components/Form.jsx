import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

function Form() {
  const [step, setStep] = useState(1);
  const [isValid, setIsValid] = useState(false);

  const initialState = {
    sponsorUserName: "",
    sponsorFullName: "",
    selectProduct: "",
    acceptTerms: false,
    firstName: "",
    date: "",
    gender: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    const validations = {
        firstName: {
          isValid: value.length >= 6,
          errorMessage: "First name must be at least 6 characters long.",
        },
        date: {
          isValid:
            new Date(value) <=
            new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
          errorMessage: "You must be 18 years or older.",
        },
        email: {
          isValid: /\S+@\S+\.\S+/.test(value),
          errorMessage: "Invalid email address.",
        },
        mobile: {
          isValid: /^\d{10}$/.test(value),
          errorMessage: "Invalid mobile number. Please enter a 10-digit number.",
        },
        password: {
          isValid: value.length >= 8, // Minimum password length of 8 characters
          errorMessage: "Password must be at least 8 characters long.",
        },
        confirmPassword: {
          isValid: value === formData.password,
          errorMessage: "Passwords do not match.",
        },
      };
      
      

    // Check if it's a select input
    if (type === "select-one") {
      // Get the selected option value
      const selectedOption = e.target.value;
      // Update the form data state with the selected option value
      setFormData((prevState) => ({
        ...prevState,
        [name]: selectedOption,
      }));
    } else {
      // For regular input fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        [`${name}Error`]: validations[name].isValid
          ? null
          : validations[name].errorMessage,
      }));
    }
  };

  const handleValidation = () => {
    // Perform validation logic here
    // For example, check if all required fields are filled
    const { userName, fullName, newProductId } = formData;
    if (
      userName.trim() !== "" &&
      fullName.trim() !== "" &&
      newProductId.trim() !== ""
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleNextStep = () => {
    // Perform any additional actions before proceeding to the next step
    nextStep();
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const redoStep = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="relative min-h-screen flex  bg-zinc-100 dark:bg-zinc-900">
      <div className="container max-w-screen-xl mx-auto my-auto relative flex flex-col w-4/5">
        <div className="text-5xl font-semibold  whitespace-pre-line text-center tracking-tighter rounded-3xl">
          Register New Member
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-12 md:w-4/5 mx-auto rounded-3xl"
          style={{ backgroundColor: "#fff" }}
        >
          {step === 1 && (
            <motion.div
              key={step} // Add this line
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-3/5 mx-auto py-12"
            >
              <div className="text-base font-light text-center  ">Step 1/4</div>
              <div
                className="mt-4 w-full h-2"
                style={{ backgroundColor: "#e0cfc8" }}
              >
                <div className="h-full bg-black rounded-3xl w-1/4"></div>
              </div>
              <div className="mt-10 text-2xl  text-center">
                Sponsor and Package Information
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Sponsor Username"
                  name="sponsorUserName" // This should match your formData property
                  className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none"
                  // style={{ backgroundColor: "#e0cfc8" }}
                  value={formData.sponsorUserName} // This correctly points to formData.name
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Sponsor Full Name"
                  name="sponsorFullName" // This should match your formData property
                  className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none"
                  // style={{ backgroundColor: "#e0cfc8" }}
                  value={formData.sponsorFullName} // This should point to formData.number
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <select
                  name="selectProduct"
                  id="NewPackage"
                  className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none"
                  required
                  value={formData.selectProduct}
                  onChange={handleChange}
                >
                  <option value="">Select New Product</option>
                  <option value="4" data-item="200">
                    New Membership Pack1 ($ 200)
                  </option>
                  <option value="5" data-item="400">
                    New Membership Pack2 ($ 400)
                  </option>
                  <option value="6" data-item="600">
                    New Membership Pack3 ($ 600)
                  </option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="mt-4 bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-3/5 mx-auto py-12"
            >
              <div className="text-base font-light text-center  ">Step 2/4</div>
              <div
                className="mt-4 w-full h-2"
                style={{ backgroundColor: "#e0cfc8" }}
              >
                <div className="h-full bg-black rounded-3xl w-2/4"></div>
              </div>
              <div className="mt-12 text-3xl  text-center">
                Contact Information
              </div>
              <div>
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    name="firstName"
                    className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {formData.firstNameError && (
                    <span className="text-red-500">
                      {formData.firstNameError}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="date"
                    name="date"
                    placeholder="Date of Birth"
                    className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                  {formData.dateError && (
                    <span className="text-red-500">{formData.dateError}</span>
                  )}
                </div>
                <div>
                  <select
                    name="gender"
                    required
                    className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formData.genderError && (
                    <span className="text-red-500">{formData.genderError}</span>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {formData.emailError && (
                    <span className="text-red-500">{formData.emailError}</span>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Mobile"
                    required
                    name="mobile"
                    className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  {formData.mobileError && (
                    <span className="text-red-500">{formData.mobileError}</span>
                  )}
                </div>
              </div>
              <div className="flex justify-center mt-12">
                <button
                  type="button"
                  onClick={prevStep}
                  className=" mr-4 bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className=" bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key={step} // Add this line
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-3/5 mx-auto py-12"
            >
              <div className="text-base font-light text-center  ">Step 3/4</div>
              <div
                className="mt-4 w-full h-2"
                style={{ backgroundColor: "#e0cfc8" }}
              >
                <div className="h-full bg-black rounded-3xl w-3/4"></div>
              </div>
              <div className="mt-4 text-2xl  text-center">
                Login Information
              </div>
              <div>
                <input
                  type="username"
                  placeholder="UserName"
                  required
                  name="username"
                  className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
  <input
    type="password"
    placeholder="Password"
    required
    name="password"
    className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none"
    value={formData.password}
    onChange={handleChange}
  />
</div>
<div>
  <input
    type="password"
    placeholder="Confirm Password"
    required
    name="confirmPassword"
    className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none"
    value={formData.confirmPassword}
    onChange={handleChange}
  />
</div>
{formData.password !== formData.confirmPassword && (
  <span className="text-red-500">Passwords do not match. Please enter the same password.</span>
)}


              <div className="flex items-center mt-5">
                <input
                  type="checkbox"
                  id="terms"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={formData.acceptTerms}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      acceptTerms: e.target.checked,
                    }))
                  }
                  required
                />
                <label htmlFor="terms" className="ml-2 text-zinc-700">
                  I accept Terms & Conditions.
                  <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="flex justify-center mt-12">
                <button
                  type="button"
                  onClick={prevStep}
                  className=" mr-4 bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className=" bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          )}
          {step === 4 && (
            <motion.div
              key={step} // Add this line
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:w-3/5 mx-auto py-12"
            >
               <div className="text-base font-light text-center  ">Step 4/4</div>
              <div
                className="mt-4 w-full h-2"
                style={{ backgroundColor: "#e0cfc8" }}
              >
                <div className="h-full bg-black rounded-3xl w-full"></div>
              </div>
              <div className="mt-4 text-2xl text-center">Payment Type</div>
              <div className="mt-4 text-xl text-center">
                Total Amount : $ 128.67
              </div>
              <div
                className="mt-5 text-center"
                style={{ fontSize: "2.5rem", fontWeight: "bold" }}
              >
                E-PIN
              </div>
              <div className="mt-4 max-w-sm mx-auto p-4 border rounded-lg shadow-md">
                <div className="mb-4 p-2 bg-zinc-200 text-zinc-700 rounded">
                  No E-Pin applied
                </div>
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                  <input
                    type="text"
                    placeholder="Enter E-pin"
                    className="flex-grow p-2 border rounded"
                  />
                  <button className="bg-blue-500 text-white p-2 rounded">
                    Apply
                  </button>
                </div>
              </div>
              <div className="flex justify-center mt-12">
                <button
                  type="button"
                  onClick={prevStep}
                  className=" mr-4 bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={redoStep}
                  className=" bg-black text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;
