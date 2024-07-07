import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { financeDataAdmin } from '../../actions/financeDataAdmin';
import { financeData } from '../../actions/financeData';
import 'chart.js/auto';

const PayoutChart = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.userRole);
  const [activeSegment, setActiveSegment] = useState(null);

  let username = "";
  if (userRole === "admin") {
    username = useSelector((state) => state.auth.authData.admin?.username);
  } else if (userRole === "customer") {
    username = useSelector((state) => state.auth.authData.customer?.username);
  }

  let pendingCommission = "";
  let totalCommission = "";

  if (userRole === "admin") {
    pendingCommission = useSelector((state) => state.FinanceDataAdmin?.pending_amount_to_pay);
    totalCommission = useSelector((state) => state.FinanceDataAdmin?.commission_earned);
  } else if (userRole === "customer") {
    pendingCommission = useSelector((state) => state.FinanceData?.pending_commission) || 0;
    totalCommission = useSelector((state) => state.FinanceData?.total_commission) || 0;
  }

  useEffect(() => {
    if (userRole === "admin") {
      dispatch(financeDataAdmin(username));
    } else if (userRole === "customer") {
      dispatch(financeData(username));
    }
  }, [dispatch, userRole, username]);

  const percentage = totalCommission !== 0 ? ((pendingCommission / totalCommission) * 100) : 0;

  const data = {
    labels: ['Pending', 'Total Commission'],
    datasets: [
      {
        data: [pendingCommission, totalCommission],
        backgroundColor: ['#D3D3D3', '#4B0082'],
        hoverBackgroundColor: ['#D3D3D3', '#4B0082'],
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: $${tooltipItem.raw}`;
          },
        },
      },
    },
    onClick: (e, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setActiveSegment(index);
      }
    },
  };

  return (
    <div
      className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      style={{ height: '70vh' }}
    >
      <h2 className="text-zinc-800 dark:text-zinc-200 text-lg font-semibold mb-4 text-center">PAYOUT OVERVIEW</h2>
      <div className="flex justify-center mb-4">
        <div className="relative">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200">{percentage}%</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-around mt-4">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center mb-1">
            <span
              className={`w-3 h-3 ${activeSegment === 1 ? 'bg-purple-600' : 'bg-purple-400'} inline-block mr-2`}
              style={{ background: '#4B0082' }}
            ></span>
            <span className="text-zinc-800 dark:text-zinc-200">Total Commission</span>
          </div>
          <div className="text-zinc-800 dark:text-zinc-200">{totalCommission}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <span
              className={`w-3 h-3 ${activeSegment === 0 ? 'bg-zinc-400' : 'bg-zinc-300'} inline-block mr-2`}
              style={{ background: '#D3D3D3' }}
            ></span>
            <span className="text-zinc-800 dark:text-zinc-200">Pending</span>
          </div>
          <div className="text-zinc-800 dark:text-zinc-200">{pendingCommission}</div>
        </div>
      </div>
    </div>
  );
};

export default PayoutChart;
