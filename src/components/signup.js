import React, { useState } from 'react';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from './firebase';

export default function Signup() {
    const [text, setText] = useState({name:"", email:"", password:""});
    const handleOnChange = (e)=>{
        setText({...text, [e.target.name]:e.target.value});
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const {email, password} = text;
        createUserWithEmailAndPassword(
            auth, 
            email, 
            password
        ).then((userCredential) => {
            const user = userCredential.user;
            alert(user);
        }).catch((error) => {
            alert(error);
        });
        setText({name:"", email:"", password:""})
    }
  return (
    <>  
        <h1>Create new account on TextUtiles</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Full name</label>
                <input type="text" value={text.name} name="name" onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" value={text.email} name="email" onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" value={text.password} name="password" onChange={handleOnChange} className="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </form> 
    </>
  )
}
