import React from 'react'

export default function About() {
  return (
    <div className="container">
        <h1 className="my-3">About Us</h1>
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Founder
                </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>Aman swami,</strong> web developer -- React js, firebase, express js, mongoDb. <br />
                        I am pursuing B.Tech in computer science and engineering branch from "I.K. Gujral Punjab Technical university amritsar campus". <br /> 
                        I completed my 12th from "Swami vivekanand Govt. model school block suratgarh, Rajasthan". <br />
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                   My goal
                </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <strong>I wants to become an IT experts (CTO) in big organizations.</strong> <br />
                    Seeking a challenging career with a progresshive organization that provides an opportunity to capitalize my technical skills and abilities in the field of IT sector.
                </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    social media handler
                </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>Instagram :-</strong> amanswami51 <br />
                        <strong>Telegram :-</strong> @aman_8824 <br /> {/* eslint-disable-next-line */}
                        <strong>Linkedin :-</strong> <a target='_blank' style={{color:"black", textDecoration:"none"}} href="https://www.linkedin.com/in/aman-swami-bb3a95221">click here</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
