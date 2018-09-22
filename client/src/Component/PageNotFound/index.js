import React from 'react';
import Navbar from '../Layout/Navbar';

const PageNotFound=()=>{
    return(
        <div>
            <Navbar />
            <div className="container text-center">
                <h1 style={{marginTop:'5%',fontSize:'45px'}}>404</h1><br/>
                <p style={{fontSize:'35px'}}>Page Not Found!!</p>
            </div>
        </div>
    )
}

export default PageNotFound;