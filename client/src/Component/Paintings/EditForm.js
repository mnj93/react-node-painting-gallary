import React from 'react';
import Validator from 'validator';
import InlineError from '../Others/InlineError';
import PropTypes from 'prop-types';
import { UserLoginRequest } from '../../Actions/Auth';
import {connect} from 'react-redux';
import { FetchSinglePaintingRequest, UpdatePaintingRequest } from '../../Actions/Painting';
import SnackBar from '../Others/Snackbar';
import { format } from 'path';

const hasExtension=(fileName, exts)=> {
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
  }
  function generatePreviewImgUrl(file, callback) {
    const reader = new FileReader()
    const url = reader.readAsDataURL(file)
    reader.onloadend = e => callback(reader.result)
  }
class EditForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data :{
                painting_name:'',
                painting_desc : '',
                image_url : '',
                fileTobeSent : null               
            },
            isSnackbarVisible:false,
            snackbarText:'',
            snackbarType:'',
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
            const data = this.state.data;
            console.log('valid form')
            const formdata = {};
            formdata.painting_name = data.painting_name;
            formdata.painting_desc = data.painting_desc;
            formdata.cover_image = data.fileTobeSent;
            this.props.updatePainting(formdata,this.props.painting._id)
            //console.log(formdata);
        }
    }
    
    validate = (data) =>{
        const errors={};
        console.log(data);
        console.log('painting name ',data.painting_name)
        if(!data.painting_name) errors.painting_name = "Please enter painting name";    
        if(!data.painting_desc) errors.painting_desc = "Please enter painting description";    
        return errors;
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.painting !== this.props.painting){
        this.setState({
            data:{
                painting_name:nextProps.painting.painting_name,
                painting_desc : nextProps.painting.painting_desc ? nextProps.painting.painting_desc  :'',
                image_url : nextProps.painting.image_url
            }
        })
      }
    }
    componentDidMount(){
        console.log('painting params id :',this.props.params.painting_id)
        this.props.fetchPaintingDetails(this.props.params.painting_id)
    }
    handleImageClick=(e)=>{
        e.preventDefault();
        const fileUpload = document.getElementById('cover_image');        
        fileUpload.click();
    }
    handleFileChange=(e)=>{
        const validTypes = ['.jpg','.JPG','.png','.PNG','.jpeg','.JPEG'];
        const file = e.target.files[0];       
        if(!hasExtension(file.name,['.jpg','.JPG','.png','.PNG','.jpeg','.JPEG'])){
            this.setState({
               isSnackbarVisible:true,
               snackbarText:'Invalid file, .jpg,.png,.jpeg files allowed.',
               snackbarType:'error'
            });                  
        }      
        else if(file.size > 4194304 ){
          this.setState({
            isSnackbarVisible:true,
            snackbarText:'Max file size allowed is 4MB.',
            snackbarType:'error'
         });           
        }
        else{
            generatePreviewImgUrl(file,previewImgUrl =>{
                this.setState({
                    data:{
                        ...this.state.data,
                        image_url :previewImgUrl,
                        fileTobeSent : file
                    }
                })
            })
        }
    }
    componentDidUpdate(){
        if(this.state.isSnackbarVisible){
            setTimeout(() => {
                this.setState({
                    isSnackbarVisible:false
                })
            }, 3000);
        }
    }
    onChange = e => this.setState({data : {...this.state.data , [e.target.name]:e.target.value }});
    render(){
        const {data,errors,loading} = this.state;
        //const usernameClassName = errors.email ? 'form-control is-invalid' : 'form-control'; 
        return(
            <div className="row topRow">       
            <SnackBar isVisible={this.state.isSnackbarVisible} type={this.state.snackbarType} text={this.state.snackbarText} />     
            <div className="col-md-1"></div>       
            <div className="col-md-10 formDiv">
          <h2 className="text-center" style={{marginBottom:'10%',marginTop:0}}>Edit Painting</h2>
            <form onSubmit={this.onSubmit}>              
                       
                {
                    errors.message &&  <div className="alert alert-danger" role="alert">{errors.message}</div>                                            
                }     
                <div className="col-md-4">
                <div className="thumbnail">
                    <img title="Click to upload cover image" onClick={this.handleImageClick} src={data.image_url} style={{width:'100%',height:'auto',cursor:'pointer'}} alt="Painting Image" />
                    <input type="file" onChange={(e)=>this.handleFileChange(e)} id="cover_image" name="file_upload" accept=".jpg,.jpeg,.png" style={{visibility:'hidden'}} />
                </div>                   
                </div>    
                <div className="col-md-8">
                    <div className={errors.painting_name ? "form-group has-error":"form-group"}>
                        <label htmlFor="painting_name">Painting Name</label>
                        <input type="text" className="form-control" id="painting_name" aria-describedby="painting_nameHelp"
                        placeholder="Enter painting name" name="painting_name" value={data.painting_name} onChange={this.onChange}/>
                        {errors.painting_name && <InlineError text={errors.painting_name} /> }                   
                    </div> 
                    <div className={errors.painting_desc ? "form-group has-error":"form-group"}>
                        <label htmlFor="painting_desc">Painting Description</label>
                        <textarea className="form-control" id="painting_desc" aria-describedby="painting_descHelp"
                        placeholder="Enter username" name="painting_desc" value={data.painting_desc} onChange={this.onChange}>
                        </textarea>
                        {errors.painting_desc && <InlineError text={errors.painting_desc} /> }                   
                    </div>            
                    <div className="text-center">      
                        {
                            this.props.loading ? <button disabled="true" className="btn btn-block btn-default">Please Wait.... <i className="fa fa-spin fa-circle-notch"></i></button>  :        
                            <button className="btn btn-block btn-success" onClick={this.handleFormSubmit}>Submit <i className="fa fa-paper-plane"></i></button>    
                        }                                             
                    </div>   
                </div>      
                         
            </form>
            </div>           
            <div className="col-md-1"></div>       
            </div>
        );
    }
}

EditForm.PropTypes = {
    submit : PropTypes.func.isRequired
}
function mapStateToProps(state){
    return{
        loading : state.Paintings.PaintingDetails.loading,
        error : state.Paintings.PaintingDetails.error,
        painting : state.Paintings.PaintingDetails.painting
    }
}
export default connect(mapStateToProps, {fetchPaintingDetails : FetchSinglePaintingRequest,
updatePainting : UpdatePaintingRequest
})(EditForm);