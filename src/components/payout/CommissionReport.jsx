import React, { useEffect, useState } from 'react';
import { exportToExcel } from '../report/exportToExcel';
import { useDispatch, useSelector } from 'react-redux';
import { pendingcommission } from '../../actions/pendingCommissionReport';
import { updateCommission } from '../../actions/updateCommission';
import Loader from '../report/Loader';
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
  const [modalContent, setModalContent] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  const handleExport = () => {
    if (combinedData && combinedData.length > 0) {
      const exportData = combinedData.map(item => ({
        AccountNo: item.account_no,
        Amount: item.amount,
        Commission: item.commssion,
        Ifsc: item.ifsc_code,
        Details: item.details,
        CustomerName: item.name,
        Mobile: item.mobile,
      }));
      exportToExcel(exportData, 'CommissionReport.xlsx');
    }
  };

  const handleConfirm = () => {
    if (modalContent.username) {
      dispatch(updateCommission(modalContent.username, modalContent.amount));
    } else {
      selectedItems.forEach(username => {
        const item = combinedData.find(item => item.username === username);
        if (item) {
          dispatch(updateCommission(username, item.amount));
        }
      });
    }
    setIsModalOpen(false);
    setSelectedItems([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSelectAll = () => {
    if (selectedItems.length === combinedData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(combinedData.map(item => item.username));
    }
  };

  const handleUpdateSelected = () => {
    if (selectedItems.length === 0) {
      alert("Please select items to update.");
      return;
    }
    if (selectedItems.length === 1) {
      const username = selectedItems[0];
      const item = combinedData.find(item => item.username === username);
      setModalContent({ username, amount: item.amount });
    } else {
      setModalContent({ username: null, amount: null });
    }
    setIsModalOpen(true);
  };

  const isSelected = username => selectedItems.includes(username);

  const toggleSelectItem = username => {
    if (isSelected(username)) {
      setSelectedItems(selectedItems.filter(item => item !== username));
    } else {
      setSelectedItems([...selectedItems, username]);
    }
  };

  return (
    <div className="report-table-container mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4 sm:mb-0">Commission Report</h2>
        <div className="flex flex-col sm:flex-row">
          <button
            onClick={handleSelectAll}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2"
            
          >
            {selectedItems.length ===combinedData && combinedData.length ? 'Deselect All' : 'Select All'}
          </button>
          <button
            onClick={handleUpdateSelected}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={selectedItems.length === 0}
          >
            Update Selected
          </button>
        </div>
      </div>
      <div className="overflow-x-auto max-h-[350px]">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 border">ACCOUNT NO</th>
              <th className="py-2 border">AMOUNT</th>
              <th className="py-2 border">COMMISSION</th>
              <th className="py-2 border">IFSC</th>
              <th className="py-2 border">DETAILS</th>
              <th className="py-2 border">NAME</th>
              <th className="py-2 border">MOBILE</th> 
              <th className="py-2 border">SELECT</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {combinedData && combinedData.length > 0 ? (
              combinedData.map((item) => (
                <tr key={item.username}>
                  <td className="py-2 border px-4">{item.account_no}</td>
                  <td className="py-2 border px-4">{item.amount}</td>
                  <td className="py-2 border px-4">{item.commssion}</td>
                  <td className="py-2 border px-4">{item.ifsc_code}</td>
                  <td className="py-2 border px-4">{item.details}</td>
                  <td className="py-2 border px-4">{item.name}</td>
                  <td className="py-2 border px-4">{item.mobile}</td>
                  <td className="py-2 border px-4">
                    <input
                      type="checkbox"
                      checked={isSelected(item.username)}
                      onChange={() => toggleSelectItem(item.username)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
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
          username={modalContent.username}
          amount={modalContent.amount}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default CommissionReport;
