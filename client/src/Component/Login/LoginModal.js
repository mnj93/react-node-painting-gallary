import React from 'react';
import LoginForm from './LoginForm';
import './modal.css';
const backdropStyle ={
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1040,
    opacity:0.4,
    backgroundColor: '#000'
}

class LoginModal extends React.Component{   
    render(){
        return(
        <div>
        <div className={this.props.isOpen ? "modal fade in" : "modal fade"} id="myModal" role="dialog" 
            style={{display:this.props.isOpen?'block':'none'}}>
        <div className="modal-dialog" style={{width:'30%'}}>       
          <div className="modal-content">
            <div className="modal-header" style={{border:'none',padding:'10px'}}>
              <button type="button" className="close" onClick={this.props.onModalClose}>&times;</button>           
            </div>
            <div className="modal-body">
              <LoginForm />
            </div> 
            <div className="modal-footer" style={{border:'none'}}></div>

          </div>          
        </div>
      </div>
     {this.props.isOpen && <div style={backdropStyle}></div>}
      </div>
    )
}
}


export default LoginModal;