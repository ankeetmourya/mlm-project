import React from 'react';
import { exportToExcel } from '../report/exportToExcel';

const ProductReport = () => {
  const data = {
    message: "Report created",
    body: {
      "Product Sale": {
        daily: 2,
        week: 3,
        monthly: 3,
        "Product report": [
          {
            transactionsrequest: 1,
          },
          {
            transactionsrequest: 1,
          },
          {
            transactionsrequest: 1,
          },
        ],
      },
      "commission report": {
        daily: 20,
        week: 30,
        monthly: 30,
        "commission Report": [
          {
            transactionsrequest: 10,
          },
          {
            transactionsrequest: 10,
          },
          {
            transactionsrequest: 10,
          },
        ],
      },
    },
  };

  const productSale = data.body["Product Sale"];
  const productReport = productSale ? productSale["Product report"] : [];
  const commissionReport = data.body["commission report"];
  const commissionReportList = commissionReport ? commissionReport["commission Report"] : [];


  const handleProductExport = () => {
    const productData = [
      { Type: 'Daily', Count: productSale.daily, 'Transactions Request': productReport[0]?.transactionsrequest },
      { Type: 'Week', Count: productSale.week, 'Transactions Request': productReport[1]?.transactionsrequest },
      { Type: 'Monthly', Count: productSale.monthly, 'Transactions Request': productReport[2]?.transactionsrequest }
    ];
    exportToExcel(productData, 'ProductSale.xlsx');
  };

  const handleCommissionExport = () => {
    const commissionData = [
      { Type: 'Daily', Count: commissionReport.daily, 'Transactions Request': commissionReportList[0]?.transactionsrequest },
      { Type: 'Week', Count: commissionReport.week, 'Transactions Request': commissionReportList[1]?.transactionsrequest },
      { Type: 'Monthly', Count: commissionReport.monthly, 'Transactions Request': commissionReportList[2]?.transactionsrequest }
    ];
    exportToExcel(commissionData, 'CommissionReport.xlsx');
  };

  return (
    <div className="report-table-container">
      {/* Product Sale Table */}
      <h2 className="text-xl font-bold mb-4">Product Sale</h2>
      <table className="min-w-full bg-white border">
        <thead className='bg-gray-200'>
          <tr>
            <th className="py-2 border border-gray-300">Type</th>
            <th className="py-2 border border-gray-300 ">Count</th>
            <th className="py-2 border border-gray-300">Transactions Request</th>
          </tr>
        </thead>
        <tbody>
          <tr className='text-center'>
            <td className="py-2 border px-4 ">Daily</td>
            <td className="py-2 border px-4">{productSale?.daily}</td>
            <td className="py-2 border px-4">{productReport[0]?.transactionsrequest}</td>
          </tr>
          <tr className='text-center'>
            <td className="py-2 border px-4">Week</td>
            <td className="py-2 border px-4">{productSale?.week}</td>
            <td className="py-2 border px-4">{productReport[1]?.transactionsrequest}</td>
          </tr>
          <tr className='text-center'>
            <td className="py-2 border px-4">Monthly</td>
            <td className="py-2 border px-4">{productSale?.monthly}</td>
            <td className="py-2 border px-4">{productReport[2]?.transactionsrequest}</td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={handleProductExport}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        style={{background:"#3AA6B9"}}
      >
        Export Product Sale to Excel
      </button>

      {/* Commission Report Table */}
      <h2 className="text-xl font-bold mt-8 mb-4">Commission Report</h2>
      <table className="min-w-full bg-white border">
        <thead className='bg-gray-200'>
          <tr className='text-center'>
            <th className="py-2 border border-gray-300 ">Type</th>
            <th className="py-2 border border-gray-300">Count</th>
            <th className="py-2 border border-gray-300">Transactions Request</th>
          </tr>
        </thead>
        <tbody>
          <tr className='text-center'>
            <td className="py-2 border px-4">Daily</td>
            <td className="py-2 border px-4">{commissionReport?.daily}</td>
            <td className="py-2 border px-4">{commissionReportList[0]?.transactionsrequest}</td>
          </tr>
          <tr className='text-center'>
            <td className="py-2 border px-4">Week</td>
            <td className="py-2 border px-4">{commissionReport?.week}</td>
            <td className="py-2 border px-4">{commissionReportList[1]?.transactionsrequest}</td>
          </tr>
          <tr className='text-center'>
            <td className="py-2 border px-4">Monthly</td>
            <td className="py-2 border px-4">{commissionReport?.monthly}</td>
            <td className="py-2 border px-4">{commissionReportList[2]?.transactionsrequest}</td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={handleCommissionExport}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        style={{background:"#3AA6B9"}}
      >
        Export Commission Report to Excel
      </button>
    </div>
  );
};

export default ProductReport;
