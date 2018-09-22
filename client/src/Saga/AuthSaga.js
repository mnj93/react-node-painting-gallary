import * as Types from '../Constants/Auth';
import {takeLatest,call,put} from 'redux-saga/effects';
import * as Service from '../Service/Auth';
import * as Action from '../Actions/Auth';
import history from '../Config/history';
import setAuthorizationHeader from '../Config/setAuthHeader';

export function* UserLoginSaga(action){
    try{
        const response = yield call(Service.UserLogin,action.user);
        const user = response.data.data;
        localStorage.setItem('token',user.token);
        setAuthorizationHeader(localStorage.token);
        yield put(Action.UserLoginSuccess(user));
    }
    catch(error){
        if(error.response){
            yield put(Action.UserLoginError(error.response.data.msg));
        }
        else{
            yield put(Action.UserLoginError('Some error occured, Please try again later.'));
        }
    }
}
export function* UserLogoutSaga(action){
    try{
         localStorage.removeItem('token');
         yield put(Action.UserLogoutSuccess());
         history.push('/');
    }
    catch(error){
        if(error.response){
            yield put(Action.UserLogoutError(error.response.data.msg));
        }
        else{
            yield put(Action.UserLogoutError('Some error occured, Please try again later.'));
        }
    }
}
export function* UserLoginWatcher(){
    yield takeLatest(Types.REQUEST_LOGIN,UserLoginSaga);
    yield takeLatest(Types.REQUEST_LOGOUT,UserLogoutSaga);
}