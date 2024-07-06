import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../api";
const UpdateUserprofile = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.userRole);
  const adminData = useSelector((state) => state.auth.authData.admin);
  const customerData = useSelector((state) => state.auth.authData.customer);

  const getInitialData = () => {
    if (userRole === "admin") {
      return adminData;
    } else if (userRole === "customer") {
      return customerData;
    }
  };

  const [formData, setFormData] = useState(getInitialData());
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      customer: formData,
    };

    api
      .updateProfile(payload)
      .then((res) => {
        console.log(res);
        setModalMessage("Profile updated successfully.");
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 3000); // Close modal after 3 seconds
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setModalMessage("Failed to update profile.");
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 3000); // Close modal after 3 seconds
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-4 space-y-4 bg-white rounded shadow-md"
      >
        <div>
          <h2 className="text-xl font-bold">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label
                htmlFor="first_name"
                className="mt-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData?.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="p-2 border rounded w-full mt-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="last_name"
                className="mt-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData?.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="p-2 border rounded w-full mt-2"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold">Bank Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label
                htmlFor="bank_name"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Bank Name
              </label>
              <input
                type="text"
                name="bank_name"
                value={formData?.bank_name}
                onChange={handleChange}
                placeholder="Bank Name"
                className="p-2 border rounded w-full mt-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="account_no"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Account Number
              </label>
              <input
                type="text"
                name="account_no"
                value={formData?.account_no}
                onChange={handleChange}
                placeholder="Account Number"
                className="p-2 border rounded w-full mt-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="ifsc_code"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                IFSC Code
              </label>
              <input
                type="text"
                name="ifsc_code"
                value={formData?.ifsc_code}
                onChange={handleChange}
                placeholder="Account Number"
                className="p-2 border rounded w-full mt-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="branch_name"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Branch Name
              </label>
              <input
                type="text"
                name="branch_name"
                value={formData?.branch_name}
                onChange={handleChange}
                placeholder="Account Number"
                className="p-2 border rounded w-full mt-2"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold ">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData?.address}
                onChange={handleChange}
                placeholder="Address"
                className="p-2 border rounded w-full mt-2"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-2 border rounded w-full mt-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="mobileNo"
                className=" block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileNo"
                value={formData?.mobileNo}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="p-2 border rounded w-full mt-2"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white rounded hover:bg-blue-700"
            style={{ backgroundColor: "#3AA6B9" }}
          >
            Update Profile
          </button>
        </div>
      </form>
      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6">
            <p className="text-lg font-bold mb-4">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 text-white rounded"
              style={{ backgroundColor: "#3AA6B9" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUserprofile;
