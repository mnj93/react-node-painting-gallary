import React from 'react';
import './Snackbar.css';
const SnackBar = (props)=>{
    return(
        <div id="snackbar" className={props.isVisible?"show":"fadeout"}><div className={props.type}>{props.text}</div></div>
    )
}

export default SnackBar;