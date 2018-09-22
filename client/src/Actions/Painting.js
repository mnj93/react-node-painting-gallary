import * as Types from '../Constants/Painting';

export const LikePaintingRequest=(painting_id)=>{
    return{
        type:Types.LIKE_PAINTING,
        painting_id
    }
}

export const LikePaintingSuccess=(painting_id,msg)=>{
    return{
        type:Types.LIKE_PAINTING_SUCCESS,
        painting_id,
        msg
    }
}

export const LikePaintingError=(error)=>{
    return{
        type:Types.LIKE_PAINTING_ERROR,
        error
    }
}

export const FetchPaintingRequest=(username)=>{
    return{
        type:Types.FETCH_PAINTING_REQUEST   ,
        username 
    }
}
export const FetchPaintingSuccess=(paintings,username)=>{
    return{
        type:Types.FETCH_PAINTING_SUCCESS,
        paintings,
        username
    }
}
export const FetchPaintingError=(error)=>{
    return{
        type:Types.FETCH_PAINTING_ERROR,
        error
    }
}

export const FetchSinglePaintingRequest=(painting_id)=>{
    return{
        type : Types.FETCH_PAINTING_DETAILS_REQUEST,
        painting_id
    }
}
export const FetchSinglePaintingSuccess=(painting)=>{
    return{
        type : Types.FETCH_PAINTING_DETAILS_SUCCESS,
        painting
    }
}
export const FetchSinglePaintingError=(error)=>{
    return{
        type : Types.FETCH_PAINTING_DETAILS_ERROR,
        error
    }
}

export const UpdatePaintingRequest=(data,painting_id)=>{
    return{
        type : Types.UPDATE_PAINTING_DETAILS_REQUEST,
        painting_id,
        data
    }
}
export const UpdatePaintingSuccess=(msg)=>{
    return{
        type : Types.UPDATE_PAINTING_DETAILS_SUCCESS,
        msg
    }
}
export const UpdatePaintingError=(error)=>{
    return{
        type : Types.UPDATE_PAINTING_DETAILS_ERROR,
        error
    }
}

export const DeletePaintingRequest=(painting_id)=>{
    return{
        type : Types.DELETE_PAINTING_DETAILS_REQUEST,
        painting_id        
    }
}
export const DeletePaintingSuccess=(msg)=>{
    return{
        type : Types.DELETE_PAINTING_DETAILS_SUCCESS,
        msg
    }
}
export const DeletePaintingError=(error)=>{
    return{
        type : Types.DELETE_PAINTING_DETAILS_ERROR,
        error
    }
}