import React, { useEffect, useState } from 'react';
import { exportToExcel } from '../report/exportToExcel';
import { useDispatch, useSelector } from 'react-redux';
import { pendingcommission } from '../../actions/pendingCommissionReport';
import { updateCommission } from '../../actions/updateCommission';
import Loader from '../report/Loader';
import { MdFileDownloadDone } from "react-icons/md";
import ConfirmationModal from './ConfirmationModal';

const CommissionReport = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.userRole);
  const combinedData = useSelector((state) => state.pendingCommissionReport?.commisionPayout?.commisionPayout);

  let username = "";
  if (userRole === "admin") {
    username = useSelector((state) => state.auth.authData.admin?.username);
  } else if (userRole === "customer") {
    username = useSelector((state) => state.auth.authData.customer?.username);
  }

  const payload = {
    admin_username: username
  };

  useEffect(() => {
    dispatch(pendingcommission(payload));
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const handleExport = () => {
    if (combinedData && combinedData.length > 0) {
      const exportData = combinedData.map(item => ({
        CustomerName: item.name,
        Amount: item.amount,
        Commission: item.commssion,
        Mobile: item.mobile,
        AccountNo: item.account_no,
        Details: item.details,
      }));
      exportToExcel(exportData, 'CommissionReport.xlsx');
    }
  };

  const handleInputChange = (username, amount) => {
    setSelectedData({ username, amount });
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    dispatch(updateCommission(selectedData.username, selectedData.amount));
    console.log(selectedData.username, selectedData.amount,"updateeeeed Datas")
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="report-table-container mt-10">
      <h2 className="text-xl font-bold mb-4">Commission Report</h2>
      <div className="overflow-x-auto max-h-[350px]">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 border">NAME</th>
              <th className="py-2 border">AMOUNT</th>
              <th className="py-2 border">COMMISSION</th>
              <th className="py-2 border">MOBILE</th>
              <th className="py-2 border">ACCOUNT NO</th>
              <th className="py-2 border">DETAILS</th>
              <th className="py-2 border">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {combinedData && combinedData.length > 0 ? (
              combinedData.map((item) => (
                <tr key={item.username}>
                  <td className="py-2 border px-4">{item.name}</td>
                  <td className="py-2 border px-4">{item.amount}</td>
                  <td className="py-2 border px-4">{item.commssion}</td>
                  <td className="py-2 border px-4">{item.mobile}</td>
                  <td className="py-2 border px-4">{item.account_no}</td>
                  <td className="py-2 border px-4">{item.details}</td>
                  {userRole === "admin" && (
                    <td className="px-3 sm:px-6 py-3 border whitespace-nowrap text-gray-500 text-center">
                      <button
                        onClick={() => handleInputChange(item.username, item.amount)}
                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
                      >
                        <MdFileDownloadDone className="text-2xl" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
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
        <ConfirmationModal
          username={selectedData.username}
          amount={selectedData.amount}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default CommissionReport;
