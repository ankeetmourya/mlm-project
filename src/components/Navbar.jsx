import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Form from './Form';
import Dashboard from './Dashboard';
import EpinForm from './EpinForm';
import NetworkTree from './NetworkTree';
import Product from './Product';
import Report from './report/Report';
import Header from './Header';


function Navbar({component}) {

    const renderComponent = () => {
        switch (component) {
            case 'register':
                return <Form />
                case 'network':
                    return <NetworkTree/>
                case 'epin':
                    return <EpinForm/>
                    case 'products':
                      return <Product/>
                      case 'reports':
                        return <Report />
            default:
                return <Dashboard/>
        }
      };
    return  (
      <div className="flex flex-col h-screen">
        <Header /> {/* Use the Header component */}
  
        <div className="flex flex-1">
          <div className="w-64 bg-zinc-100 dark:bg-zinc-900 p-4 max-sm:hidden" >
            <nav className="space-y-2">
              <NavLink
                to="/dashboard"
                className={`flex items-center p-2 text-zinc-800 dark:text-white rounded-md ${
                  component === 'dashboard' ? 'bg-purple-200' : ''
                }`}
              >
                <span>Dashboard</span>
              </NavLink>
  
              <NavLink
                to="/network"
                className={`flex items-center p-2 text-zinc-800 dark:text-white rounded-md ${
                  component === 'network' ? 'bg-purple-200' : ''
                }`}
              >
                <span>Networks</span>
              </NavLink>
  
              <NavLink
                to="/register"
                className={`flex items-center p-2 text-zinc-800 dark:text-white rounded-md ${
                  component === 'register' ? 'bg-purple-200' : ''
                }`}
              >
                <span>Registration</span>
              </NavLink>
  
              <NavLink
                to="/epin"
                className={`flex items-center p-2 text-zinc-800 dark:text-white rounded-md ${
                  component === 'epin' ? 'bg-purple-200' : ''
                }`}
              >
                <span>E-Pin</span>
              </NavLink>
  
              <NavLink
                to="/products"
                className={`flex items-center p-2 text-zinc-800 dark:text-white rounded-md ${
                  component === 'products' ? 'bg-purple-200' : ''
                }`}
              >
                <span>Products</span>
              </NavLink>
  
              <NavLink
                to="/reports"
                className={`flex items-center p-2 text-zinc-800 dark:text-white rounded-md ${
                  component === 'reports' ? 'bg-purple-200' : ''
                }`}
              >
                <span>Reports</span>
              </NavLink>
            </nav>
          </div>
  
          <div className="flex-1 p-4">{renderComponent()}</div>
        </div>
      </div>
    );
  }
  
  export default Navbar;
