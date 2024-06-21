import React, { useEffect } from 'react'
import TreeNode from './networktree/TreeNode'
import { useDispatch, useSelector } from 'react-redux';
import { networkTree } from "../actions/networkTree";

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
    <div>
     <TreeNode network={network}/>
    </div>
    :
    <div className='p-4 flex justify-center text-center mt-10'>
      <p className='text-red-500 text-lg font-semibold'> No Network</p>
    </div>
  )
}

export default NetworkTree
