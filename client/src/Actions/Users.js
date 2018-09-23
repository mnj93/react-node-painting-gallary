import * as Types from '../Constants/Users';

export const FetchUsersRequest=()=>{
   return{
       type : Types.FETCH_USERS_REQUEST
   }
}
export const FetchUserSuccess=(users)=>{
    return{
        type : Types.FETCH_USERS_SUCCESS,
        users
    }
 }
 export const FetchUserError=(error)=>{
    return{
        type : Types.FETCH_USERS_ERROR,
        error
    }
 }
 export const FetchUserLikesRequest=(username)=>{
    return{
        type : Types.FETCH_USERS_LIKES,
        username
    }
 }
 export const FetchUserLikesSuccess=(likes)=>{
     return{
         type : Types.FETCH_USERS_LIKES_SUCCESS,
         likes
     }
  }
  export const FetchUserLikesError=(error)=>{
     return{
         type : Types.FETCH_USERS_LIKES_ERROR,
         error
     }
  }