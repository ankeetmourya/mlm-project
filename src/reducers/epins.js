
export default (state = { epins:[], epin_added:{} }, action) => {
    switch (action.type) {
      case "FETCH_EPINS":
        return { ...state, epins: action?.data };
       case "ADD_EPINS_SUCCESS":
        console.log('red', action?.data);
        return { ...state, epin_added: action?.data };
        case "CLEAR_EPINS_SUCCESS":
          return { ...state, epin_added:{} };
      default:
        return state;
    }
  };