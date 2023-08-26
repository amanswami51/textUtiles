import React, { useState } from 'react';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from './firebase';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
    const navigate = useNavigate();
    const [text, setText] = useState({email:"", password:""});
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
            localStorage.setItem('token', user.accessToken)
            localStorage.setItem('uid', user.uid)
            navigate('/addnote');
        }).catch((error) => {
            props.showAlert("something went to be wrong", "danger")
        });
        setText({email:"", password:""})
    }
   
  return (
    <>  
        <h1>Create a new account for getting more benefits of this web app</h1>
        <form>
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
