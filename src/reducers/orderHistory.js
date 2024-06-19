export default (state = [], action) => {
    switch (action.type) {
      case "ORDER_HISTORY":
        console.log("ORDER_HISTORY", action?.data);
        return [...action?.data ];
      default:
        return state;
    }
  };