export default (state = { adminReports:{} }, action) => {
    switch (action.type) {
      case "ADMIN_REPORTS":
        return { ...state, adminReports: action?.data };
       
      default:
        return state;
    }
  };