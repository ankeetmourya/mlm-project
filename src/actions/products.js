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
            selectedProduct.rclevel7,
            selectedProduct.rclevel8,
            selectedProduct.rclevel9,
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

  
  
  export const editProductAction = (product, navigate) => async (dispatch) => {
    try {
        const cmLevelsArray = [
          product.cmlevel1,
          product.cmlevel2,
          product.cmlevel3,
          product.cmlevel4,
          product.cmlevel5,
          product.cmlevel6,
          ];
      
          const rcLevelsArray = [
            product.rclevel1,
            product.rclevel2,
            product.rclevel3,
            product.rclevel4,
            product.rclevel5,
            product.rclevel6,
          ];
          let productData = {...product,'commission':cmLevelsArray,'repurchase_commission':rcLevelsArray}
          console.log(productData);
      let reqBody = {product:productData}
      const { data } = await api.editProduct(reqBody); //API CALL
      console.log('res edit', data);
      if( data?.response?.data?.message == 'Invalid token'){
        dispatch({ type: 'SIGNOUT'});

      }else{
        dispatch({ type: 'ADD_PRODUCT', data: data.body["productdetails"]});

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
 
 
export const deleteProductAction = (product, navigate) => async (dispatch) => {
  try {
        let productData = {...product}
        console.log("data product", productData);
    let reqBody = {product:productData}
    const { data } = await api.editProduct(reqBody); //API CALL
    console.log('delete data', data);
    if( data?.response?.data?.message == 'Invalid token'){
      dispatch({ type: 'SIGNOUT'});
    }else{
      dispatch({ type: 'DELETE_PRODUCT', data: data?.body?.productdetails?.id});
    }
  } catch (error) {
    if( error?.response?.data?.message == 'Invalid token'){
      dispatch({ type: 'SIGNOUT'});

    }
    console.log(error);
  }
};