import * as api from '../api';

export const getAllCustomers = () => async (dispatch) => {
    try {
      const { data } = await api.getAllCustomers(); //API CALL
      dispatch({ type: 'ALL_CUSTOMERS', data: data.body.customer});
    } catch (error) {
      console.log(error);
    }
  };
