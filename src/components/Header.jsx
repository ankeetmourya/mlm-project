import React from 'react';
import { useDispatch } from 'react-redux';
import { signout } from '../actions/auth';
import { useNavigate } from 'react-router-dom';
import { RiLogoutBoxRLine } from "react-icons/ri";

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (

    <div className="flex items-center justify-between bg-white dark:bg-zinc-800 p-4 shadow-md">
      <div className="flex items-center">
        <img src="https://placehold.co/50x50" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="text-xl font-semibold text-zinc-800 dark:text-white">MLM MARKETING</span>
      </div>
      <button
      onClick={() => dispatch(signout(navigate))}
      className="bg-red-500 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-all hover:bg-blue-700 hover:text-white"
    >
      <RiLogoutBoxRLine /> {/* Add the Logout icon */}
      {/* <span className="hidden md:inline-block">Logout</span> Show text on hover for medium and larger screens */}
    </button>
    </div>
  );
};

export default Header;
