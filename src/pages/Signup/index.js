import { useState } from "react"
import img from '../../../public/darko.jpeg'
import Router from "next/router"

const errorStyle = {
    height: "10px",
    color: "#8c2e2e"
}
const buttonstyle = {
    border: "none",
    padding: "5px",
    borderRadius: "7px"
}
const inputstyle = {
    padding: "5px", borderRadius: "7px", border: "none",
    width: "300px"
}


const axios = require("axios")

const Signin = () => {
    const [email, setemail] = useState("")
    const [pass, setpass] = useState("")
    const [passError, setpassError] = useState("")
    const [confirmPass, setconfirmPass] = useState("")
    const [confirmPassError, setconfirmPassError] = useState("")
    const [name, setname] = useState("")
    const [age, setage] = useState("")
    const [ageChecker, setageChecker] = useState("")
    const [nameError, setnameError] = useState("")
    const [emailError, setemailError] = useState("")

    const signin = () => {
        if (emailError == "" && passError == "" && nameError == "" && ageChecker == "" && email !== "" && name !== "" && pass !== "" && age !== "") {
            axios.post(`https://reddit-backend-xvml.onrender.com/signup`, {
                username: name,
                email: email,
                password: pass,
                age: age
            }).then((res) => {
                console.log(res)
                localStorage.setItem("id", true)
                localStorage.setItem("userId", JSON.stringify(res.data._id))
                Router.push("/")
                if (res.status == 400) {
                    alert(res.message)
                } else {

                }
                alert("You just signed in")
                setemail(""), setpass(""), setname(""), setconfirmPass(""), setage("")
            })
                .catch((error) => {
                    console.log(error)
                    alert("Email already in use")
                })

        } else {
            alert("Please fill in all input")
        }
    }



    const handleName = event => {
        const username = event.target.value
        if (username.length < 4) {
            setnameError("Username must be atleast 4 character")
        } else {
            setnameError("")
        }
        setname(username)

    }
    const handleEmail = event => {
        const checkemail = event.target.value
        if (checkemail.includes("@")) {
            setemailError("")
        } else {
            setemailError("Invalid gmail")
        }
        setemail(checkemail)
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
    const handleconfirmPass = event => {
        const checkconfirmPass = event.target.value
        if (checkconfirmPass === pass) {
            setconfirmPassError("")

        } else {
            setconfirmPassError("Password must be same")
        }
        setconfirmPass(checkconfirmPass)
    }
    const handleAge = event => {
        const checkage = event.target.value
        if (checkage < 18) {
            setageChecker("Too young comeback when you're 18")
        } else {
            setageChecker("")
        }
        setage(checkage)

    }

    const back = () => {
        Router.push("/login")
    }
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url(${img.src})`, width: '100vw', height: '100vh', fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "center", backgroundColor: "grey", width: "35vw", height: "60vh", borderRadius: "20px" }}>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "20px" }}>
                <input placeholder="Username" style={inputstyle} type="text" value={name} onChange={handleName} />
                <p style={errorStyle}>{nameError}</p>
                <input placeholder="Email" style={inputstyle} type="text" value={email} onChange={handleEmail} />
                <p style={errorStyle}>{emailError}</p>
                <input placeholder="Password" style={inputstyle} type="password" value={pass} onChange={handlePass} />
                <p style={errorStyle}>{passError}</p>
                <input placeholder="Confirm Password" style={inputstyle} type="password" value={confirmPass} onChange={handleconfirmPass} />
                <p style={errorStyle}>{confirmPassError}</p>
                <input placeholder="Age" style={inputstyle} type="text" value={age} onChange={handleAge} />
                <p style={errorStyle}>{ageChecker}</p>
                <button style={buttonstyle} onClick={signin} >Sign up</button>
                <button style={buttonstyle} onClick={back}>Back to login?</button>
            </div>
        </div>
    </div>
}
export default Signin