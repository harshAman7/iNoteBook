// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Contexts/notes/NoteState';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import Alert from './Components/Alert';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Routes,
} from "react-router-dom"

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      {/*this notestate will make sure that all the chidren will be available for components wrapped inside it*/}
      {/*and its because of useContext api */}
      <NoteState>
        <Router>
          <Navbar />
          <Alert  alert={alert}/>
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<LogIn showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}
export default App;
