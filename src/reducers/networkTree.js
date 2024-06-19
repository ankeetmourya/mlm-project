export default (state = {}, action) => {
    switch (action.type) {
      case "NETWORK_TREE":
        // console.log("NETWORK_TREE", action?.data);
        return { ...action?.data };
      default:
        return state;
    }
  };