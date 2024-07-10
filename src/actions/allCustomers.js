import * as api from '../api';

export const getAllCustomers = () => async (dispatch) => {
    try {
      const { data } = await api.getAllCustomers(); //API CALL
      dispatch({ type: 'ALL_CUSTOMERS', data: data.body.customer});
    } catch (error) {
      console.log(error);
    }
  };

// export const getCustomerDetails = (id) => async (dispatch) => {
//   try{
//     const {data} = await api.getCustomerDetails(id);
//     console.log("customer Data",data);
//     dispatch({type:"CUSTOMER_DETAILS",data: data.body.customer});
//     console.log(data.body);
//   }catch(error){
//     console.log(error);
//   }
// }