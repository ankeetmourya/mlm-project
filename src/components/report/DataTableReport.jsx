import React, { useState } from 'react';
import { exportToExcel } from '../report/exportToExcel';

const DataTableReport = ({ data,header }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startRow, startRow + rowsPerPage);

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
    exportToExcel(data, `${header}.xlsx`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{header}</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-start py-2 px-4 border-b border-gray-300">Transaction Request</th>
              <th className="text-start py-2 px-4 border-b border-gray-300">Customer Username</th>
              <th className="text-start py-2 px-4 border-b border-gray-300">Status</th>
              <th className="text-start py-2 px-4 border-b border-gray-300">Created At</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b border-gray-300">{item.transactionsrequest}</td>
                <td className="py-2 px-4 border-b border-gray-300 ">{item.customer_username || '-'}</td>
                <td className="py-2 px-4 border-b border-gray-300">{item.state}</td>
                <td className="py-2 px-4 border-b border-gray-300">{new Date(item.create_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg font-bold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
        onClick={handleExport}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        style={{ background: '#3AA6B9' }}
      >
        Export to Excel
      </button>
      </div>
    </div>
  );
};

export default DataTableReport;
