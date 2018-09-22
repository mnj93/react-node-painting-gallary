import * as Types from '../Constants/Auth';

export default function Auth(state={},action){
    switch(action.type){
        case Types.REQUEST_LOGIN : 
        return{
            ...state,
            loading:true
        }
        case Types.REQUEST_LOGIN_SUCCESS : 
        return{
            ...state,
            loading : false,
            user : action.user
        }
        case Types.REQUEST_LOGIN_ERROR : 
        return{
            ...state,
            loading:false,
            error : action.error
        }
        case Types.REQUEST_LOGOUT : 
        return{
            ...state,
            loading:true
        }
        case Types.REQUEST_LOGOUT_SUCCESS : 
        return{
            ...state,           
            user : '',
            loading:false
        }   
        default : return state
    }
}