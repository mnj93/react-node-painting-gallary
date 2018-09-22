import React from 'react';
// import '../Login/modal.css';
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

class ConfirmModal extends React.Component{   
    render(){
        return(
        <div>
        <div className={this.props.isOpen ? "modal fade in" : "modal fade"} id="myModal" role="dialog" 
            style={{display:this.props.isOpen?'block':'none'}}>
        <div className="modal-dialog" style={{width:'30%'}}>       
          <div className="modal-content">
            <div className="modal-header" >
            <h4 className="modal-title">{this.props.modal_title}</h4>              
            </div>
            <div className="modal-body">
               {this.props.modal_body}
            </div> 
            <div className="modal-footer" style={{padding:'2%'}}>
            {
                this.props.showLoader ? 
                <button type="button" className="btn btn-default" disabled >Deleting... <i className="fa fa-spin fa-spinner"></i></button>
                : <div>
                    <button type="button" onClick={(e)=>this.props.onCancel(e)} className="btn btn-default">
                    <i className="fas fa-times" style={{color:'#000'}}></i>  {this.props.cancel_text}</button>
                    <button type="button" onClick={(e)=>this.props.onConfirm(e)} className="btn" style={{background:'#222',borderColor:'#222',color:'#fff'}}>
                    <i className="fas fa-check" style={{color:'#fff'}}></i>  {this.props.confirm_text}</button>
                    </div>
            }            
            </div>               
          </div>          
        </div>
      </div>
     {this.props.isOpen && <div style={backdropStyle}></div>}
      </div>
    )
}
}


export default ConfirmModal;