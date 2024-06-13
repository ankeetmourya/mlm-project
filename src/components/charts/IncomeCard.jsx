import React from 'react'

const IncomeCard = () => {
  return (
    <div className="flex space-x-4">
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md flex-1 relative">
      <div className="flex justify-between items-center">
        <span className="text-zinc-500 dark:text-zinc-400">Admin Income</span>
        <div className="relative group">
          <svg className="w-4 h-4 text-zinc-400 dark:text-zinc-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 9a1 1 0 112 0v3a1 1 0 11-2 0V9zm1-7a7 7 0 100 14A7 7 0 0010 2zm0 12a5 5 0 110-10 5 5 0 010 10z" />
          </svg>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
            All products amount including service charge and tax
          </div>
        </div>
      </div>
      <div className="text-green-500 text-xl font-semibold">$ 6.77K</div>
    </div>
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md flex-1 relative">
      <div className="flex justify-between items-center">
        <span className="text-zinc-500 dark:text-zinc-400">TDS Income</span>
        <div className="relative group">
          <svg className="w-4 h-4 text-zinc-400 dark:text-zinc-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 9a1 1 0 112 0v3a1 1 0 11-2 0V9zm1-7a7 7 0 100 14A7 7 0 0010 2zm0 12a5 5 0 110-10 5 5 0 010 10z" />
          </svg>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
            All products amount including service charge and tax
          </div>
        </div>
      </div>
      <div className="text-zinc-500 text-xl font-semibold">$ 0.00</div>
    </div>
  </div>
  )
}

export default IncomeCard
