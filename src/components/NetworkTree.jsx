import React, { useEffect } from 'react'
import TreeNode from './networktree/TreeNode'
import { useDispatch, useSelector } from 'react-redux';
import { networkTree } from "../actions/networkTree";
import Loader from "./report/Loader"


const NetworkTree = () => {
  
 const dispatch = useDispatch();
 const userRole = useSelector((state) => state.auth.userRole);
 const network = useSelector((state) => state.networkTree);

 const userName = useSelector((state) => {
  if (userRole === 'admin') {
    return state?.auth?.authData?.admin?.username;
  } else if (userRole === 'customer') {
    return state?.auth?.authData?.customer?.username;
  }
});

  useEffect(() => {
    dispatch(networkTree(userName));
  }, [dispatch]);
  
  return (
    Object.keys(network).length > 0 ?  
    <div style={ {backgroundColor: '#f0f0f0'}}>
     <TreeNode network={network}/>
    </div>
    :
    <div className='p-4 flex justify-center text-center mt-10'>
      <p className='px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100'><Loader/></p>
    </div>
  )
}

export default NetworkTree
