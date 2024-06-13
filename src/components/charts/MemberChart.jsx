import React from 'react'

const MemberChart = () => {
  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">NEW MEMBERS</h2>
          <div className="space-y-4 overflow-y-auto max-h-64">
            <div className="flex items-center space-x-4">
              <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40" alt="User avatar"/>
              <div>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">Bernard</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">user003</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40" alt="User avatar"/>
              <div>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">Kylie</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">user002</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40" alt="User avatar"/>
              <div>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">Ferris</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">user001</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40" alt="User avatar"/>
              <div>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">Mr Robot</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Mrrobot</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40" alt="User avatar"/>
              <div>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium">Ludaid</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Developer</p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default MemberChart
