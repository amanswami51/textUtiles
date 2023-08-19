import React, { useEffect, useState } from 'react';
import myImage from '../myphoto.jpg';
import {storage} from './firebase';
import {ref, uploadBytes } from "firebase/storage";
import {addDoc, collection, getDocs } from 'firebase/firestore';
import { dbFirestore } from './firebase';

function InformationUser(props){
  const [text, setText] = useState({name:"", mobile:"", DOB:""});
  const [userPic, setUserPic] = useState(null)
  const handleOnChange = (e)=>{
    setText({...text, [e.target.name]:[e.target.value]})
  }

  const handleSaveChanges = async(e)=>{
    e.preventDefault();
    const {name, mobile, DOB} = text;

    //store in storage
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${userPic}`)
    const uploadResult = await uploadBytes(imageRef, userPic);

    //store in firestore
    // eslint-disable-next-line
    const result = await addDoc(collection(dbFirestore, `userInfo${localStorage.getItem('token')}`), {
      name, mobile, DOB, imageURL: uploadResult.ref.fullPath
    })

    handleGetSaveChanges();
  }


  const handleGetSaveChanges = async()=>{
    const querySnapshot = await getDocs(collection(dbFirestore, `userInfo${localStorage.getItem('token')}`));
        querySnapshot.forEach((doc) => {
            console.log(doc.id)
            console.log(doc.data())
            setText({
              name:doc.data().name,
              mobile:doc.data().mobile,
              DOB:doc.data().DOB
            })
           
          });
  }

  useEffect(()=>{
    handleGetSaveChanges();
    // eslint-disable-next-line
  }, [])

  return (
      <div>
        <button type="button" className="btn p-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <img src={myImage} alt="afasa" className='img-circle' width="42px" height="34px" style={{borderRadius:"41px"}}/>
        </button>
        
        <div className="modal fade" id="exampleModal" style={{color:"black"}} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Your personal information</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-2">
                      <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                      <input type="text" name='name' value={text.name} onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-2">
                      <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                      <input type="email" name='email' value="123ramramji456@gmail.com" disabled className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-2">
                      <label htmlFor="exampleInputEmail1" className="form-label">Mobile number</label>
                      <input type="text" name='mobile' value={text.mobile} onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-2">
                      <label htmlFor="exampleInputEmail1" className="form-label">DOB</label>
                      <input type="date" name='DOB' value={text.DOB} onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Upload your pic</label>
                    <input className="form-control" name='userPic' onChange={(e)=>{setUserPic(e.target.value)}} type="file" id="formFile" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={handleSaveChanges} className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default InformationUser
