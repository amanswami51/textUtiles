import React, { useContext } from 'react';
import { noteContext } from '../context/notes/NoteState';

function Noteitem(props){
  
  //use the NoteState variables and functions
  const c = useContext(noteContext);
  const {deleteNote} = c;

  //call the deleteNote function which is created in NoteState
  const handleDelete = async(id)=>{
    deleteNote(id)
  }

  return (
    // eslint-disable-next-line
    <div className="card col-md-4 mx-2 my-3" style={{width:"18rem"}}>
        <div className="card-body">
            <h5 className="card-title">{props.note.title}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">{props.note.tag}</h6>
            <p className="card-text">{props.note.description}</p>
        </div>
        <div style={{display:"flex"}}>
          <button type="button" className="btn btn-dark mx-2" onClick={()=>{handleDelete(props.note.id)}}>Delete</button>
          <button type="button" className="btn btn-dark" onClick={()=>{props.updateButton(props.note)}}>Update</button>
        </div>
    </div>
  )
}

export default Noteitem;
