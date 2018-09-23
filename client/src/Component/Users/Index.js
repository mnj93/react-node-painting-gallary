import React from 'react';
import Navbar from '../Layout/Navbar';
import UserList from './UserList';
import { FetchUsersRequest } from '../../Actions/Users';
import { LoadingDiv, ErrorDiv } from '../Others/LoadingDiv';
import {connect} from 'react-redux';

class Users extends React.Component{
    componentDidMount(){
        this.props.fetchUsers();
    }
    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                <RenderMainContent isLoading={this.props.isLoading} error={this.props.error} users={this.props.users_list} />
                </div>
            </div>
        )
    }    
}

const RenderMainContent=(props)=>{
    if(props.isLoading ){
       return  <LoadingDiv />
    }
    else if(props.error){
       return <ErrorDiv header="Error occured !!" body={props.error} />
    }
    else{
       return <UserList users={props.users} />
    }
}

function mapStateToProps(state){
    return{
        isLoading : state.Users.Userlist.loading,
        error :  state.Users.Userlist.error,
        users_list : state.Users.Userlist.users_list ? state.Users.Userlist.users_list : []
    }
}

export default connect(mapStateToProps, {fetchUsers : FetchUsersRequest})(Users)