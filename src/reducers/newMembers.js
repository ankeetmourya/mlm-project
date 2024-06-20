
export default (state = [], action) => {
    switch (action.type) {
      case "NEW_JOINED_MEMBERS":
        console.log("NEW_JOINED_MEMBERS", action?.data)
        return [...action?.data ];
      default:
        return state;
    }
  };