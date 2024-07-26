import React, { useContext,useState } from 'react'
import NoteContext from '../Contexts/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setnote] = useState({title:"",description:"",tag:""})
    const handleClick = (e) => {
        //preventing the page from reloading
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:""})
        props.showAlert("Added successfully", "success");
    }
    const onChange = (e) => {
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className='container my-3'>
            <h2>ADD A NOTE</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag}/>
                </div>
                <button disabled={note.title.length<3 || note.description.length<5 || note.title.length>15} type="submit" className="btn btn-primary" onClick={handleClick}>Add this Note</button>
            </form>
        </div>
    )
}

export default AddNote