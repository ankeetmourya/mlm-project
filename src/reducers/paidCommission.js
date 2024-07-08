export default (state = {}, action) => {
    switch (action.type) {
        case "PAID_COMMISSION":
          return {...action?.data};
      default:
        return state;
    }
  };
  