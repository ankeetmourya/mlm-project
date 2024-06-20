import React from 'react';

const CustomerTransaction = () => {
  // Dummy data
  const transactions = [
    {
      id: 1,
      username: 'john_doe',
      password: 'password123',
      referral: 'ref001',
      amountRecvd: '$100',
      totalMember: 5,
    },
    {
      id: 2,
      username: 'jane_doe',
      password: 'password456',
      referral: 'ref002',
      amountRecvd: '$200',
      totalMember: 10,
    },
    {
      id: 3,
      username: 'alice_smith',
      password: 'password789',
      referral: 'ref003',
      amountRecvd: '$150',
      totalMember: 7,
    },
  ];

  return (
    <div className="container mx-auto  p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Customer Transactions</h2>
      <div className="overflow-x-auto  max-h-[430px]">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left font-medium text-gray-600">ID</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Username</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Password</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Referral</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Amount Received</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Total Member</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b last:border-none">
                <td className="py-4 px-6 text-gray-700">{transaction.id}</td>
                <td className="py-4 px-6 text-gray-700">{transaction.username}</td>
                <td className="py-4 px-6 text-gray-700">{transaction.password}</td>
                <td className="py-4 px-6 text-gray-700">{transaction.referral}</td>
                <td className="py-4 px-6 text-gray-700">{transaction.amountRecvd}</td>
                <td className="py-4 px-6 text-gray-700">{transaction.totalMember}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTransaction;
