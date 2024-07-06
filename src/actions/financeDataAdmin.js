import * as api from "../api";

export const financeDataAdmin = (username) => async (dispatch) => {
    try{
        const { data } = await api.financeAdmin(username);
        dispatch({ type: 'FINANCE_DATA_ADMIN', data: data.body?.["admin details"]});
        console.log(data.body);
    }catch(error){
        if( error?.response?.data?.message == 'Invalid token'){
            dispatch({ type: 'SIGNOUT'});
          }
        console.log(error)
    }
}