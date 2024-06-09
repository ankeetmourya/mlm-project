import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Form from './Form';
import Dashboard from './Dashboard';

function Navbar({component}) {

    const renderComponent = () => {
        switch (component) {
            case 'register':
                return <Form />
        
            default:
                return <Dashboard/>
        }
      };
    return (
        <div className="flex flex-col h-screen">
          
          <div className="flex items-center justify-between bg-white dark:bg-zinc-800 p-4 shadow-md">
            <div className="flex items-center">
              <img src="https://placehold.co/50x50" alt="Logo" className="h-8 w-8 mr-2" />
              <span className="text-xl font-semibold text-zinc-800 dark:text-white">DASHBOARD</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span>$</span>
                <span>|</span>
                <img src="https://placehold.co/20x20" alt="Flag" className="h-5 w-5" />
              </div>
              <div className="relative">
                <button className="relative">
                  <img src="https://placehold.co/20x20" alt="Bell" className="h-5 w-5" />
                  <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <img src="https://placehold.co/30x30" alt="User" className="h-8 w-8 rounded-full" />
                <span className="text-zinc-800 dark:text-white">DASHBOARD</span>
              </div>
            </div>
          </div>
        
          
          <div className="flex flex-1">
            <div className="w-64 bg-zinc-100 dark:bg-zinc-900 p-4 max-sm:hidden">
              <nav className="space-y-2">
                
                <NavLink to="/dashboard" className={`flex items-center p-2 text-zinc-800 dark:text-white rounded-md ${component == 'dashboard' ? 'bg-purple-200':''}`}>
                  <span>Dashboard</span>
                </NavLink>

                <NavLink to="#" className="flex items-center p-2 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md">
                  <span>Networks</span>
                </NavLink>

                <NavLink to="/register" className={`flex items-center p-2 text-zinc-800 dark:text-white rounded-md ${component == 'register' ? 'bg-purple-200':''}`}>
                  <span>Registeration</span>
                </NavLink>
            
            
                <NavLink to="#" className="flex items-center p-2 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md">
                  <span>E-Pin</span>
                </NavLink>
        
                <NavLink to="#" className="flex items-center p-2 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md">
                  <span>Reports</span>
                </NavLink>
              </nav>
            </div>
        
            
            <div className="flex-1 p-6 bg-zinc-50 dark:bg-zinc-800">
            {renderComponent()}
            </div>
          </div>
        </div>
    )
}

export default Navbar
