import * as api from "../api";

export const updateCommission = (username,amount) => async (dispatch) => {
  try {
    let payload = {
      customer_details: {
        username: username,
        amount_paid: amount,
      },
    };

    // Call API to update commission
    const { data } = await api.updateCommission(payload);
    console.log('updateCommission response:', data);
    if (data?.response?.data?.message === 'Invalid token') {
      dispatch({ type: 'SIGNOUT' }); 
    }
  } catch (error) {
    console.error('Error updating commission:', error);
    if (error?.response?.data?.message === 'Invalid token') {
      dispatch({ type: 'SIGNOUT' }); // Dispatch signout action if token is invalid
    }
    throw error;
  }
};
