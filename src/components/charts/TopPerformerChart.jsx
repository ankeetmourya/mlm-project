import React from 'react';

const TopPerformerChart = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md">
          <div className="md:w-1/4">
            <h2 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-zinc-200">TEAM PERFORMANCE</h2>
            <div className="bg-zinc-100 dark:bg-zinc-700 rounded-lg p-2">
              <button className="w-full text-left py-2 px-4 bg-purple-500 text-white rounded-lg mb-2">Top Earners</button>
              <button className="w-full text-left py-2 px-4 text-zinc-800 dark:text-zinc-200">Top Recruiters</button>
              <button className="w-full text-left py-2 px-4 text-zinc-800 dark:text-zinc-200">Package Overview</button>
              <button className="w-full text-left py-2 px-4 text-zinc-800 dark:text-zinc-200">Rank Overview</button>
            </div>
          </div>
          <div className="md:w-3/4 mt-4 md:mt-0 md:ml-4">
            <div className="flex items-center justify-between py-2 border-b border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center">
                <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40" alt="Profile"/>
                <div className="ml-4">
                  <div className="text-zinc-800 dark:text-zinc-200 font-semibold">INF00123</div>
                  <div className="text-zinc-500 dark:text-zinc-400">No No</div>
                </div>
              </div>
              <div className="bg-purple-500 text-white px-4 py-2 rounded-lg">$ 92.92</div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center">
                <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40" alt="Profile"/>
                <div className="ml-4">
                  <div className="text-zinc-800 dark:text-zinc-200 font-semibold">INF82013199</div>
                  <div className="text-zinc-500 dark:text-zinc-400">Tammy Burnett</div>
                </div>
              </div>
              <div className="bg-purple-500 text-white px-4 py-2 rounded-lg">$ 26.68</div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center">
                <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40" alt="Profile"/>
                <div className="ml-4">
                  <div className="text-zinc-800 dark:text-zinc-200 font-semibold">INF26378140</div>
                  <div className="text-zinc-500 dark:text-zinc-400">Michael Bond</div>
                </div>
              </div>
              <div className="bg-purple-500 text-white px-4 py-2 rounded-lg">$ 11.96</div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40" alt="Profile"/>
                <div className="ml-4">
                  <div className="text-zinc-800 dark:text-zinc-200 font-semibold">INF69207163</div>
                  <div className="text-zinc-500 dark:text-zinc-400">Lawrence Lee</div>
                </div>
              </div>
              <div className="bg-purple-500 text-white px-4 py-2 rounded-lg">$ 5.52</div>
            </div>
          </div>
        </div>
  );
}

export default TopPerformerChart
