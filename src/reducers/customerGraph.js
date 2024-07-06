export default (state = {}, action) => {
    switch (action.type) {
      case "CUSTOMER_GRAPH":
        return {...action?.data};
      default:
        return state;
    }
  };
  