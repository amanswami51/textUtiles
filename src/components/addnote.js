import React, { useEffect, useState } from 'react';
import {dbFirestore} from './firebase';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import {auth} from './firebase'
import Noteitem from './Noteitem';


export default function Addnote(props) {
    const [text, setText] = useState({title:"", description:"", tag:""});
    const handleOnChange = (e)=>{
        setText({...text, [e.target.name]:e.target.value});
    }

    const [notes, setNotes] = useState([]);

//firestore db, Add note
    const user = auth.currentUser;
    const uid = user.uid;
    const handleAddnote = async (e)=>{
        e.preventDefault();
        const {title, description, tag} = text;
        try {// eslint-disable-next-line
            const docRef = await addDoc(collection(dbFirestore, `notes${uid}`), {
                title: title,
                description: description,
                tag: tag
            });
            // console.log("Document written with ID: ", docRef.id);
            handleGetnote();
        } 
        catch(e){
            console.error("Error adding document: ", e);
        }
        setText({title:"", description:"", tag:""})
        props.showAlert('A new note add successfully', 'success')
    }

//firestore db, Get note
    const handleGetnote = async(e)=>{
        // e.preventDefault();
        const querySnapshot = await getDocs(collection(dbFirestore, `notes${uid}`));
        let arr = [];
        let i = 0;
        querySnapshot.forEach((doc) => {
            // console.log(doc.id)
            // console.log(doc.data())
            arr[i] = {
              id:doc.id,
              title:doc.data().title,
              description:doc.data().description,
              tag:doc.data().tag,
            }
            i++;
          });
          setNotes(arr) 
    }

    useEffect(()=>{
        handleGetnote();
        // eslint-disable-next-line
    },[])

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

        </form> 
        <h1 className='mt-5'>Your Notes</h1>
        <div className="row">
            {notes.map((x)=>{
                return  <Noteitem key={x.id} note={x}/>
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