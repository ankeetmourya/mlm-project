import * as api from '../api';

export const orderHistory = () => async (dispatch) =>{
    try{
       const { data } = await api.orderHistory(); //API CALL
       if( data?.response?.data?.message == 'Invalid token'){
         dispatch({ type: 'SIGNOUT'});
         
       }else{
       dispatch({ type: 'ORDER_HISTORY', data: data?.body?.ProdcutPurchase});
       }
    }catch(error){
       console.log(error);
       if( error?.response?.data?.message == 'Invalid token'){
         dispatch({ type: 'SIGNOUT'});
       }
    }
}

export const updateOrderHistory = (id,customer_id) => async(dispatch) =>{
  try{
    const payload = {
         "updateproductpurchase": {
          "purchase_id": id,
          "customer_id": customer_id,
          "deliver_status": "delivered"
      }
  }


    const { data } = await api.updateOrderHistory(payload); //API CALL
    if( data?.response?.data?.message == 'Invalid token'){
      dispatch({ type: 'SIGNOUT'}); 
    }else{
    dispatch({ type: 'ORDER_UPDATE_HISTORY', data});
    }
 }catch(error){
    console.log(error);
    if( error?.response?.data?.message == 'Invalid token'){
      dispatch({ type: 'SIGNOUT'});
    }
 }
}