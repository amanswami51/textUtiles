import React, { useState } from 'react';
import {ref, set, child, get } from 'firebase/database';
import {dbReal} from './firebase';

const dbRef = ref(dbReal);
export default function Addnote() {
    const [text, setText] = useState({title:"", description:"", tag:""});
    const handleOnChange = (e)=>{
        setText({...text, [e.target.name]:e.target.value});
    }
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
    const handleGetnote = (e)=>{
        e.preventDefault();
        const userId = "aman";
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
  return (
    <>
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
            <button type="submit" onClick={handleGetnote} className="btn btn-primary">Getnote</button>
        </form> 
    </>
  )
}
