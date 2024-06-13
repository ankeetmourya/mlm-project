export default (state = { allProducts: null }, action) => {
    switch (action.type) {
      case "ALL_PRODUCTS":
        return { ...state, allProducts: action?.data };
      default:
        return state;
    }
  };