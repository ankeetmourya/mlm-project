import * as api from '../api';

//Action Creator
export const signupAction = (userData, navigate) => async (dispatch) => {
  try {
    let reqBody = {registrationdetails:userData}
    const { data } = await api.signup(reqBody); //API CALL
    // dispatch({ type: 'AUTH', data: data });
    navigate('/login');
  } catch (error) {
    console.log(error);
  }
};

export const signin = (userData,role, navigate) => async (dispatch) => {
  try {
    const reqBody = {logindetails:userData}
    const { data } = await api.signin(reqBody,role); //API CALL
    dispatch({ type: 'AUTH', data: data.body});
    navigate('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

export const syncUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'SYNC_USER', data: userData});
  } catch (error) {
    if( error.response.data.message == 'Invalid token'){
      signout(navigate)
    }
    console.log(error);
  }
};


export const signout = (navigate) =>  (dispatch) => {
  try {
    dispatch({ type: 'SIGNOUT'});
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const setRole = (role) =>  (dispatch) => {
  try {
    dispatch({ type: 'SET_ROLE', data: role});
  } catch (error) {
    console.log(error);
  }
};


export const registerCustomer = (userData, navigate) => async (dispatch) => {
  try {
    let reqBody = {customer:userData}
    const  data  = await api.registerCustomer(reqBody); //API CALL
    if( data?.response?.data?.message == 'Invalid token'){
      dispatch({ type: 'SIGNOUT'});

    }else{
      dispatch({ type: 'REGISTERCUSTOMER', data: data.data});
    }
    return data;
    
  } catch (error) {
    if( error?.response?.data?.message == 'Invalid token'){
      dispatch({ type: 'SIGNOUT'});

    }
    console.log(error);
  }
};

export const imageUpload = (imageData, navigate) => async (dispatch) => {
  try {
    const  data  = await api.imageUpload(imageData); //API CALL
    if( data?.response?.data?.message == 'Invalid token'){
      dispatch({ type: 'SIGNOUT'});

    }else{
      dispatch({ type: 'UPLOAD_IMAGE', data: data.data});
    }
    console.log("UPLOAD_IMAGE data ", data)
    return data;
    
  } catch (error) {
    if( error?.response?.data?.message == 'Invalid token'){
      dispatch({ type: 'SIGNOUT'});

    }
    console.log(error);
  }
};
