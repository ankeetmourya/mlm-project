import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAdminReports } from '../actions/reports';
import { orderHistory } from "../actions/orderHistory";

const OrderHistory = () => {
const dispatch = useDispatch();

const oHisory = useSelector((state) => state.ProdcutPurchase);
useEffect(() => {
  dispatch(orderHistory());
}, [dispatch]);

  const orders = [
    {
      sr: 1,
      username: 'John Doe',
      userId: 'U123',
      address: '123 Main St, City',
      mobileNo: '123-456-7890',
      productName: 'Product A',
      orderType: 'Purchased',
      amount: '$100',
      orderDate: '2024-01-01',
      action: 'Pending',
    },
    {
      sr: 2,
      username: 'Jane Smith',
      userId: 'U124',
      address: '456 Elm St, Town',
      mobileNo: '987-654-3210',
      productName: 'Product B',
      orderType: 'Repurchased',
      amount: '$200',
      orderDate: '2024-01-02',
      action: 'Delivered',
    },
    // Add more orders as needed
  ];

  return (
    <div className="p-4 w-full">
      <h1 className="text-xl font-semibold mb-4">Order History</h1>
      <div className="w-full">
      <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Sr.
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  User Id
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Address
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Mobile No.
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Order Type
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.sr} className="text-xs sm:text-sm">
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                    {order.sr}
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                    {order.username}
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                    {order.userId}
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500 hidden sm:table-cell">
                    {order.address}
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500 hidden sm:table-cell">
                    {order.mobileNo}
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                    {order.productName}
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                    {order.orderType}
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                    {order.amount}
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                    {order.orderDate}
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                    {order.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
