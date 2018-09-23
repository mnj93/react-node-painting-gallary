import * as Types from '../Constants/Painting';
import { combineReducers } from 'C:/Users/OneRoof/AppData/Local/Microsoft/TypeScript/3.0/node_modules/redux';
const initialState = {
    paintings:[],
    beingLiked : [],
    liked:[]
}
const paintingList=[]
for(var i=0;i<13;i++){
    let myobj = {};
    myobj.painting_id = i;
    myobj.painting_name = 'painting '+i;
    myobj.liked_by = [];
    paintingList.push(myobj);
}

function Painting(state={},action){
    switch(action.type){
        case Types.FETCH_PAINTING_REQUEST : 
        return {
            ...state,
            loading :action.query? false : true,            
        }
        case Types.FETCH_PAINTING_SUCCESS:
        const paintings = action.paintings.map((el)=>{
            if(el.liked_by.indexOf(action.username) > -1 && action.username !== ''){
                el.isLiked = true
            }
            else{
                el.isLiked = false;
            }
            return el;
        })
        return{
            ...state,
            loading :false,
            paintings: paintings
        }
        case Types.FETCH_PAINTING_ERROR:
        return{
            ...state,
            loading :false,
            error : 'Unable to fetch paintings from server.'
        }
        case Types.LIKE_PAINTING :   
        const newState1 = state;
        const updatedList =  newState1.paintings.map((el)=>{
            if(el._id === action.painting_id){
                el.isProcessing = true;                
            }
            return  el;
        })  
        return {
            ...state,
            paintings : updatedList                      
        }
        case Types.LIKE_PAINTING_SUCCESS : 
        const newState2 = state;
        const updatedList2 =  newState2.paintings.map((el)=>{
            if(el._id === action.painting_id){
                el.isProcessing = false;
                el.isLiked = !el.isLiked; 
                el.likes = !el.isLiked ? el.likes-1 : el.likes +1              
            }
            return  el;
        })  
        return{
            ...state,
            paintings : updatedList2,
            paintingLikeSuccess : action.msg         
        }
        case Types.LIKE_PAINTING_ERROR : 
        const newState3 = state;
        const updatedList3 =  newState3.paintings.map((el)=>{
            if(el._id === action.painting_id){
                el.isProcessing = false;               
            }
            return  el;
        })  
        return{
            ...state  ,
            likePaintingError :  action.error ,
            paintings : updatedList3  
        }
        default : return state;
    }
}

function PaintingDetails(state={},action){
    switch(action.type){
        case Types.FETCH_PAINTING_DETAILS_REQUEST : 
        return{
            ...state,
            loading : true
        }
        case Types.FETCH_PAINTING_DETAILS_SUCCESS : 
        return{
            ...state,
            loading:false,
            painting:action.painting
        }
        case Types.FETCH_PAINTING_DETAILS_ERROR : 
        return{
            ...state,
            loading:false,
            error : action.error
        }
        case Types.UPDATE_PAINTING_DETAILS_REQUEST : 
        return{
            ...state,
            loading : true
        }
        case Types.UPDATE_PAINTING_DETAILS_SUCCESS : 
        return{
            ...state,
            loading:false,
            msg : action.msg
        }
        case Types.UPDATE_PAINTING_DETAILS_ERROR : 
        return{
            ...state,
            loading:false,
            error : action.error
        }
        case Types.DELETE_PAINTING_DETAILS_REQUEST : 
        return{
            ...state,
            delete_loading : true,
            delete_success : false
        }
        case Types.DELETE_PAINTING_DETAILS_SUCCESS : 
        return{
            ...state,
            delete_loading:false,
            msg : action.msg,
            delete_success : true
        }
        case Types.DELETE_PAINTING_DETAILS_ERROR : 
        return{
            ...state,
            delete_loading:false,
            error : action.error,
            delete_success : false
        }
        default : return state
    }
}

export default combineReducers({
    Painting,
    PaintingDetails
})