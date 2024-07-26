import React, { useContext, useEffect,useState, useRef } from 'react'
import NoteContext from '../Contexts/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
    let navigate = useNavigate();
    const context = useContext(NoteContext);
    const { notes, getNotes,editNote } = context;
    const {showAlert} = props;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate("/login")
        }
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:"default"})

    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    }

    const handleClick = (e) => {
        editNote(note.id,note.etitle,note.edescription,note.etag,)
        ref.current.click();
        props.showAlert("Updated successfully", "success");
        // addNote(note.title,note.description,note.tag);
    }
    const onChange = (e) => {
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <>
            <AddNote showAlert={showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit the Note</h5>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} value={note.edescription}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={note.etag}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" button disabled={note.etitle.length<3 && note.etitle.length>15 || note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Edit note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' my-3 row'>
                <h3>YOUR NOTES</h3>
                <div className='container'>{notes.length === 0 && "NO NOTE TO DISPLAY"}</div>
                
                {notes.map((notes) => {
                    return <NoteItem key={notes._id} updateNote={updateNote} showAlert={showAlert} notei={notes} />
                    {/* how to return an object here */ }
                })}
            </div>
        </>

    )
}

export default Notes