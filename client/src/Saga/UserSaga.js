import {put,call,takeLatest} from 'redux-saga/effects';
import * as Service from '../Service/Users';
import * as Action from '../Actions/Users';
import * as Types from '../Constants/Users';
import history from '../Config/history';

function* FetchUsers(){
    try{
        const response = yield call(Service.FetchUsers);
        const users = response.data.data;
        yield put(Action.FetchUserSuccess(users))
    }
    catch(error){
        if(error.response){
            if(error.response.status === 401){
                yield put(Action.FetchUserError(error.response.data.msg));
                localStorage.removeItem('token');
                history.push('/');
            }
        }
        else{
            yield put(Action.FetchUserError("Error occured, Please try again later."))
        }
    }
}

function* FetchUserLikeSaga(action){
    try{
        const response = yield call(Service.FetchUserLikes,action.username);
        const user_likes = response.data.data;
        yield put(Action.FetchUserLikesSuccess(user_likes));
    }
    catch(error){
        if(error.response){
            if(error.response.status === 404){
                yield put(Action.FetchUserLikesError(error.response.data.msg));
                history.push('/not-found');
            }
            else if(error.response.status === 401){
                yield put(Action.FetchUserLikesError(error.response.data.msg));
                localStorage.removeItem('token');
                history.push('/');
            }
            else{
                yield put(Action.FetchUserLikesError(error.response.data.msg));
            }
        }
        else{
            yield put(Action.FetchUserLikesError("Error occured , Please try again."));
        }
    }
}
export function* UserWatcher(){
    yield takeLatest(Types.FETCH_USERS_REQUEST,FetchUsers);
    yield takeLatest(Types.FETCH_USERS_LIKES,FetchUserLikeSaga);
}