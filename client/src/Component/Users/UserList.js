import React from 'react';
import { ErrorDiv } from '../Others/LoadingDiv';
import {withRouter} from 'react-router';

const ImagesArray=[
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmG24ZFVDDTj4d6UNExPAXeyaPj3Lo-iTsmptqsYAt-mWLb43dZg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSauyhcsm9yWY0lkbr3rOvY-fRHsQPf_tdSlXQBOorhL35rh9ZZ",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdoL33f1ZeosvURHSce94emZyDPISvEs8Q78cXOXuOFdz1YcO_AA",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpnYsdCkZvI4Qm1FNc6_8jQhHkMNG4fuLq6ibiR__kvTcYDaJZ"
]
const getRandomImage=(ImagesArray)=>{
    return ImagesArray[Math.floor(Math.random()*ImagesArray.length)]
}
const UserList=(props)=>{
    console.log(props.history)
    return(        
        props.users.length > 0 ?
        props.users.map((el,index)=>{
            return <User user={el} history={props.history} />
        }) : <ErrorDiv header="No data available !!" body="There are no users available to view at this moment." />
    )
}


const User=(props)=>{
    return(
        <div className="col-sm-6 col-md-2" style={{padding:'2%'}}>
        <div className="">
        <img title="View Likes" style={{cursor:'pointer'}} onClick={(e)=>handleImageClick(e,props.user,props.history)} 
            className="img-circle img-responsive" src={getRandomImage(ImagesArray)} alt="..." />
        <div className="caption text-center">
            <h3>{props.user}</h3>           
        </div>
        </div>
    </div>
    )
}

const handleImageClick=(e,username,history)=>{
 console.log('username : ',username+' ,image : ',e.target.src);
 history.push('/profiles/'+username);
}

export default withRouter(UserList);