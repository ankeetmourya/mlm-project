import React, { useEffect, useState } from 'react';
import { exportToExcel } from '../report/exportToExcel';
import { useDispatch, useSelector } from 'react-redux';
import { paidCommission } from '../../actions/paidCommission';

const CommissionPaid = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.userRole);
  let username = "";

  if (userRole === "admin") {
    username = useSelector((state) => state.auth.authData.admin?.username);
  } else if (userRole === "customer") {
    username = useSelector((state) => state.auth.authData.customer?.username);
  }

  const data = useSelector((state) => state.paidCommission?.Transactions);

  useEffect(() => {
    if (username) {
      dispatch(paidCommission(username));
    }
  }, [dispatch, username]);


//   const data = [
//     { customer_username: "665013", amount: "20", request_type: "Commission", state: "Complete" },
//     { customer_username: "665013", amount: "20", request_type: "Commission", state: "Complete" },
//     { customer_username: "665013", amount: "20", request_type: "Commission", state: "Complete" },
//     { customer_username: "665013", amount: "20", request_type: "Commission", state: "Complete" },
//     { customer_username: "665013", amount: "20", request_type: "Commission", state: "Complete" },
//     // ... more data
//   ];


  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(data && data.length / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage;
  const currentData = data && data.slice(startRow, startRow + rowsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleExport = () => {
    if (data && data.length > 0) {
      const exportData = data.map(item => ({
        Customer_username: item.customer_username,
        Amount: item.amount,
        Commission: item.request_type,
        Status: item.state,
      }));
      exportToExcel(exportData, 'CommissionReport.xlsx');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Commission Paid Report</h1>
      {data && data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-start py-2 px-4 border-b border-gray-300">Customer Username</th>
                <th className="text-start py-2 px-4 border-b border-gray-300">Amount</th>
                <th className="text-start py-2 px-4 border-b border-gray-300">Request Type</th>
                <th className="text-start py-2 px-4 border-b border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-2 px-4 border-b border-gray-300">{item.customer_username}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{item.amount}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{item.request_type}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{item.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-4">No data available for commission paid.</div>
      )}
      {data && data.length > 0 && (
        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between">
          <button
            onClick={handlePreviousPage}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg font-bold mb-2 sm:mb-0 sm:mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            onClick={handleExport}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            style={{ background: "#3AA6B9" }}
          >
            Export to Excel
          </button>
        </div>
      )}
    </div>
  );
};

export default CommissionPaid;
