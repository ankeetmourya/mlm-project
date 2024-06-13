// src/components/DataExportComponent.jsx
import React, { useState } from 'react';
import { exportToExcel } from '../report/exportToExcel';

const sampleData = [
  { name: 'John Doe', age: 28, email: 'john.doe@example.com' },
  { name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
  // Add more sample data here
];

const PinReport = () => {
  const [isTableVisible, setIsTableVisible] = useState(false);

  const handleExport = () => {
    exportToExcel(sampleData, 'sampleData.xlsx');
  };

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Export Example</h1>
      <button
        onClick={toggleTableVisibility}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4 flex items-center"
      >
        {isTableVisible ? (
          <>
            <span>Pin</span>
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              ></path>
            </svg>
          </>
        ) : (
          <>
            <span>Pin</span>
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </>
        )}
      </button>
      {isTableVisible && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Age</th>
                <th className="py-2 px-4 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.age}</td>
                  <td className="py-2 px-4 border-b">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={handleExport}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Export to Excel
      </button>
    </div>
  );
};

export default PinReport;
