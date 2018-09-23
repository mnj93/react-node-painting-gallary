import React from 'react';
import { LoadingDiv, ErrorDiv } from '../Others/LoadingDiv';
import PaintingComponent from './SinglePainting';

const MainComponent=(props)=>{
    if(props.isLoading){
        return(                
            <LoadingDiv />            
        )
    }
    else if(props.error){
        return <ErrorDiv header="Error Occured!!" body={props.error} />
    }
    else{
        return(
            <div>                 
                {
                    props.painting_list.length > 0 ? 
                    <div>                           
                    {
                       props.painting_list.map((el,index)=>{                    
                       return <PaintingComponent onDelete={(e,painting_id)=>props.handleOnDelete(e,painting_id)}
                       onEdit={(e,painting_id)=>props.editPainting(e,painting_id)} painting={el} key={index} />
                    })}
                    </div>
                     : <div className="container text-center" style={{marginLeft:'auto',marginRight:'auto',marginTop:'5%'}}><h3>No Data Available!</h3></div>
                }
            </div>
        )
    }
}

export default MainComponent;