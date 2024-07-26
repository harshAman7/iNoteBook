import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const LogIn = (props) => {
    let navigate = useNavigate();
    const {showAlert} = props;
    const [credentials, setCredentials] = useState({email:"",password:""})
    const host = "http://127.0.0.1:5000"
    const handleSubmit =async (e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            localStorage.setItem('token',json.authToken)
            navigate("/")
            showAlert("LOGIN SUCCESSFUL","success")
        }
        else{
            showAlert("INVALID CREDENTIALS","danger")
        }
    }
    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credentials.email}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password}/>
                </div>
                <button type="submit" className="btn btn-primary">LogIn</button>
            </form>
        </div>
    )
}

export default LogIn