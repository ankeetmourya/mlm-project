import React, { useRef, useEffect, useState } from 'react';

const PayoutChart = () => {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);

  return (
    <div
      className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md max-w-sm mx-auto"
      style={{ width: '90vw', height: '50vh' }}
      ref={chartRef}
    >
      <h2 className="text-zinc-800 dark:text-zinc-200 text-lg font-semibold mb-4">PAYOUT OVERVIEW</h2>
      <div className="flex justify-center mb-4">
        <div className="relative">
          <svg className="w-24 h-24" viewBox="0 0 36 36">
            <path
              className="text-zinc-300"
              strokeWidth="3.8"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845a 15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 1 1 0-31.831"
            />
            <path
              className={`text-purple-600 ${isVisible ? 'fill-animation' : ''}`}
              strokeWidth="3.8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845a 15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 1 1 0-31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200">83%</span>
          </div>
        </div>
      </div>
      <div className="text-center text-zinc-600 dark:text-zinc-400 mb-4">Paid</div>
      <div className="flex justify-around text-sm mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <span className="w-3 h-3 bg-blue-800 inline-block mr-2"></span>
            <span className="text-zinc-800 dark:text-zinc-200">Paid</span>
          </div>
          <div className="text-zinc-800 dark:text-zinc-200">$ 83.33</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <span className="w-3 h-3 bg-purple-400 inline-block mr-2"></span>
            <span className="text-zinc-800 dark:text-zinc-200">Approved</span>
          </div>
          <div className="text-zinc-800 dark:text-zinc-200">$ 0</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <span className="w-3 h-3 bg-zinc-300 inline-block mr-2"></span>
            <span className="text-zinc-800 dark:text-zinc-200">Pending</span>
          </div>
          <div className="text-zinc-800 dark:text-zinc-200">$ 16.89</div>
        </div>
      </div>
    </div>
  );
};

export default PayoutChart;