import React from 'react'   //imr
import PropTypes from 'prop-types'
import { Link} from "react-router-dom";
import {signOut } from "firebase/auth";
import {auth} from './firebase';
import { useNavigate } from 'react-router-dom';
import InformationUser from './InformationUser';

export default function Navbar(props) {
  const navigate = useNavigate();
  const handleLogout = (e)=>{
    e.preventDefault();
    signOut(auth).then(() => {
      localStorage.removeItem('token');
      navigate('/login')
      alert('Do you want to logout');
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <nav className={`navbar navbar-expand-lg bg-${props.mode} navbar-${props.mode}`}>
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">{props.title}</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">{props.indexPage}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          {localStorage.getItem('token')?
          <li className="nav-item">
            <Link className="nav-link" to="/addnote">Addnote</Link>
          </li>:""}
        </ul>
        <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}>
          <input className="form-check-input" type="checkbox" onClick={props.toggleMode} role="switch" id="flexSwitchCheckDefault" />
          <label className="form-check-label mx-3" htmlFor="flexSwitchCheckDefault">Enable DarkMode</label>
        </div>
        {!localStorage.getItem('token')?<div>
          <Link to="/login"><button type="button" className="btn btn-primary mx-3">Login</button></Link>
          <Link to="/signup"><button type="button" className="btn btn-primary">Signup</button></Link>
        </div>:
        <div style={{display:"flex"}}>
          <div><InformationUser/></div>
          <button type="button" className="btn btn-primary mx-3" onClick={handleLogout}>Logout</button>
        </div>}
      </div>
    </div>
  </nav>
  );
}



Navbar.protoType = {title: PropTypes.string, indexPage: PropTypes.string}

Navbar.defaultProps = {
    title: "CodeWithAman",
    indexPage: "Main Page"
}