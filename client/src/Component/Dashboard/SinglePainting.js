import React from 'react';
 
const PaintingComponent=(props)=>{
    return(
        <div className="col-sm-6 col-md-4">
        <div className="thumbnail">
        <img src={props.painting.image_url} alt="..." />
        <div className="caption">
            <h3>{props.painting.painting_name}</h3>
            <p>...</p>
            <p>
                <div className="row">
                <div className="col-md-4">
                    <a href="" style={{background:'#222222',borderColor:'#222222'}} className="btn btn-primary" title="Edit" onClick={(e)=>props.onEdit(e,props.painting._id)} role="button">
                        <i class="far fa-edit" style={{color:'#fff',fontSize:'14px'}}></i> Edit             
                    </a> 
                </div>   
                <div className="col-md-4 text-center">
                    <i title={"Total "+props.painting.likes+" likes"} className="far fa-heart" style={{fontSize:'20px'}}></i> <span style={{fontSize:'20px'}}>{props.painting.likes}</span>
                </div>               
                 <div className="col-md-4">
                    <a href="" className="btn btn-default pull-right" title="Delete" onClick={(e)=>props.onDelete(e,props.painting._id)} role="button">
                    <i class="far fa-trash-alt" style={{fontSize:'14px',color:'#000'}}></i> Delete             
                    </a>  
                 </div>  
                 </div>                                          
            </p>
        </div>
        </div>
    </div>
    )
}

export default PaintingComponent;