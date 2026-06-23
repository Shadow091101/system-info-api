import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {
    let navigate=useNavigate();

    const [formData,setFormData]=useState({
        email:"",
        password:"",
    })

    const handleChange=(e)=>{
        e.preventDefault()
        setFormData({
            ...formData,
           [e.target.name]: e.target.value,//no []
        });
    }

    const GoToSignUp=(e)=>{
        e.preventDefault()
        navigate("/signup")
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        alert(formData.email)
        alert(formData.password)

        if(formData.email==="" || formData.password===""){
            alert("Please enter email or password")
            return;   
        }
        const response=await fetch("http://localhost:9009/api/v1/auth/login",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({email:formData.email,password:formData.password})//more than one parameter ({email:,password:})
        })

        const json=await response.json()
        alert("authtoken : "+json.authtoken )
        if(json.success){
            localStorage.setItem('token',json.authtoken)
            alert("Logged in Successfully")
            props.setIsLoggedIn(true)
            navigate("/")
        }else{
            alert("Logged in unSuccessful")   
        }
    }

  return (
    <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
    <div className='main-container' style={{textAlign:"center",border:"2px solid black",padding:"20px"}}>
        <h1>Login</h1>
      <form onSubmit={handleSubmit}>

        <div className="name" style={{margin:"10px"}}>

        <label htmlFor="email">Email : </label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange}/>

        </div>
        <div className="password">

        <label htmlFor="password">Password : </label>
        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange}/>
        </div>

        <div className="buttons" style={{marginTop:"10px"}}>
            <button type='submit'> Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="reset">Clear</button>
        </div>
        <br />
        <div className="gotoSignup">
            Don't have any account? <a href="" style={{textDecoration:"none"}} onClick={GoToSignUp}>SignUp</a>
        </div>

      </form>
    </div>
    </div>
  )
}

export default Login
