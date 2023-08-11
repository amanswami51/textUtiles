import React, {useState} from "react";

export default function TextForm(props) {
    const [text, setText] = useState("Enter text here");    //use to make variables(like text) and these variable are only change by set functions(like setText)

    //for update text in textarea
    const handleOnChange = (event) =>{
      setText(event.target.value);
    }

    //for uppercase button
    const handleupClick = ()=>{
        let a = text.toUpperCase();
        setText(a);
        props.showAlert("Text change to UpperCase", "success");
    }

    //for lowercase button
    const handledownClick = ()=>{
        let a = text.toLowerCase();
        setText(a);
        props.showAlert("Text change to LowerCase", "success");
    }

    //for copy clipboard button
    const handlecopyClick = ()=>{
        navigator.clipboard.writeText(text);
        props.showAlert("Text copied", "success");
        document.getSelection().removeAllRanges();
    }

    //for dark mode enabled and disabled button
    const [modeType, setModeType] = useState("Enable Dark Mode");

    const [myStyle, setMyStyle] = useState({
      color: 'red',
      backgroundColor: '#89c5d3'
    })
 
    const handledarkmodeClick = ()=>{
        if(myStyle.backgroundColor === '#89c5d3'){
          setMyStyle({
            color: 'white',
            backgroundColor: 'black'
          })
          setModeType("Enable Light Mode");
          props.showAlert("TextArea dark mode is enabled", "success");
        }
        else{
          setMyStyle({
            color: 'red',
            backgroundColor: '#89c5d3'
          })
          setModeType("Enable Dark Mode");
          props.showAlert("TextArea Light mode is enabled", "success");
        }
    }

    //For Remove extra space button
    const handleExtraSpaceClick = ()=>{
      let a = text.split(/[ ]+/);
      setText(a.join(" "));
      props.showAlert("Extra space removed", "success");
    }

    //For clear button
    const handleClearClick = ()=>{
      setText("");
      props.showAlert("TextArea cleared", "success");
    }


  return (
    <>
        <div className="container">
            <h2>{props.TextCaption}</h2>
            <div className="input-group">
                <textarea style={myStyle} className="form-control" value={text} onChange={handleOnChange} aria-label="With textarea" rows="10"></textarea>
            </div>
            <button className="btn btn-primary my-1" onClick={handleupClick} disabled={text.length===0}>Convert To UpperCase</button>
            <button className="btn btn-primary mx-2 my-1" onClick={handledownClick} disabled={text.length===0}>Convert To LowerCase</button>
            <button className="btn btn-primary my-1" onClick={handlecopyClick} disabled={text.length===0}>Copy text</button>
            <button className="btn btn-primary mx-2 my-1" onClick={handledarkmodeClick} disabled={text.length===0}>{modeType}</button>
            <button className="btn btn-primary my-1" onClick={handleExtraSpaceClick} disabled={text.length===0}>Remove Extra space</button>
            <button className="btn btn-primary mx-2 my-1" onClick={handleClearClick} disabled={text.length===0}>Clear</button>
        </div>
        <div className="container my-3">
            <h2>Your text summery</h2>
            <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} Words, {text.length} charecters</p>
            <h2>Preview Text</h2>
            <p>{text.length>0?text:"Enter Something in Text-Box to preview"}</p>
        </div>
    </>
  );
}


