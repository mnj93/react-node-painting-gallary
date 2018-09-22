import React from 'react';
 
const SinglePainting=(props)=>{
    return(
        <div className="col-sm-6 col-md-4">
        <div className="thumbnail">
        <img src={props.painting.image_url} alt="..." />
        <div className="caption">
            <h3>{props.painting.painting_name}</h3>
            <p>...</p>
            <p>                            
                    <a href="" title="Like" onClick={(e)=>props.onLike(e,props.painting._id)} className="" role="button">
                     <i class={props.painting.isLiked ?"fas fa-heart": "far fa-heart"} style={{color:'#000',fontSize:'20px'}}></i>                    
                     </a> <span>{props.painting.likes}</span>                     
            </p>
        </div>
        </div>
    </div>
    )
}

export default SinglePainting;