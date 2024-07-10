
export default (state = [], action) => {
    switch (action.type) {
      case "NEW_JOINED_MEMBERS":
        return [...action?.data ];
      default:
        return state;
    }
  };