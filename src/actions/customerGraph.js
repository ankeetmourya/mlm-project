import * as api from "../api";

export const customerGraph = (username) => async (dispatch) => {
  try {
    const payload = {
      admin_username: username,
    };
    const { data } = await api.customerGraph(payload);
    dispatch({ type: "CUSTOMER_GRAPH", data: data.body });
    console.log(data.body);
  } catch (error) {
    if (error?.response?.data?.message == "Invalid token") {
      dispatch({ type: "SIGNOUT" });
    }
    console.log(error);
  }
};

