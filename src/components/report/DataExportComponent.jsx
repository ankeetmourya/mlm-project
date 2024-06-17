import React, { useState } from 'react';
import { exportToExcel } from '../report/exportToExcel';

const DataExportComponent = ({ adminReports }) => {
  // Transform the adminReports data into an array of objects
  const transformedData = Object.entries(adminReports).map(([key, value]) => ({
    name: key,
    ...value,
  }));

  const handleExport = () => {
    exportToExcel(transformedData, 'adminReports.xlsx');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-start py-2 px-4 border-b border-gray-300">Category</th>
              <th className="text-start py-2 px-4 border-b border-gray-300">Daily</th>
              <th className="text-start py-2 px-4 border-b border-gray-300">Weekly</th>
              <th className="text-start py-2 px-4 border-b border-gray-300">Monthly</th>
            </tr>
          </thead>
          <tbody>
            {transformedData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b border-gray-300">{item.name}</td>
                <td className="py-2 px-4 border-b border-gray-300">{item["daily "] || 0}</td>
                <td className="py-2 px-4 border-b border-gray-300">{item.week || 0}</td>
                <td className="py-2 px-4 border-b border-gray-300">{item.monthly || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleExport}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        style={{ background: '#3AA6B9' }}
      >
        Export to Excel
      </button>
    </div>
  );
};

export default DataExportComponent;
