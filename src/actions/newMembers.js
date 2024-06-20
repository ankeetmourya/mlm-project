import * as api from '../api';

export const newMembers = () => async (dispatch) =>{
    try{
       const { data } = await api.getNewJoinedMembers(); //API CALL
       console.log('newMembers', data);
       if( data?.response?.data?.message == 'Invalid token'){
         dispatch({ type: 'SIGNOUT'});
         
       }else{
       dispatch({ type: 'NEW_JOINED_MEMBERS', data: data?.body?.newcustomers});
       console.log('newMembers111',data.body.newcustomers);

       }
    }catch(error){
       console.log(error);
       if( error?.response?.data?.message == 'Invalid token'){
         dispatch({ type: 'SIGNOUT'});
       }
    }
}