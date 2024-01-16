import { useState } from "react"
import img from '../../../public/Darko.jpeg'
import Router, { useRouter } from "next/router"


const axios = require("axios")

const Login = () => {

    const [email, setemail] = useState("")
    const [emailError, setemailError] = useState("")

    const [pass, setpass] = useState("")
    const [passError, setpassError] = useState("")

    const login = async (email, pass) => {
        if (email !== "" && pass !== "" && passError === '' && emailError === '') {
            const res = await axios.post(`https://reddit-backend-xvml.onrender.com/login`, {
                email: email,
                password: pass
            }).then((res) => {
                alert("Welcome back")
                console.log(res)
                localStorage.setItem("id", true)
                localStorage.setItem("userId", JSON.stringify(res.data._id))
                Router.push("/");
                setemail(""); setpass("")
            }).catch((err) => {
                alert("User not found")
            })
        } else {
            alert("Please fill in all input")
        }

    }

    const handleEmail = event => {
        const emailchekc = event.target.value
        if (emailchekc.includes("@")) {
            setemailError("")
        } else {
            setemailError("Invalid gmail")
        }
        setemail(emailchekc)
    }
    const handlePass = event => {
        const chekcpass = event.target.value
        if (chekcpass.length < 8) {
            setpassError("Password must be atleast 8 character")
        } else {
            setpassError("")
        }
        setpass(chekcpass)
    }

    const signed = () => {
        Router.push("/Signup")
    }

    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url(${img.src})`, width: '100vw', height: '100vh', fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "center", backgroundColor: "grey", width: "500px", height: "400px", borderRadius: "20px" }}>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "20px" }}>
                <input placeholder="Email" style={{ padding: "5px", borderRadius: "7px", border: "none", width: "300px" }} type="text" value={email} onChange={handleEmail} />
                <p style={{ color: "#8c2e2e", height: "10px", }}>{emailError}</p>
                <input placeholder="Password" style={{ padding: "5px", borderRadius: "7px", border: "none", width: "300px" }} type="password" value={pass} onChange={handlePass} />
                <p style={{ color: "#8c2e2e", height: "10px", }}>{passError}</p>
                <button style={{ border: "none", padding: "5px", borderRadius: "7px" }} onClick={() => login(email, pass)} >Login</button>
                <p style={{ color: "white", fontSize: "12px", }}>Dont have account? create one</p>
                <button style={{ border: "none", padding: "5px", borderRadius: "7px" }} onClick={signed}> Sign up</button>
            </div>
        </div>

    </div>
}


export default Login
