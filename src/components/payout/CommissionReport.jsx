import React, { useEffect } from 'react';
import { exportToExcel } from '../report/exportToExcel';
import { useDispatch, useSelector } from 'react-redux';
import { pendingcommission } from '../../actions/pendingCommissionReport';

const CommissionReport = () => {
  const dispatch = useDispatch()
  const userName = useSelector((state) => {
    const userRole = state.auth.userRole;

    if (userRole === "admin") {
      return state.auth.authData?.admin?.username;
    } else {
      return state.auth.authData?.customer?.username;
    }
  });
  
 //const commissionData = useSelector((state) => state.pendingCommissionReport?.commisionPayout?.commisionPayout);

  useEffect(() => {
    dispatch(pendingcommission(userName));
  }, [dispatch]);

  const data = {
    "message": "Commission pending transaction fetched",
    "body": {
        "commisionPayout": [
            {
                "username": "11111",
                "data": [
                    {
                        "id": 2,
                        "customer_username": "",
                        "admin_username": "1",
                        "sponserer_username": "1",
                        "transactionsrequest": "20",
                        "transactionseffect": "20",
                        "state": "Complete",
                        "request_type": "Commission"
                    },
                    {
                        "id": 20,
                        "customer_username": "",
                        "admin_username": "1",
                        "sponserer_username": "1",
                        "transactionsrequest": "20",
                        "transactionseffect": "20",
                        "state": "Complete",
                        "request_type": "Commission"
                    }
                ]
            },
            {
               "username":"akshay",
                "data": [
                    {
                        "id": 58,
                        "customer_username": "akshay",
                        "admin_username": "",
                        "sponserer_username": "",
                        "transactionsrequest": "\"0\"",
                        "transactionseffect": "\"0\"",
                        "state": "Complete",
                        "request_type": "Commission"
                    },
                    {
                        "id": 68,
                        "customer_username": "akshay",
                        "admin_username": "",
                        "sponserer_username": "",
                        "transactionsrequest": "\"0\"",
                        "transactionseffect": "\"0\"",
                        "state": "Complete",
                        "request_type": "Commission"
                    },   
                ]
            },  
        ]
    }
}

  const commissionData = data.body.commisionPayout;


  const handleExport = () => {
    exportToExcel(commissionData, 'CommissionReport.xlsx');
  };

  return (
    <div className="report-table-container mt-10">
      <h2 className="text-xl font-bold mb-4">Commission Report</h2>
      <div className="overflow-x-auto max-h-56">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border">ID</th>
            <th className="py-2 border">Customer Username</th>
            <th className="py-2 border">Admin Username</th>
            {/* <th className="py-2 border">Sponsor Username</th> */}
            <th className="py-2 border">Commission Received</th>
            <th className="py-2 border">Transactions Effect</th>
            <th className="py-2 border">Status</th>
            <th className="py-2 border">Request Type</th>
            <th className="py-2 border">Action</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {commissionData.map(({username,data}) => (
            data.map((item)=> <tr key={item.id}>
            <td className="py-2 border px-4">{item.id}</td>
            <td className="py-2 border px-4">{username}</td>
            <td className="py-2 border px-4">{item.admin_username || "-"}</td>
            {/* <td className="py-2 border px-4">{item.sponserer_username || "-"}</td> */}
            <td className="py-2 border px-4">{item.transactionsrequest}</td>
            <td className="py-2 border px-4">{item.transactionseffect}</td>
            <td className="py-2 border px-4">{item.state}</td>
            <td className="py-2 border px-4">{item.request_type}</td>
            <td className="py-2 border px-4"><button type="button" 
            style={{background:"#3AA6B9"}}
            className="mt-4 bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Payment</button></td>
          </tr>
          )  
          ))}
        </tbody>
      </table>
      </div>
      <button
        onClick={handleExport}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        style={{background:"#3AA6B9"}}
      >
        Export to Excel
      </button>
    </div>
  );
};

export default CommissionReport;
