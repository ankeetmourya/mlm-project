export default (state = { orderHistory: [] }, action) => {
    switch (action.type) {
      case "ORDER_HISTORY":
        console.log("ORDER_HISTORY", action?.data);
        return { ...state, orderHistory: action?.data };
      default:
        return state;
    }
  };