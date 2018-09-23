import axios from 'axios';
import { API_URL } from '../Config/config';

export const FetchUsers=()=>{
    return axios.get(API_URL+'/users')
}

export const FetchUserLikes=(username)=>{
    return axios.get(API_URL+'/users/'+username+'/likes')
}