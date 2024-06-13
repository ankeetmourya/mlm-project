import * as api from '../api';

export const addProduct = (selectedProduct) => async (dispatch) => {
    try {
        const cmLevelsArray = [
            selectedProduct.cmlevel1,
            selectedProduct.cmlevel2,
            selectedProduct.cmlevel3,
            selectedProduct.cmlevel4,
            selectedProduct.cmlevel5,
            selectedProduct.cmlevel6,
          ];
      
          const rcLevelsArray = [
            selectedProduct.rclevel1,
            selectedProduct.rclevel2,
            selectedProduct.rclevel3,
            selectedProduct.rclevel4,
            selectedProduct.rclevel5,
            selectedProduct.rclevel6,
          ];
          let productData = {...selectedProduct,'commission':cmLevelsArray,'repurchase_commission':rcLevelsArray}
          console.log(productData);
      let reqBody = {productData:productData}
      const { data } = await api.addProduct(reqBody); //API CALL
      //dispatch({ type: 'REGISTERCUSTOMER', data: data});
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

export const productList = () => async (dispatch) =>{
     try{
        // let reqBody = {productData:productData}
        const { data } = await api.getProduct(); //API CALL
        dispatch({ type: 'ALL_PRODUCTS', data: data.body.productslist});
        
     }catch(error){
        console.log(error);
     }
} 