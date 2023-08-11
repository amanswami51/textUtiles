import React, { useState } from 'react';
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from './firebase';


export default function Login() {
    const [text, setText] = useState({email:"", password:""});
    const handleOnChange = (e)=>{
        setText({...text, [e.target.name]:e.target.value});
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const {email, password} = text;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            alert({errorMessage})
        });
        setText({email:"", password:""});
    }
  return (
    <>
        <h1>Login in your existing account</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" value={text.email} name='email' onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" value={text.password} name='password' onChange={handleOnChange} className="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </form>
    </>
  )
}
