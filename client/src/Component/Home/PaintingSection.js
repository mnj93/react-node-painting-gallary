import React from 'react';
import SinglePainting from './SinglePainting';
import LoginModal from '../Login/LoginModal';
import {connect} from 'react-redux';
import { LikePaintingRequest, FetchPaintingSuccess, FetchPaintingRequest } from '../../Actions/Painting';
import jwt_decode from 'jwt-decode';
import SnackBar from '../Others/Snackbar';
import { LoadingDiv, ErrorDiv } from '../Others/LoadingDiv';


class PaintingSection extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen : false,
            loginRefreshDone : false,
            PaintingsList:[],
            isSnackbarVisible : false,
            snackbarText : '',
            snackbarType : ''
        }
    }
    handleLike=(e,painting_id)=>{
        e.preventDefault();
        if(!localStorage.getItem('token')){
            this.setState({isModalOpen:true});
        }
        else{
            //console.log('painting id :',painting_id)
            this.props.likePainting(painting_id);
        }
    }
    handleModalClose=(e)=>{
        e.preventDefault();
        this.setState({
            isModalOpen:false
        })
    }
    componentWillReceiveProps(nextProps){      
        if(!this.props.isAuthenticated){
            this.setState({isModalOpen : false})
        }               
        else if(nextProps.likePaintingError){
            this.setState({
                isSnackbarVisible : true,
                snackbarText : nextProps.likePaintingError,
                snackbarType :'error'
            })
        } 
        this.setState({
            PaintingsList : nextProps.paintings
        })
    }
    componentDidUpdate(prevProps,prevState){
        setTimeout(() => {
            if(this.state.isSnackbarVisible){
                this.setState({
                isSnackbarVisible:false               
            })
          }
        }, 3000);
        if(prevProps.isAuthenticated != this.props.isAuthenticated){
            let username='';
            if(localStorage.token){
                const decoded = jwt_decode(localStorage.getItem('token'));
                //console.log('decoded : ',decoded);
                username = decoded.user_name;
            }
            this.props.fetchPaintingSuccess(this.state.PaintingsList,username);
        }
    }
    componentDidMount(){        
        let username='';
        if(localStorage.token){
            const decoded = jwt_decode(localStorage.getItem('token'));
            //console.log('decoded : ',decoded);
            username = decoded.user_name;
        }
        this.props.fetchPainting(username);
        setTimeout(() => {
            if(!this.state.isModalOpen && this.props.paintings.length){
                this.setState({
                isModalOpen:true               
            })
          }
        }, 3000);
    }
    render(){
         if(this.props.isLoading){
            return <LoadingDiv />
         }
         else if(this.props.error){
            return <ErrorDiv header="Error Occured !!" body={this.props.error} />
         }
         else{
            return( 
                <div>
               <div className="row">
               <SnackBar isVisible={this.state.isSnackbarVisible} type={this.state.snackbarType} text={this.state.snackbarText} />     
                   {
                      this.props.paintings.length > 0 ?
                      this.props.paintings.map((el,index)=>{                  
                         return <SinglePainting key={index} painting={el} onLike={(e,painting_id)=>this.handleLike(e,painting_id)} />
                      }) : 
                      <div className="container text-center" style={{marginTop:'5%'}}><h3>No Data Available!!</h3></div>
                   }          
               </div>
                   {
                       !this.props.isAuthenticated && <LoginModal isOpen={this.state.isModalOpen} onModalClose={this.handleModalClose} />
                   }             
               </div>
           )
         }
      
    }   
}

function mapStateToProps(state){
    return {
        isAuthenticated : !!state.Auth.user,
        isLoading : state.Paintings.Painting.loading ,
        error : state.Paintings.Painting.error,
        paintings: state.Paintings.Painting.paintings ?  state.Paintings.Painting.paintings : [],
        likePaintingSuccess : state.Paintings.Painting.paintingLikeSuccess,
        likePaintingError : state.Paintings.Painting.paintingLikeError
    }
}

export default connect(mapStateToProps,{fetchPainting :FetchPaintingRequest ,
    likePainting : LikePaintingRequest,
    fetchPaintingSuccess : FetchPaintingSuccess
})(PaintingSection);