import React, { useEffect } from 'react'
import { exportToExcel } from './exportToExcel';
import { useDispatch, useSelector } from 'react-redux';
import { newMembers } from '../../actions/newMembers';

const NewJoinedMember = ({newMembers}) => {
   
      const handleExport = () => {
        exportToExcel(newMembers, 'adminReports.xlsx');
      };


  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">New Joined Members Report</h1>
    <div className="overflow-x-auto max-h-56">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-start py-2 px-4 border-b border-gray-300">UserName</th>
            <th className="text-start py-2 px-4 border-b border-gray-300">First Name</th>
            <th className="text-start py-2 px-4 border-b border-gray-300">Last Name</th>
            
          </tr>
        </thead>
        <tbody>
          {newMembers && newMembers.length>0 &&newMembers.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-4 border-b border-gray-300">{item.username}</td>
              <td className="py-2 px-4 border-b border-gray-300">{item.first_name}</td>
              <td className="py-2 px-4 border-b border-gray-300">{item.last_name}</td>
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

export default NewJoinedMember
