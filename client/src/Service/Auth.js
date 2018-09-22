import axios from 'axios';
import { API_URL } from '../Config/config';

export const UserLogin=(user)=>{
    return axios.post(API_URL+'/auth',user);
}

export const UserLogout=(user)=>{
    //return axios.post(API_URL+'/auth',user);
}