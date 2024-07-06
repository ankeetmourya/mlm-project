import React, { useEffect, useState } from "react";
import { exportToExcel } from "../report/exportToExcel";
import { useDispatch, useSelector } from "react-redux";
import { pendingcommission } from "../../actions/pendingCommissionReport";
import { updateCommission } from "../../actions/updateCommission";
import Loader from "../report/Loader";

const CommissionReport = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.userRole);
  const combinedData = useSelector(
    (state) => state.pendingCommissionReport?.commisionPayout?.commisionPayout
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ username: "", amount: "" });
  const [modalMessage, setModalMessage] = useState("");
  const [modalError, setModalError] = useState("");

  let username = "";
  if (userRole === "admin") {
    username = useSelector((state) => state.auth.authData.admin?.username);
  } else if (userRole === "customer") {
    username = useSelector((state) => state.auth.authData.customer?.username);
  }

  const payload = {
    admin_username: username,
  };

  useEffect(() => {
    dispatch(pendingcommission(payload));
  }, [dispatch]);

  const handleExport = () => {
    exportToExcel(combinedData, "CommissionReport.xlsx");
  };

  const openModal = (username) => {
    setModalData({ username, amount: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
    setModalError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    dispatch(updateCommission(modalData))
      .then((res) => {
        setModalMessage("Successfully paid.");
        setIsModalOpen(true); // Open modal on success
        setTimeout(() => {
          setIsModalOpen(false); // Close modal after 3 seconds
          setModalMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error paying commission:", error);
        setModalError("Failed to pay commission. Please try again."); // Set error message on failure
        setIsModalOpen(true); // Open modal on error
        setTimeout(() => {
          setIsModalOpen(false); // Close modal after 3 seconds
          setModalError("");
        }, 3000);
      });
  };

  return (
    <div className="report-table-container mt-10">
      <h2 className="text-xl font-bold mb-4">Commission Report</h2>
      <div className="overflow-x-auto max-h-[350px]">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 border">ID</th>
              <th className="py-2 border">Customer Username</th>
              <th className="py-2 border">Commission Requested</th>
              <th className="py-2 border">Status</th>
              <th className="py-2 border">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {combinedData && combinedData.length > 0 ? (
              combinedData.map(
                ({ username, data }) =>
                  data &&
                  data.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 border px-4">{item.id}</td>
                      <td className="py-2 border px-4">{username}</td>
                      <td className="py-2 border px-4">
                        {item.transactionsrequest}
                      </td>
                      <td className="py-2 border px-4">{item.state}</td>
                      <td className="py-2 border px-4">
                        <button
                          onClick={() => openModal(username)}
                          className="mt-4 bg-purple-600 text-white p-2 rounded-sm w-full"
                          style={{ background: "#3AA6B9" }}
                        >
                          Paid
                        </button>
                      </td>
                    </tr>
                  ))
              )
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  <Loader />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleExport}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        style={{ background: "#3AA6B9" }}
      >
        Export to Excel
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-md mx-4">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700"
            >
              &#x2715;
            </button>
            <h2 className="text-xl font-bold mb-4">Add Commission</h2>
            <div>
              <label className="block mb-2">
                Username
                <input
                  type="text"
                  name="username"
                  value={modalData.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border rounded"
                  readOnly
                />
              </label>
              <label className="block mb-2">
                Amount
                <input
                  type="number"
                  name="amount"
                  value={modalData.amount}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border rounded"
                />
              </label>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  style={{ background: "#3AA6B9" }}
                >
                  Add
                </button>
              </div>
              {modalError && (
                <p className="text-red-500 mt-2">{modalError}</p>
              )}
              {modalMessage && (
                <p className="text-green-500 mt-2">{modalMessage}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionReport;
