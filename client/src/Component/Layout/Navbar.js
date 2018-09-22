import React from 'react';
import {connect} from 'react-redux';
import { UserLogoutRequest } from '../../Actions/Auth';
import LoginModal from '../Login/LoginModal';

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen : false
        }
    }
    handleLogout=(e)=>{
        e.preventDefault();
        this.props.logout();
    }
    handleLogin=(e)=>{
        e.preventDefault();
        this.setState({
            isModalOpen :true
        });
    }
    handleModalClose=(e)=>{
        e.preventDefault();
        this.setState({
            isModalOpen:false
        });
    }
    render(){
        return(
            <div id="home">
            <nav id="nav" className="navbar navbar-inverse">
            <div className="container">
                <div className="navbar-header">
                
                    <div className="navbar-brand">
                        <a href="/" style={{color:'#fff',textDecoration:'none'}}>
                            Navbar
                        </a>
                    </div>        
                    <div className="nav-collapse">
                        <span></span>
                    </div>            
                </div>
                <ul className="main-nav nav navbar-nav navbar-right">
                    <NavItem path="/" name="Home" /> 
                    {
                        this.props.isAuthenticated && <NavItem path="dashboard" name="Dashboard" />
                    }
                    {
                        this.props.isAuthenticated ? <NavItem onClick={(e)=>this.handleLogout(e)} path="logout" name="Logout" /> : 
                        <NavItem onClick={(e)=>this.handleLogin(e)} path="" name="Login" />		
                    }     
                    
                </ul>		
            </div>
        </nav>
            {
                !this.props.isAuthenticated && <LoginModal isOpen={this.state.isModalOpen} onModalClose={this.handleModalClose} />
            }  
        </div>
        )
    }
}

const NavItem = props => {
    const pageURI = window.location.pathname+window.location.search
  const liClassName = (props.path === pageURI) ? "active" : "";
 
    return (
      <li className={liClassName}>       
          <a onClick={props.onClick} href={props.path}>
        {props.name}       
      </a>
      </li>
    );
  }

function mapStateToProps(state){
    return{
        isAuthenticated : !!state.Auth.user
    }
}

  export default connect(mapStateToProps,{logout : UserLogoutRequest})(Navbar);