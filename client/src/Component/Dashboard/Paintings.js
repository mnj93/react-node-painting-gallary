import React from 'react';
import { FetchPaintingRequest, DeletePaintingRequest } from '../../Actions/Painting';
import {connect} from 'react-redux';
import history from '../../Config/history';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import MainComponent from './MainContent';

let timer;
class PaintingList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showConfirmModal : false,
            deleting_id : 0,
            painting_list:[],
            searchText :''
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
    
    handleSearch=(e)=>{
        this.setState({
            searchText : e.target.value
        });
        timer && clearTimeout(timer);
        timer = setTimeout((e) => {
            this.props.fetchPaintings('',this.state.searchText)
        }, 300);
    }
    render(){               
       return(
           <div>
            <div className="row">
            <HeaderComponent searchText={this.state.searchText} onSearch={(e)=>this.handleSearch(e)} />
            </div>   
            <hr />
            <MainComponent 
              isLoading ={this.props.isLoading}
              error ={this.props.error}
              painting_list={this.state.painting_list}
              handleOnDelete={(e,painting_id)=>this.handleOnDelete(e,painting_id)}
              editPainting={(e,painting_id)=>this.editPainting(e,painting_id)}
             />
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

const HeaderComponent=(props)=>{
    return(
        <div className="col-md-12">
        <div className="col-md-8"></div>
        <div className="col-md-4">
        <div class="input-group">
            <input type="text" value={props.searchText} onChange={(e)=>props.onSearch(e)} class="form-control" placeholder="Type here for search.." aria-describedby="basic-addon2" />
            <span class="input-group-addon" id="basic-addon2"><i className="fas fa-search"></i></span>
        </div>
        </div>
        </div>
    )
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
