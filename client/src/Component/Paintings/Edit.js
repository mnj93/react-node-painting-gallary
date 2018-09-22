import React from 'react';
import Navbar from '../Layout/Navbar';
import EditForm from './EditForm';


const EditPainting=(props)=>{
    return(
        <div>
            <Navbar />
            <EditForm params={props.match.params} />
        </div>
    )
}

export default EditPainting