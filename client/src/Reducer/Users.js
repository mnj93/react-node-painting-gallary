import * as Types from '../Constants/Users';
import { combineReducers } from 'C:/Users/OneRoof/AppData/Local/Microsoft/TypeScript/3.0/node_modules/redux';

function User(state={},action){
    switch(action.type){
        case Types.FETCH_USERS_REQUEST : 
        return{
            ...state,
            loading : true
        }
        case Types.FETCH_USERS_SUCCESS : 
        return{
            ...state,
            loading:false,
            users_list : action.users
        }
        case Types.FETCH_USERS_ERROR :
        return{
            ...state,
            loading:false,
            error:action.error
        }
        default : return state
    }
}

function UserLikes(state={},action){
    switch(action.type){
        case Types.FETCH_USERS_LIKES : 
        return{
            ...state,
            loading : true            
        }
        case Types.FETCH_USERS_LIKES_SUCCESS :
        return {
            ...state,
            loading:false,
            user_likes : action.likes,
            error : ''
        }
        case Types.FETCH_USERS_LIKES_ERROR : 
        return {
            ...state,
            loading:false,
            error: action.error
        }
        default:return state;
    }
}

export default combineReducers({
    Userlist : User,
    UserLikes : UserLikes
})