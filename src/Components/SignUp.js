import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
  const {showAlert}= props;
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name:"",email: "", password: "",cpassword: "" })
  const host = "http://127.0.0.1:5000"
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ name,email,password })
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      navigate("/")
      showAlert("SIGNUP SUCCESSFUL","success")
    }
    else {
      alert("INVALID CREDENTIALS")
      showAlert("INVALID CREDENTIALS","danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required minLength={8}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={8}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp