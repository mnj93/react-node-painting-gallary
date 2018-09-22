import {combineReducers} from 'redux';
import Auth from './AuthReducer';
import Painting from './Painting';

export default combineReducers({
    Auth ,
    Paintings : Painting
})
