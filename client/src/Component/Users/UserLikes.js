import React from 'react';
import { FetchUserLikesRequest } from '../../Actions/Users';
import { LoadingDiv, ErrorDiv } from '../Others/LoadingDiv';
import {connect} from 'react-redux';

class UserLikes extends React.Component{
    componentDidMount(){
        this.props.fetchUserLikes(this.props.username)
    }
    render(){
        if(this.props.isLoading){
            return <LoadingDiv />
        }
        else if(this.props.error){
            return <ErrorDiv header="Error occured !!" body={this.props.error} />
        }
        else{
            return(
                this.props.user_likes.length > 0 ? 
                this.props.user_likes.map((el,index)=>{
                    return <LikeComponent painting={el} />
                }) :  <ErrorDiv header="No Data Available!!" body={"Looks like "+this.props.username+" did not liked any paintings!"} />
            )            
        }
    }
}

const LikeComponent=(props)=>{
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
                </div>   
                <div className="col-md-4 text-center">
                    <i title={"Total "+props.painting.likes+" likes"} className="far fa-heart" style={{fontSize:'20px'}}></i> <span style={{fontSize:'20px'}}>{props.painting.likes}</span>
                </div>               
                 <div className="col-md-4">                    
                 </div>  
                 </div>                                          
            </p>
        </div>
        </div>
    </div>
    )
}

function mapStateToProps(state){
    return{
        isLoading : state.Users.UserLikes.loading,
        error : state.Users.UserLikes.error,
        user_likes : state.Users.UserLikes.user_likes ? state.Users.UserLikes.user_likes : []
    }
}
export default connect(mapStateToProps,{fetchUserLikes : FetchUserLikesRequest})(UserLikes);