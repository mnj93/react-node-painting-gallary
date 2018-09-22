import React from 'react';
import PaintingComponent from './SinglePainting';
import { FetchPaintingRequest, DeletePaintingRequest } from '../../Actions/Painting';
import {connect} from 'react-redux';
import history from '../../Config/history';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { LoadingDiv, ErrorDiv } from '../Others/LoadingDiv';

class PaintingList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showConfirmModal : false,
            deleting_id : 0,
            painting_list:[]
        }
    }
    componentDidMount(){
        this.props.fetchPaintings('')
    }
    editPainting=(e,painting_id)=>{
        e.preventDefault();
        history.push('/paintings/edit/'+painting_id)
    }
    handleOnDelete=(e,painting_id)=>{
        e.preventDefault();
        this.setState({
            showConfirmModal : true,
            deleting_id : painting_id            
        })
    }
    onCancel=(e)=>{
        e.preventDefault();
        this.setState({
            showConfirmModal : false,
            deleting_id : 0
        })
    }
    confirmDelete=(e)=>{
        e.preventDefault();
        this.props.deletePainting(this.state.deleting_id);
    }      
    componentWillReceiveProps(nextProps){
        if(nextProps.delete_success){
            const updatedList = nextProps.paintings.filter((el)=>{
                return el._id !== this.state.deleting_id
            })
            this.setState({
                showConfirmModal : false,
                deleting_id : 0,
                painting_list : updatedList
            })
        }
        else{
            this.setState({
                painting_list : nextProps.paintings
            })
        }
    }  
    render(){
        if(this.props.isLoading){
            return(
                <LoadingDiv />
            )
        }
        else if(this.props.error){
            return <ErrorDiv header="Error Occured!!" body={this.props.error} />
        }
        else{
            return(
                <div>
                    {
                        this.state.painting_list.length > 0 ? 
                        this.state.painting_list.map((el,index)=>{                    
                           return <PaintingComponent onDelete={(e,painting_id)=>this.handleOnDelete(e,painting_id)}
                           onEdit={(e,painting_id)=>this.editPainting(e,painting_id)} painting={el} key={index} />
                        }) : <div className="container text-center" style={{marginLeft:'auto',marginRight:'auto',marginTop:'5%'}}><h3>No Data Available!</h3></div>
                    }
                    {
                        this.state.showConfirmModal && 
                        <ConfirmModal modal_title="Are you sure you want to delete this painting ?"
                            modal_body="If you're sure that you want to delete this painting then please click on confirm button, you can not undo this action once done."
                            confirm_text={""+'Confirm'}
                            cancel_text={""+'Cancel'}
                            onConfirm={(e)=>this.confirmDelete(e)}
                            onCancel = {(e)=>this.onCancel(e)}
                            isOpen={this.state.showConfirmModal}
                            showLoader = {this.props.delete_loader}                        
                        />
                    }
                </div>
            )
        }
      
    }
}
function mapStateToProps(state){
    return{
        isLoading : state.Paintings.Painting.loading,
        error : state.Paintings.Painting.error,
        paintings : state.Paintings.Painting.paintings ? state.Paintings.Painting.paintings : [],
        delete_loader : state.Paintings.PaintingDetails.delete_loading,
        delete_success : state.Paintings.PaintingDetails.delete_success
    }
}
export default connect(mapStateToProps, {fetchPaintings : FetchPaintingRequest,
deletePainting : DeletePaintingRequest
})(PaintingList)
