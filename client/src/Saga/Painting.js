import * as Types from '../Constants/Painting';
import {takeLatest,call,put} from 'redux-saga/effects';
import * as Service from '../Service/Painting';
import * as Action from '../Actions/Painting';
import history from '../Config/history';

export function* FetchPaintings(action){
    try{
        const response = yield call(Service.FetchPaintings);        
        yield put(Action.FetchPaintingSuccess(response.data.data,action.username));
    }
    catch(error){
        if(error.response){
            yield put(Action.FetchPaintingError(error.response.data.msg));
        }else{
            yield put(Action.FetchPaintingError('Some error occured, Please try again later.'));
        }
    }
}

export function* LikePaintings(action){
    try{
        const response = yield call(Service.LikePainting,action.painting_id);
        //console.log('painting id in saga :',action.painting_id);
        yield put(Action.LikePaintingSuccess(action.painting_id,response.data.msg));
    }
    catch(error){
        if(error.response){
            if(error.response.status === 401){
                localStorage.removeItem('token');
                yield put(Action.LikePaintingError('Session expired! Please login and try again.'));
                history.push('/');
            }
            else{
                yield put(Action.LikePaintingError(error.response.data.msg));
            }            
        }else{
            yield put(Action.LikePaintingError('Some error occured, Please try again later.'));
        }
    }
}

export function* FetchPaintingDetails(action){
    try{
        const response = yield call(Service.FetchPaintingDetails,action.painting_id);
        //console.log('painting id in saga :',action.painting_id);
        yield put(Action.FetchSinglePaintingSuccess(response.data.data));
    }
    catch(error){
        if(error.response){
            if(error.response.status === 404){                
                yield put(Action.FetchSinglePaintingError('Resource not found.'));
                history.push('/not-found');
            }
            else{
                yield put(Action.FetchSinglePaintingError(error.response.data.msg));
            }            
        }else{
            yield put(Action.FetchSinglePaintingError('Some error occured, Please try again later.'));
        }
    }
}
function* UpdatePaintingSaga(action){
    try{
        const response = yield call(Service.UpdatePainting,action.data,action.painting_id);
        //console.log('painting id in saga :',action.painting_id);
        yield put(Action.UpdatePaintingSuccess(response.data.msg));
        history.push('/dashboard');
    }
    catch(error){
        if(error.response){
            if(error.response.status === 404){                
                yield put(Action.UpdatePaintingError('Resource not found.'));
                history.push('/not-found');
            }
            else{
                yield put(Action.UpdatePaintingError(error.response.data.msg));
            }            
        }else{
            yield put(Action.UpdatePaintingError('Some error occured, Please try again later.'));
        }
    }
}
function* DeletePaintingSaga(action){
    try{
        const response = yield call(Service.DeletePainting,action.painting_id);
        //console.log('painting id in saga :',action.painting_id);
        yield put(Action.DeletePaintingSuccess(response.data.msg));
        //history.push('/dashboard');
    }
    catch(error){
        if(error.response){
            if(error.response.status === 404){                
                yield put(Action.DeletePaintingError('Resource not found.'));
                history.push('/not-found');
            }
            else{
                yield put(Action.DeletePaintingError(error.response.data.msg));
            }            
        }else{
            yield put(Action.DeletePaintingError('Some error occured, Please try again later.'));
        }
    }
}
export function* PaintingWatcher(){
    yield takeLatest(Types.FETCH_PAINTING_REQUEST,FetchPaintings);
    yield takeLatest(Types.LIKE_PAINTING,LikePaintings);
    yield takeLatest(Types.FETCH_PAINTING_DETAILS_REQUEST,FetchPaintingDetails);
    yield takeLatest(Types.UPDATE_PAINTING_DETAILS_REQUEST,UpdatePaintingSaga);
    yield takeLatest(Types.DELETE_PAINTING_DETAILS_REQUEST,DeletePaintingSaga);
}