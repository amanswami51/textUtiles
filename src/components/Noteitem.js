import React from 'react'

function Noteitem(props) {
  return (
    // eslint-disable-next-line
    <div className="card col-md-4 mx-2 my-3" style={{width:"18rem"}}>
        <div className="card-body">
            <h5 className="card-title">{props.note.title}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">{props.note.tag}</h6>
            <p className="card-text">{props.note.description}</p>
        </div>
    </div>
  
  )
}

export default Noteitem;
