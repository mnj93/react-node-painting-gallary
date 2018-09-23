import React from 'react';
import Navbar from '../Layout/Navbar';
import {withRouter} from 'react-router';
import { decode } from 'punycode';
import UserLikes from './UserLikes';


const UserProfile = (props)=>{
    const username = props.match.params.username;
    //const query_values = (props.location.search);    
    return(
        <div>
            <Navbar />     
            <div className="container">
            <ProfileHeader username={username} />
            <UserLikes username={username} />
            </div>
        </div>
    )
}

const ProfileHeader=(props)=>{    
    return(
        <div className="page-header">
           <h3>Paintings liked by {props.username}</h3>
           {/* <img src={props.img} className="img-circle img-responsive pull-right"/> */}
        </div>
    )
}

export default withRouter(UserProfile);