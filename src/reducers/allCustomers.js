export default (state = [], action) => {
    switch (action.type) {
      case "ALL_CUSTOMERS":
        return [...action?.data ];
      default:
        return state;
    }
  };