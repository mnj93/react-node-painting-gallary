import React from 'react';

export const LoadingDiv=(props)=>{
    return(
        <div className="container text-center">
            <h1 style={{marginTop:'5%',fontSize:'35px'}}>
                <i className="fa fa-spin fa-spinner"></i>
            </h1><br/>
            <p style={{fontSize:'30px'}}>Please wait</p>
        </div>
    )
}

export const ErrorDiv=(props)=>{
    return(
        <div className="container text-center">
            <h1 style={{marginTop:'5%',fontSize:'20px'}}>
               {props.header}
            </h1><br/>
            <p style={{fontSize:'16px'}}>{props.body}</p>
        </div>
    )
}