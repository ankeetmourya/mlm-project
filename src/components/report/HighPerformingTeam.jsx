import React from 'react'
import { exportToExcel } from './exportToExcel';

const HighPerformingTeam = ({highPerforming}) => {

    const handleExport = () => {
        exportToExcel(highPerforming, 'adminReports.xlsx');
      };


  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Top Performance Team Report</h1>
    <div className="overflow-x-auto max-h-52">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-start py-2 px-4 border-b border-gray-300">Customer</th>
            <th className="text-start py-2 px-4 border-b border-gray-300">New Join Members</th>        
          </tr>
        </thead>
        <tbody>
          {highPerforming && highPerforming.length>0 && highPerforming.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-4 border-b border-gray-300">{item.customer}</td>
              <td className="py-2 px-4 border-b border-gray-300">{item.count}</td>
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
  )
}

export default HighPerformingTeam
