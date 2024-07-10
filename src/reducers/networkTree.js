export default (state = {}, action) => {
    switch (action.type) {
      case "NETWORK_TREE":
        return { ...action?.data };
      default:
        return state;
    }
  };