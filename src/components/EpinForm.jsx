import React, { useState } from 'react';

const EpinForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    amount: '',
    epinCount: '',
    discount: '',
    expiryDate: '',
    employeeCode: ''
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Print form data to console
    setFormData({  // Reset form fields
      username: '',
      amount: '',
      epinCount: '',
      discount: '',
      expiryDate: '',
      employeeCode: ''
    });
  }
  const handleCheckboxChange = (e) => {
    setIsPopupVisible(e.target.checked);
  };

  return (
    <div className="p-4 bg-zinc-50 dark:bg-zinc-800">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">E-PIN</h1>
        <button
          className="bg-purple-500 hover:bg-purple-800 text-white py-2 px-4 rounded-lg "
          onClick={openModal}
        >
          + Add E-pin
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-zinc-700 rounded-lg shadow">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-600">
              <th className="p-4 text-left">Member</th>
              <th className="p-4 text-left">E-pin</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Expiry Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-200 dark:border-zinc-600">
              <td className="p-4 flex items-center">
                <input type="checkbox" className="mr-2"  onChange={handleCheckboxChange} />
                <img src="https://placehold.co/40x40" alt="User" className="rounded-full mr-2" />
                <div>
                  <p className="font-semibold">No</p>
                  <p className="text-zinc-500 dark:text-zinc-300">INF00123</p>
                </div>
              </td>
              <td className="p-4 text-sm">PT97SED8Z7</td>
              <td className="p-4 text-blue-600 text-sm">$ 10</td>
              <td className="p-4 text-sm">December 1, 2024</td>
              <td className="p-4 text-blue-600 text-sm">active</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-600">
              <td className="p-4 flex items-center">
                <input type="checkbox" className="mr-2" onChange={handleCheckboxChange}/>
                <img src="https://placehold.co/40x40" alt="User" className="rounded-full mr-2" />
                <div>
                  <p className="font-semibold">No</p>
                  <p className="text-zinc-500 dark:text-zinc-300">INF00123</p>
                </div>
              </td>
              <td className="p-4 text-sm">PT97SED8Z7</td>
              <td className="p-4 text-blue-600 text-sm">$ 10</td>
              <td className="p-4 text-sm">December 1, 2024</td>
              <td className="p-4 text-blue-600 text-sm">active</td>
            </tr>
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div id="epinModal" className="fixed inset-0 bg-zinc-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-lg max-w-md w-full md:max-w-sm">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">Add New E-Pin</h2>
              <button
                id="closeModalBtn"
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 text-2xl font-bold"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
            <form className="text-sm" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Username <span className="text-red-500">*</span></label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    className="block w-full p-2 border border-zinc-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white"
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1" htmlFor="amount">
                  Amount <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full p-1 border border-zinc-300 rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
                  id="amount"
                  name="amount"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                >
                  <option>Select Amount</option>
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="500">500</option>
                  <option value="1000">1000</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1" htmlFor="epinCount">
                  E-Pin Count <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-1 border border-zinc-300 rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-z inc-300"
                  type="text"
                  id="epinCount"
                  name="epinCount"
                  placeholder="E-Pin Count"
                  required
                  value={formData.epinCount}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1" htmlFor="discount">
                  Discount <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-1 border border-zinc-300 rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
                  type="text"
                  id="discount"
                  name="discount"
                  placeholder="Discount"
                  required
                  value={formData.discount}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1" htmlFor="expiryDate">
                  Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-1 border border-zinc-300 rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  required
                  value={formData.expiryDate}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1" htmlFor="employeeCode">
                  Employee Code <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-1 border border-zinc-300 rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
                  type="text"
                  id="employeeCode"
                  name="employeeCode"
                  placeholder="Employee Code"
                  required
                  value={formData.employeeCode}
                  onChange={handleChange}
                />
              </div>
              <button className="mt-4 bg-purple-600 text-white p-2 rounded-lg w-full" type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
      {isPopupVisible && (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white rounded-lg p-4 flex items-center space-x-4 shadow-lg">
      <div>1 item selected</div>
      <div>
        <button className="bg-black text-white px-4 py-2 rounded-md mr-2">
          Block
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">
          Delete
        </button>
      </div>
    </div>
      )}
    </div>
  );
};

export default EpinForm;
