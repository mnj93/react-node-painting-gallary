import axios from 'axios';
import { API_URL } from '../Config/config';

export const FetchPaintings=(q)=>{
    if(q){
        return axios.get(API_URL+'/paintings?q='+q);
    }
    else{
        return axios.get(API_URL+'/paintings');
    }
}
export const LikePainting=(painting_id)=>{
    return axios.post(API_URL+'/paintings/'+painting_id+'/like');
}

export const FetchPaintingDetails=(painting_id)=>{
    return axios.get(API_URL+'/paintings/'+painting_id);
}

export const UpdatePainting =(data,painting_id)=>{
    const formData = new FormData();
    formData.append('cover_image',data.cover_image);
    formData.append('painting_name',data.painting_name);
    formData.append('painting_desc',data.painting_desc);
    const config = {
        headers:{
            'content-type':'multipart/form-data'
        }
    }
    return axios.post(API_URL+'/paintings/'+painting_id+'/update',formData,config);
}

export const DeletePainting =(painting_id)=>{   
    return axios.post(API_URL+'/paintings/'+painting_id+'/delete');
}