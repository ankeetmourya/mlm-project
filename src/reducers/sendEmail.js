export default  (state = {}, action) =>{
    switch(action.type){
        case "SEND_EMAIL":
            return { ...state, sendEmail: action?.data };
            default:
        return state;
    }
}