import * as api from '../api';

export const orderHistory = () => async (dispatch) =>{
    try{
       const { data } = await api.orderHistory(); //API CALL
       console.log('orderHistory', data);
       if( data?.response?.data?.message == 'Invalid token'){
         dispatch({ type: 'SIGNOUT'});
         
       }else{
       dispatch({ type: 'ORDER_HISTORY', data: data?.body?.ProdcutPurchase});
       console.log('orderHistoryyy',data.body.ProdcutPurchase);

       }
    }catch(error){
       console.log(error);
       if( error?.response?.data?.message == 'Invalid token'){
         dispatch({ type: 'SIGNOUT'});
       }
    }
}