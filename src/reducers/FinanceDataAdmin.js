export default (state = {}, action) => {
    switch (action.type) {
        case "FINANCE_DATA_ADMIN" :
            return {...action?.data};
      default:
        return state;
    }
  };
  