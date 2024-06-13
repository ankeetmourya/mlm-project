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
    console.log(data.body)
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const signout = (navigate) => async (dispatch) => {
  try {
    
    dispatch({ type: 'SIGNOUT'});
    navigate('/login');
  } catch (error) {
    console.log(error);
  }
};


export const registerCustomer = (userData) => async (dispatch) => {
  try {
    let reqBody = {customer:userData}
    const { data } = await api.registerCustomer(reqBody); //API CALL
    dispatch({ type: 'REGISTERCUSTOMER', data: data});
    console.log(data)
  } catch (error) {
    console.log(error);
  }
};


