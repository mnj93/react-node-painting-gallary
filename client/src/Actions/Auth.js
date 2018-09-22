import * as Types from '../Constants/Auth';

export const UserLoginRequest=(user)=>{
 return{
     type : Types.REQUEST_LOGIN,
     user
 }
}

export const UserLoginSuccess=(user)=>{
    return{
        type : Types.REQUEST_LOGIN_SUCCESS,
        user
    }
}

export const UserLoginError=(error)=>{
    return{
        type : Types.REQUEST_LOGIN_ERROR,
        error
    }
}

export const UserLogoutRequest=()=>{
    return{
        type : Types.REQUEST_LOGOUT        
    }
   }
   
   export const UserLogoutSuccess=()=>{
       return{
           type : Types.REQUEST_LOGOUT_SUCCESS         
       }
   }
   
   export const UserLogoutError=(error)=>{
       return{
           type : Types.REQUEST_LOGOUT_ERROR,
           error
       }
   }
