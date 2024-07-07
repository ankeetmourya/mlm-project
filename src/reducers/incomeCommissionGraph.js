export default (state = {}, action) => {
    switch (action.type) {
        case "INCOME_COMMISSION_GRAPH":
          return {...action?.data};
      default:
        return state;
    }
  };
  