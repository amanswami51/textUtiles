import React, {createContext, useState} from 'react';
import {dbFirestore} from '../../components/firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
const noteContext = createContext();


const NoteState = (props) =>{
    const [notes, setNotes] = useState([]);

   
    const uid = localStorage.getItem('uid');
    const addNote = async(title, description, tag)=>{
        try {// eslint-disable-next-line
            const docRef = await addDoc(collection(dbFirestore, `notes${uid}`), {
                title: title,
                description: description,
                tag: tag
            });
            console.log("Document written with ID: ", docRef.id);
        } 
        catch(e){
            console.error("Error adding document: ", e);
        }
    }

    //firestore db, Get note
    const getNote = async()=>{
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

    const deleteNote = async(id)=>{
        await deleteDoc(doc(dbFirestore, `notes${uid}`, id));

        const arr = notes.filter((x)=>{return x.id!==id});
        setNotes(arr);
    }

    const updateNote = async(id, title, description, tag)=>{
      const cityRef = doc(dbFirestore, `notes${uid}`, id);
       // eslint-disable-next-line
      const res = await updateDoc(cityRef, {
        title:title,
        description:description,
        tag:tag
      });


      //UI code
      let newNotes = JSON.parse(JSON.stringify(notes)) 
      for(let i=0; i<newNotes.length; i++){
        const element = notes[i];
        if(element.id === id){
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }

  return (
    <div>
      <noteContext.Provider value={{notes, addNote, getNote, deleteNote, updateNote}}>
        {props.children}
      </noteContext.Provider>
    </div>
  )
}

export {NoteState, noteContext};
