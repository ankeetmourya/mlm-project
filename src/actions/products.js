import * as api from '../api';
import {  signout, signupAction } from './auth';

export const addProduct = (selectedProduct, navigate) => async (dispatch) => {
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
      
      if( data?.response?.data?.message == 'Invalid token'){
        dispatch({ type: 'SIGNOUT'});

      }else{
        dispatch({ type: 'ADD_PRODUCT', data: data.body["prodcutdetails: "]});

      }
    } catch (error) {
      if( error?.response?.data?.message == 'Invalid token'){
        dispatch({ type: 'SIGNOUT'});

      }
      console.log(error);
    }
  };

export const productList = (navigate) => async (dispatch) =>{
     try{
        // let reqBody = {productData:productData}
        const { data } = await api.getProduct(); //API CALL
        console.log('prodts', data);
        if( data?.response?.data?.message == 'Invalid token'){
          dispatch({ type: 'SIGNOUT'});
          
        }else{
        dispatch({ type: 'ALL_PRODUCTS', data: data?.body?.productslist});
        console.log('vt',data.body.productslist);

        }
     }catch(error){
        console.log(error);
        if( error?.response?.data?.message == 'Invalid token'){
          dispatch({ type: 'SIGNOUT'});
        }
     }
}
 