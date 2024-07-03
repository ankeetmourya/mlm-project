import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import * as api from '../../api';
const UpdateUserprofile = () => {

  const userRole = useSelector((state) => state.auth.userRole);
  const adminData = useSelector((state) => state.auth.authData.admin);
  const customerData = useSelector((state) => state.auth.authData.customer);

  const getInitialData = () => {
    if (userRole === "admin") {
      return adminData
    } else if (userRole === "customer") {
      return customerData
    }
  };


  console.log("dataaaMan",customerData);
  const [formData, setFormData] = useState(getInitialData());
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const validate = () =>{
  //   return true;
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
   
    // if(!validate()){
    //   return 
    // }
    let payload = {
      customer : formData
    }
    api.updateProfile(payload).then((res)=> 
      console.log(res)
    )
    console.log('Form Data:', formData);
  };

  return (   
<form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white rounded shadow-md">
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
              className="p-2 border rounded w-full m-2"
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
  );
};


export default UpdateUserprofile;
