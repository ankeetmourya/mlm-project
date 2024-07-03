import React, { useEffect } from 'react';
import { getAllCustomers } from '../actions/allCustomers';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "./report/Loader";

const CustomerTransaction = () => {

  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.allCustomers);
  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Customer Transactions</h2>
      <div className="overflow-x-auto max-h-[430px]">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left font-medium text-gray-600">ID</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Username</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Password</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">FullName</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Amount Received</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Total Member</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b last:border-none">
                  <td className="py-4 px-6 text-gray-700">{transaction.id}</td>
                  <td className="py-4 px-6 text-gray-700">{transaction.username}</td>
                  <td className="py-4 px-6 text-gray-700">{transaction.password}</td>
                  <td className="py-4 px-6 text-gray-700">{`${transaction.first_name} ${transaction.last_name}`}</td>
                  <td className="py-4 px-6 text-gray-700">{transaction.total_amount}</td>
                  <td className="py-4 px-6 text-gray-700">{transaction.totalMember}</td>
                </tr>
              ))
            ): (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center">
                  <div className='center'>
                    <Loader />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTransaction;
