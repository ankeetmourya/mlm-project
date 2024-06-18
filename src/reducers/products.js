export default (state = { allProducts: [] }, action) => {
    switch (action.type) {
      case "ALL_PRODUCTS":
        return { ...state, allProducts: action?.data };
        case "ADD_PRODUCT":
          console.log("ADD_PRODUCT", action?.data);
          let filteredProducts = state.allProducts.filter(({id})=>id!=action.data.id);
          return { ...state, allProducts: [action?.data, ...filteredProducts] };
          case "DELETE_PRODUCT":
            let products = state.allProducts.filter(({id})=>id!=action.data)
            return {...state,allProducts: [...products]}
      default:
        return state;
    }
  };