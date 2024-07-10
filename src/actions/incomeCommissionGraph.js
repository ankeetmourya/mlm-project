import * as api from "../api";

export const incomeCommissionGraph = (username) => async (dispatch) => {
    try {
      const payload = {
        admin_username: username,
      };
      const { data } = await api.incomeCommissionGraph(payload);
      dispatch({ type: "INCOME_COMMISSION_GRAPH", data: data.combinedData?.body});
    } catch (error) {
      if (error?.response?.data?.message == "Invalid token") {
        dispatch({ type: "SIGNOUT" });
      }
      console.log(error);
    }
  };