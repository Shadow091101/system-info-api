import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp() {

    let navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        confpassword: ""
    })

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleClear=(e)=>{
        e.preventDefault();
        setFormData({
            email:"",
            password:"",
            name:"",
            confpassword:""
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        alert(formData.name)
        alert(formData.email)
        alert(formData.password)
        alert(formData.confpassword)

        if(formData.email==="" || formData.password==="" || formData.username===""){
            alert("Please fill all the deatils")
            return;
        }

        if(formData.password !== formData.confpassword){
            alert("Password does not match")
            return
        }

        if(formData.password.length<8){
            alert("Password should be more than 7 characters")
            return
        }
        try {
            const response = await fetch("http://localhost:9009/api/v1/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: formData.email, password: formData.password, username: formData.name })
            })
            // handleClear();
            const result = await response.json()
            console.log("Backend Response on frontend : ",result);
            alert(JSON.stringify(result))
            if (result.success) {
                alert("User Added")
                navigate("/login")
            } else {
                alert("User not added")
            }
        } catch (error) {
            console.error("Error : ", error)
        }
    }

    return (
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <div className='main-container' style={{ textAlign: "center", border: "2px solid black", padding: "20px" }}>
                <h1>SignUp</h1>
                <form action="" onSubmit={handleSubmit}>

                    <div className="name" style={{ margin: "10px" }}>

                        <label htmlFor="name">Username : </label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />

                    </div>
                    <div className="email" style={{ margin: "10px" }}>

                        <label htmlFor="email">Email : </label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />

                    </div>
                    <div className="password">

                        <label htmlFor="password">Password : </label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="confpassword" style={{ marginTop: "10px" }}>

                        <label htmlFor="confpassword" >Confirm Password : </label>
                        <input type="password" name="confpassword" id="confpassword" value={formData.confpassword} onChange={handleChange} />
                    </div>

                    <div className="buttons" style={{ marginTop: "10px" }}>
                        <button type="submit"> Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="reset" onClick={handleClear}>Clear</button>
                    </div>
                    <br />
                    <div className="gotoSignup">
                        Have any account? <a  style={{ textDecoration: "none",cursor:"pointer" }} onClick={()=>navigate("/login")}>Login</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
