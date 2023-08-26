import './App.css';
import Navbar from './components/Navbar.js';
import TextForm from './components/TextForm.js';
import About from './components/About.js';
import Alert from './components/Alert';
import React, {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/login';
import Signup from './components/signup';
import Addnote from './components/addnote'
function App() {
  //For dark mode
  const [mode, setMode] = useState('light');
  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#0a355c';
      document.body.style.color = 'white';
      showAlert("Dark Mode is Enabled", "success");
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
      showAlert("Light Mode is Enabled", "success");
    }
  }
  //For Alert
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
      setAlert({
        msg : message,
        type : type 
      })
      setTimeout(() => {
        setAlert(null);
      }, 1500);
  }
  return (
    <>
      <Router>
        <Navbar title="TextUtiles" indexPage="Home" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path="/" element={<TextForm TextCaption="Enter your desire content" showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert}/>} />
            <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
            <Route path="/addnote" element={<Addnote showAlert={showAlert}/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;




































