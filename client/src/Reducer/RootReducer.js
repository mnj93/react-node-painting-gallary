import {combineReducers} from 'redux';
import Auth from './AuthReducer';
import Painting from './Painting';
import User from './Users'
export default combineReducers({
    Auth ,
    Paintings : Painting,
    Users : User
})
