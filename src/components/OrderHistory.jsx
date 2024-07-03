import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderHistory, updateOrderHistory } from "../actions/orderHistory";
import Loader from "./report/Loader";
import { MdFileDownloadDone } from "react-icons/md";

const OrderHistory = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orderHistory);
  const updateOrder = useSelector((state) => state.updateOrderHistory);
  const [orderStatus, setOrderStatus] = useState(orders);
  const userRole = useSelector((state) => state.auth.userRole);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(orderHistory())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching order history:", error);
        setLoading(false);
      });
  }, [dispatch]);

  const handleStatusChange = (orderId, customerId) => {
    // Logic to change the status, e.g., open a modal or directly update status
    dispatch(updateOrderHistory(orderId, customerId));
    console.log(`Change status for order ID: ${orderId}`);
  };

  if (loading) {
    return (
      <div className="p-4 w-full">
        <h1 className="text-xl font-semibold mb-4">Order History</h1>
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="p-4 w-full">
        <h1 className="text-xl font-semibold mb-4">Order History</h1>
        <p className="text-gray-500 text-center">No order history found.</p>
      </div>
    );
  }

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
                  Status
                </th>
                {userRole === "admin" && (
                  <th
                    scope="col"
                    className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mark as Delivered
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
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
                  {userRole === "admin" && (
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-500 text-center">
                      <button
                        onClick={() =>
                          handleStatusChange(order.purchase_id, order.customer_id)
                        }
                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
                      >
                        <MdFileDownloadDone className="text-2xl" />
                      </button>
                    </td>
                  )}
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
