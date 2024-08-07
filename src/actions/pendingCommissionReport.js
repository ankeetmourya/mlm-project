import * as api from '../api';

export const pendingcommission = (username) => async (dispatch) => {
    try {
      const { data } = await api.pendingCommissionReport(username); //API CALL
      dispatch({ type: 'COMMISSION_REPORT', data: data.body});
    } catch (error) {
      console.log(error);
    }
  };