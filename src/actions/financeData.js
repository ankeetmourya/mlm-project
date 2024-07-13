import * as api from "../api";

export const financeData = (username) => async (dispatch) => {
    try{
        const { data } = await api.finance(username);
        dispatch({ type: 'FINANCE_DATA', data: data.body});
        console.log(data,"Heyyy Data")
    }catch(error){
        if( error?.response?.data?.message == 'Invalid token'){
            dispatch({ type: 'SIGNOUT'});
          }
        console.log(error)
    }
}
