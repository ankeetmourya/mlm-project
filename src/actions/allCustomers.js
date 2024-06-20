import * as api from '../api';

export const getAllCustomers = () => async (dispatch) => {
    try {
      const { data } = await api.getAllCustomers(); //API CALL
      console.log("get CS data",data);
      dispatch({ type: 'ALL_CUSTOMERS', data: data.body.customer});
      console.log(data.body)
    } catch (error) {
      console.log(error);
    }
  };