import * as api from '../api';

export const getUploadImageDetails = (imageId) => async (dispatch) => {
    try {
      const  data  = await api.getUploadImageDetails(imageId); //API CALL
      if( data?.response?.data?.message == 'Invalid token'){
        dispatch({ type: 'SIGNOUT'});
  
      }else{
        dispatch({ type: 'IMAGE_DETAILS', data: data.data});
      }
      return data;
      
    } catch (error) {
      if( error?.response?.data?.message == 'Invalid token'){
        dispatch({ type: 'SIGNOUT'});
  
      }
      console.log(error);
    }
  };