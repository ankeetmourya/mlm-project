import * as api from "../api";

export const updateCommission = (userData) => async (dispatch) => {
  try {
    let payload = {
      customer_details:userData
    }

    const { data } = await api.updateCommission(payload);
    console.log('updateUpdateCommission', data);
    if( data?.response?.data?.message == 'Invalid token'){
        dispatch({ type: 'SIGNOUT'}); 
      }
  } catch (error) {
    console.log(error);
    if( error?.response?.data?.message == 'Invalid token'){
        dispatch({ type: 'SIGNOUT'});
      }
  }
};
