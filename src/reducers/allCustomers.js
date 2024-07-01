export default (state = [], action) => {
    switch (action.type) {
      case "ALL_CUSTOMERS":
        console.log("ALL_CUSTOMERS", action?.data);
        return [...action?.data ];
        // case "CUSTOMER_DETAILS":
        //   console.log("CUSTOMER_DETAILS", action?.data)
        //   return [...action?.data];
      default:
        return state;
    }
  };