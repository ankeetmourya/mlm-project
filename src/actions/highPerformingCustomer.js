import * as api from '../api';

export const highPerforming = (username) => async (dispatch) =>{
    try{
       const { data } = await api.highPerformingCustomer(username); //API CALL
       if( data?.response?.data?.message == 'Invalid token'){
         dispatch({ type: 'SIGNOUT'});     
       }else{
       dispatch({ type: 'HIGH_PERFORMING_CUSTOMER', data: data?.body?.customerlist});
      //  console.log('networktree1',data.body.network);

       }
    }catch(error){
       console.log(error);
       if( error?.response?.data?.message == 'Invalid token'){
         dispatch({ type: 'SIGNOUT'});
       }
    }
}