export default (state = { authData: null }, action) => {
    switch (action.type) {
      case "AUTH":
        localStorage.setItem("user", JSON.stringify({ ...action?.data}));
        return { ...state, authData: action?.data };
      case "SIGNOUT":
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
        return { ...state, authData: null };
        case "REGISTERCUSTOMER":
          return { ...state, registerCustomer: action?.data };
          case "SYNC_USER":
          return { ...state, authData: action?.data };
          case "SET_ROLE":
            localStorage.setItem("userRole", JSON.stringify(action?.data));
          return { ...state, userRole: action?.data };
          case "UPDATE_PROFILE":
            localStorage.setItem("user", JSON.stringify({...state.authData ,...action.data}));
            return { ...state, authData: {...state.authData ,...action.data} };
          
      default:
        return state;
    }
  };