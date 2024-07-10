import * as api from '../api';

export const getAdminReports = (id) => async (dispatch) => {
    try {
      const { data } = await api.getAdminReports(id); //API CALL
      dispatch({ type: 'ADMIN_REPORTS', data: data.body});
    } catch (error) {
      console.log(error);
    }
  };