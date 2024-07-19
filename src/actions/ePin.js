import * as api from '../api';

export const addEPins = (selectedProduct, navigate) => async (dispatch) => {
    try {
          let ePinData = {...selectedProduct,}
      let reqBody = {pinrequest:ePinData}
      const { data } = await api.addEPins(reqBody); //API CALL
      //dispatch({ type: 'REGISTERCUSTOMER', data: data});
      if( data?.response?.data?.message == 'Invalid token'){
        dispatch({ type: 'SIGNOUT'});

      }else{
        dispatch({ type: 'ADD_EPINS_SUCCESS', data: data.body.Pinstransaction });
  
      }
    } catch (error) {
      if( error?.response?.data?.message == 'Invalid token'){
        dispatch({ type: 'SIGNOUT'});

      }
      console.log(error);
    }
  };


export const fetchPins = (username) => async (dispatch) => {
    try {
      const { data } = await api.fetchRegistrationPins(username); //API CALL
      dispatch({ type: 'FETCH_EPINS', data: data.body.pindetails});
      
    } catch (error) {
      if( error?.response?.data?.message == 'Invalid token'){
        dispatch({ type: 'SIGNOUT'});

      }
      console.log(error);

    }
  };