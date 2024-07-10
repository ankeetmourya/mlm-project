import * as api from "../api";

export const paidCommission = (username) => async (dispatch) => {
    try {
      const payload = {
        admin_username: username,
      };
      const { data } = await api.paidCommission(payload);
      dispatch({ type: "PAID_COMMISSION", data: data.body});
    } catch (error) {
      if (error?.response?.data?.message == "Invalid token") {
        dispatch({ type: "SIGNOUT" });
      }
      console.log(error);
    }
  };