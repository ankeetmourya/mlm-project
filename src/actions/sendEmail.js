import * as api from '../api'

export const sendEmail = (username,email,customerName) => async (dispatch)=>{
    try{
        const payload = {
            username: username,
            customerEmail: email,
            customerName: customerName
        }
        const {data} = await api.sendEmail(payload);
        dispatch({ type: "SEND_EMAIL", data: data.body});
    }catch(error){
        if (error?.response?.data?.message == "Invalid token") {
            dispatch({ type: "SIGNOUT" });
          }
        console.log(error)
    }
}