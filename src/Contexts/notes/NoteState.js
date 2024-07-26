import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://127.0.0.1:5000"
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial)

    // GET ALL NOTES
    const getNotes = async() => {
        //  API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = await response.json();
        console.log(json)
        setNotes(json)
    }

    // DELETE A NOTE
    const deleteNote = async(id) => {
        //  API CALL
        // console.log(id)
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = await response.json();
        console.log(json)
        

        const newNotes = notes.filter((notes) => { return notes._id !== id })
        console.log("deleting the note with id" + id)
        setNotes(newNotes)
    }

    // ADD A NOTE
    const addNote = async(title, description, tag) => {
        //  TODO : API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        
        // Adding note on client side
        const note=  await response.json();
        setNotes(notes.concat(note))
        // const note={
        //     "_id":"",
        //     "user":"6597c4b8456db8d4389bb41a",
        //     "title":title,
        //     "description":description,
        //     "tag":tag,
        //     "date":Date.now(),
        //     "_v": 0
        // }
        // setNotes(notes.concat(note))
    }

    // EDIT A NOTE
    const editNote = async (id, title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(({title,description,tag})), // body data type must match "Content-Type" header
        });
        const NewNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                NewNotes[index].title = title;
                NewNotes[index].description = description;
                NewNotes[index].tag = tag;
                break;
            }
        }
        setNotes(NewNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;

// const NoteState =(props)=> {
//     const s1 ={
//         name:"aman",
//         class:"5b"
//     }
//     const [state, setstate] = useState(s1);
//     const update = ()=>{
//         setTimeout(() => {
//             setstate({
//                 name:"larry",
//                 class:"10b"
//             })
//         }, 1000);
//     }
//     return (
//         <NoteContext.Provider value={{state,update}}>
//             {props.children}
//         </NoteContext.Provider>
//     )
// }
// export default NoteState;