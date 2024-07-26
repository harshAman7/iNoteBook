import React from 'react'

{/*this import could be used anywhere,even for grand-grand-children of About*/ }

const About = () => {

  // console.log(a)
  return (
    <div className="container">
      <h1 className="my-3">About Us</h1>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <strong>Add,Delete or Edit your Notes or Tasks</strong>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse"
            // <div id="collapseOne" className="accordion-collapse collapse show"
            aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              iNoteBook gives you comfort to create a collection of notes or tasks.You can add,delete,modify your notes and go through them at once. 

            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <strong>Free to use </strong>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body"    >
              iNoteBook is a free tool that provides addition,deletion and modification of your notes.It also provides signup and login functionalities so that no other person can see your collection of notes.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed"     type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <strong>Browser Compatible </strong>
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body"    >
              This notebook works in any web browsers such as Chrome, Firefox, Internet Explorer, Safari, Opera.

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About

{/*
const a = useContext(NoteContext)
  
  useEffect(() => {
    a.update();
  }, [])
  
  // console.log(a)
  return (
    <div>This is About {a.state.name} and he is in class {a.state.class}</div>
  )
*/}