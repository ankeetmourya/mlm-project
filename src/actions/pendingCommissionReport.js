import * as api from '../api';

export const pendingcommission = (username) => async (dispatch) => {
    try {
      const { data } = await api.pendindCommissionReport(username); //API CALL
      dispatch({ type: 'COMMISSION_REPORT', data: data.body});
      console.log("hey Body...");
      console.log(data.body)
    } catch (error) {
      console.log(error);
    }
  };