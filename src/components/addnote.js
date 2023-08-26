import React, { useContext, useEffect, useRef, useState } from 'react';
import Noteitem from './Noteitem';
import { noteContext } from '../context/notes/NoteState';


export default function Addnote(props) {

    //get text value from input tags
    const [text, setText] = useState({title:"", description:"", tag:""});
    const handleOnChange = (e)=>{
        setText({...text, [e.target.name]:e.target.value});
    }

    //use the NoteState variables and functions
    const c = useContext(noteContext);
    const {notes, addNote, getNote, updateNote} = c;


    //call the addNote function which is created in NoteState
    const handleAddnote = async (e)=>{
        e.preventDefault();
        const {title, description, tag} = text;
        addNote(title, description, tag);
        getNote();

        setText({title:"", description:"", tag:""})
        props.showAlert('A new note add successfully', 'success')
    }

    //call the getNote function which is created in NoteState
    useEffect(()=>{
        getNote();
        // eslint-disable-next-line
    },[])

    //for update the notes************************************************
    const [etext, seteText] = useState({id: "", etitle:"", edescription:"", etag:""})
    const ref = useRef(null);
    const refClose = useRef(null);

    //call updateNote function which is created in NoteState.
    const updateButton = async(currentNote)=>{
        ref.current.click();
        seteText({id: currentNote.id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }
    //use to perform submit button in form to add new note
    const handleSaveChanges = (e)=>{
        refClose.current.click();
        updateNote(etext.id, etext.etitle, etext.edescription, etext.etag)
        props.showAlert("Updated successfully", "success");
    }

    //use to get value from input fields
    const onChangeUpdate = (e)=>{
        seteText({...etext, [e.target.name]: e.target.value})
    }

  return (
    <>
            
            {/* Give title, description, tag, id to editNote function which is inside "NoteState.js" */}
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" value={etext.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChangeUpdate} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" value={etext.edescription} className="form-control" id="edescription" name="edescription" onChange={onChangeUpdate} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tag">Tag</label>
                            <input type="text" value={etext.etag} className="form-control" id="etag" name="etag" aria-describedby="emailHelp" onChange={onChangeUpdate} />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" disabled={etext.etitle.length<5 || etext.edescription.length<5} onClick={handleSaveChanges} className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>


        <h1>Add a note here</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                <input type="text" value={text.title} name='title' onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                <input type="text" value={text.description} name='description' onChange={handleOnChange} className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                <input type="text" value={text.tag} name='tag' onChange={handleOnChange} className="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" onClick={handleAddnote} className="btn btn-primary mx-3">Addnote</button>

        </form> 
        <h1 className='mt-5'>Your Notes</h1>
        <div className="row">
            {notes.map((x)=>{
                return  <Noteitem key={x.id} note={x} updateButton={updateButton}/>
            })}
        </div>

    </>
  )
}


/*

    //Real time database
    import {ref, set, child, get } from 'firebase/database';
    import {dbReal} from './firebase';
    const dbRef = ref(dbReal);

    //Add note
    const handleAddnote = (e)=>{
        e.preventDefault();
        const {title, description, tag} = text;
        const userid = title;
        set(ref(dbReal, "users/" + userid), {
            title:title,
            description:description,
            tag:tag,
        })
        setText({title:"", description:"", tag:""})
    }

    //Get note
    const handleGetnote = (e)=>{
        e.preventDefault();
        const userId = "Govind";
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
    }
    
*/