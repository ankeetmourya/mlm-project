export default function reducer(state = { commisionPayout: [{}] }, action) {
  switch (action.type) {
    case "COMMISSION_REPORT":
      return {
        ...state,
        commisionPayout: action.data || [[]] // Assuming action.data is structured correctly
      };

    default:
      return state;
  }
}
