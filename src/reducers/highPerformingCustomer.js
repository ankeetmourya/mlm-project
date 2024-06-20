export default (state = [], action) => {
    switch (action.type) {
      case "HIGH_PERFORMING_CUSTOMER":
        console.log("HIGH_PERFORMING_CUSTOMER", action?.data);
        return [...action?.data ];
      default:
        return state;
    }
  };