import React from 'react';
import PaintingList from './Paintings';
import Navbar from '../Layout/Navbar';

const Dashboard=()=>{
    return(
        <div>
            <Navbar />
            <MainComponent />
        </div>
    )
}

const MainComponent=()=>{
    return(
        <div className="container">
            <PaintingList />
        </div>
    )
}

export default Dashboard;