import React,{useContext} from 'react';
import NoteContext from '../Contexts/notes/NoteContext';
// import { Link } from 'react-router-dom';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { notei,updateNote,showAlert } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                {/* <img src="..." className="card-img-top" alt="..."> */}
                <div className="card-body ">
                    <div className='d-flex align-items-center'><h5 className="card-title">{notei.title}</h5>
                        <i className="fa-solid fa-trash-can mx-auto" onClick={()=>{
                            deleteNote(notei._id);showAlert("Deleted successfully", "success")}
                        }></i>
                        <i className="fa-solid fa-user-pen mx-auto" onClick={()=>{updateNote(notei)}}></i>
                    </div>
                    <p className="card-text">{notei.description} </p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem