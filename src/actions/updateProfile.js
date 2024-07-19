export const updateProfile = (data) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_PROFILE', data: data});
    } catch (error) {
      console.log(error);
    }
  };