import React, { useEffect } from 'react';
import { exportToExcel } from '../report/exportToExcel';
import { useDispatch, useSelector } from 'react-redux';
import { pendingcommission } from '../../actions/pendingCommissionReport';

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
    "admin_username":username
}


  console.log("usernAmeeee",payload);
  useEffect(() => {
      dispatch(pendingcommission(payload));
  }, [dispatch]);

  // Dummy data
  const dummyData = {
    "message": "Commission pending transaction fetched",
    "body": {
      "commisionPayout": [
        {
          "username": "SM465390",
          "data": [
            { "id": 6, "customer_username": "SM465390", "transactionsrequest": "0", "state": "Pending" },
            { "id": 9, "customer_username": "SM465390", "transactionsrequest": "0", "state": "Pending" },
            { "id": 11, "customer_username": "SM465390", "transactionsrequest": "0", "state": "Pending" },
            { "id": 13, "customer_username": "SM465390", "transactionsrequest": "0", "state": "Pending" },
            { "id": 16, "customer_username": "SM465390", "transactionsrequest": "0", "state": "Pending" },
            { "id": 21, "customer_username": "SM465390", "transactionsrequest": "150", "state": "Pending" },
            { "id": 25, "customer_username": "SM465390", "transactionsrequest": "150", "state": "Pending" }
          ]
        },
        {
          "username": "SM929868",
          "data": [
            { "id": 8, "customer_username": "SM929868", "transactionsrequest": "0", "state": "Pending" },
            { "id": 20, "customer_username": "SM929868", "transactionsrequest": "250", "state": "Pending" },
            { "id": 24, "customer_username": "SM929868", "transactionsrequest": "250", "state": "Pending" }
          ]
        },
        {
          "username": "SM063142",
          "data": [
            { "id": 15, "customer_username": "SM063142", "transactionsrequest": "0", "state": "Pending" }
          ]
        },
        {
          "username": "SM524853",
          "data": [
            { "id": 19, "customer_username": "SM524853", "transactionsrequest": "325", "state": "Pending" },
            { "id": 23, "customer_username": "SM524853", "transactionsrequest": "325", "state": "Pending" }
          ]
        }
      ]
    }
  };

  // Combine dummy data with fetched data if available
  // const combinedData = commissionData.body.commisionPayout;

  const handleExport = () => {
    exportToExcel(combinedData, 'CommissionReport.xlsx');
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
            {combinedData &&
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
                          className="mt-4 bg-purple-600 text-white p-2 rounded-sm w-full"
                          style={{ background: "#3AA6B9" }}
                        >
                          Pay
                        </button>
                      </td>
                    </tr>
                  ))
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
    </div>
  );
};

export default CommissionReport;
