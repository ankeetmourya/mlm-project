import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminReports } from "../actions/reports";
import { orderHistory } from "../actions/orderHistory";
import Loader from "./report/Loader";

const OrderHistory = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orderHistory);
  useEffect(() => {
    dispatch(orderHistory());
  }, [dispatch]);
  return (
    <div className="p-4 w-full">
      <h1 className="text-xl font-semibold mb-4">Order History</h1>
      <div className="w-full">
        <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg max-h-[450px]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer Id
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Username
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                >
                  Mobile No.
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product Name
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order Type
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order Date
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.customer_id} className="text-xs sm:text-sm">
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                      {order.customer_id}
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                      {order.customer_username}
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500 hidden sm:table-cell">
                      {order.address}
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500 hidden sm:table-cell">
                      {order.mobileno}
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                      {order.productname}
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                      {order.order_type}
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                      {order.purchase_price}
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                      {order.purchase_date}
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                      {order.deliver_status}
                    </td>
                  </tr>
                ))
              ) : (
                <span className="flex items-center justify-center ml-96 mt-10">
                  <Loader />
                </span>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
