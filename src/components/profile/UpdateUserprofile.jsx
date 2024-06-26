import React, { useState } from 'react';

const UpdateUserprofile = () => {

  const initialData = {
    first_name: "",
    last_name: "",
    date: "",
    gender: "",
    bank_name: "",
    account_no: "",
    ifsc_code: "",
    branch_name: "",
    address: "",
    email: "",
    mobileNo: "",
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white rounded shadow-md">
      <div>
        <h2 className="text-xl font-bold">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-2 border rounded w-full"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold">Bank Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="bank_name"
            value={formData.bank_name}
            onChange={handleChange}
            placeholder="Bank Name"
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="account_no"
            value={formData.account_no}
            onChange={handleChange}
            placeholder="Account Number"
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="ifsc_code"
            value={formData.ifsc_code}
            onChange={handleChange}
            placeholder="IFSC Code"
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="branch_name"
            value={formData.branch_name}
            onChange={handleChange}
            placeholder="Branch Name"
            className="p-2 border rounded w-full"
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold">Contact Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="p-2 border rounded w-full"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="p-2 border rounded w-full"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white  rounded hover:bg-blue-700"
          style={{ backgroundColor: "#3AA6B9" }}
        >
          Update Profile
        </button>
      </div>
    </form>
  );
};


export default UpdateUserprofile;
