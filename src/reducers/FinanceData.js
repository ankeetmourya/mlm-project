export default (state = {}, action) => {
    switch (action.type) {
      case "FINANCE_DATA":
        return { ...action?.data };
      default:
        return state;
    }
  };
  