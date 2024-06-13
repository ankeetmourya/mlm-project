export default (state = { authData: null }, action) => {
    switch (action.type) {
      case "AUTH":
        localStorage.setItem("user", JSON.stringify({ ...action?.data}));
        return { ...state, authData: action?.data };
      // case "SIGNUP":
      //   localStorage
      //   return { ...state, authData: action?.data };
      case "SIGNOUT":
        localStorage.removeItem("user");
        return { ...state, authData: null };
        case "REGISTERCUSTOMER":
          return { ...state, registerCustomer: action?.data };
      default:
        return state;
    }
  };