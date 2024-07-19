import * as api from '../api';

export const networkTree = (username) => async (dispatch) =>{
    try{
       const { data } = await api.networkTree(username); //API CALL
       if( data?.response?.data?.message == 'Invalid token'){
         dispatch({ type: 'SIGNOUT'});     
       }else{
       dispatch({ type: 'NETWORK_TREE', data: data?.body["network:"]});

       }
    }catch(error){
       console.log(error);
       if( error?.response?.data?.message == 'Invalid token'){
         dispatch({ type: 'SIGNOUT'});
       }
    }
}