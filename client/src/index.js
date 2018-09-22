import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './Saga/RootSaga';
import RootReducer from './Reducer/RootReducer';
import { UserLoginSuccess } from './Actions/Auth';
import setAuthorizationHeader from './Config/setAuthHeader';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(RootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)));
if(process.env.NODE_ENV === "production"){   
     store = createStore(RootReducer,
        (applyMiddleware(sagaMiddleware)));
    }

sagaMiddleware.run(rootSaga);

if(localStorage.token){
    const user = {token : localStorage.token}
    store.dispatch(UserLoginSuccess(localStorage.token));
    setAuthorizationHeader(localStorage.token);
}

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>
, document.getElementById('app'));
unregister();
