export default (state = [], action) => {
    switch (action.type) {
      case "HIGH_PERFORMING_CUSTOMER":
        return [...action?.data ];
      default:
        return state;
    }
  };