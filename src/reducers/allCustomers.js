export default (state = [], action) => {
    switch (action.type) {
      case "ALL_CUSTOMERS":
        console.log("ALL_CUSTOMERS", action?.data);
        return [...action?.data ];
      default:
        return state;
    }
  };