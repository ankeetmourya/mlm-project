export default (state = [], action) => {
    switch (action.type) {
      case "ORDER_HISTORY":
        return [...action?.data ];
        case "ORDER_UPDATE_HISTORY":
          const updatedData = state.find(({purchase_id,customer_id})=>
            purchase_id == action.data.purchase_id && customer_id == action.data.customer_id )
          const filteredData = state.filter(({purchase_id,customer_id})=>
           purchase_id !== action.data.purchase_id && customer_id !== action.data.customer_id )
            updatedData.deliver_status = action.data.deliver_status
          return [updatedData,...filteredData];
      default:
        return state;
    }
  };