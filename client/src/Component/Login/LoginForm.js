import React from 'react';
import Validator from 'validator';
import InlineError from '../Others/InlineError';
import PropTypes from 'prop-types';
import { UserLoginRequest } from '../../Actions/Auth';
import {connect} from 'react-redux';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data :{
                username:''               
            },
          loading :false,
          errors:{}
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        // this.handleFormSubmit = this.handleFormSubmit.bind(this);
    } 
    onSubmit = (e)=>{
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});    
        if(Object.keys(errors).length === 0){
            const user = {user_name : this.state.data.username}
           this.props.login(user);
        }
    }
    
    validate = (data) =>{
        const errors={};
        if(!data.username) errors.username = "Please enter your user name";    
        return errors;
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.user && nextProps.user.token){
            this.setState({
                data:{
                    username : ''
                },
                errors:{}
            })
        }
    }
    onChange = e => this.setState({data : {...this.state.data , [e.target.name]:e.target.value }});
    render(){
        const {data,errors,loading} = this.state;
        const usernameClassName = errors.email ? 'form-control is-invalid' : 'form-control'; 
        return(
            <div className="row topRow">       
            <div className="col-md-1"></div>       
            <div className="col-md-10 formDiv">
          <h2 className="text-center" style={{marginBottom:'10%',marginTop:0}}>Login</h2>
            <form onSubmit={this.onSubmit}>              
                       
                {
                    errors.message &&  <div className="alert alert-danger" role="alert">{errors.message}</div>                                            
                }               
                <div className={errors.username ? "form-group has-error":"form-group"}>
                    <label htmlFor="username">Username</label>
                    <input type="username" className={usernameClassName} id="username" aria-describedby="usernameHelp"
                     placeholder="Enter username" name="username" value={data.username} onChange={this.onChange}/>
                    {errors.username && <InlineError text={errors.username} /> }                   
                </div>            
                <div className="text-center">      
                   {
                       this.props.loading ? <button disabled="true" className="btn btn-block btn-default">Please Wait.... <i className="fa fa-spin fa-circle-notch"></i></button>  :        
                       <button className="btn btn-block btn-success" onClick={this.handleFormSubmit}>Submit <i className="fa fa-paper-plane"></i></button>    
                   }                       
                            
                </div>              
            </form>
            </div>           
            <div className="col-md-1"></div>       
            </div>
        );
    }
}

LoginForm.PropTypes = {
    submit : PropTypes.func.isRequired
}
function mapStateToProps(state){
    return{
        loading : state.Auth.loading,
        error : state.Auth.error,
        user : state.Auth.user
    }
}
export default connect(mapStateToProps, {login : UserLoginRequest})(LoginForm);