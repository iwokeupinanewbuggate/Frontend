"use client"
import { useEffect, useState } from "react";
import { Facts } from "../components/info";
import axios from "axios";
import Router from "next/router";
process.env.DEBUG = 'axios*';
import "react-toastify/dist/ReactToastify.css";


const defaultpfp = "pfp.png"
const Home = () => {
  const [facts, setfacts] = useState([])
  const [loading, setloading] = useState(false)
  const [pfpImg, setPfpIMg] = useState()
  const getData = async () => {

    await axios.get("https://reddit-backend-xvml.onrender.com/facts").then((res) => {
      const likeSorted = res.data.sort((a, b) => b.like.length - a.like.length);
      const fullySorted = res.data.sort((a, b) => {
        return likeSorted !== 0 ? likeSorted : b.dislike.length - a.dislike.length;
      });
      setfacts(fullySorted)

    }).catch((err) => {
      console.log(err)
    })

    const id = localStorage.getItem("userId")
    const ID = JSON.parse(id)
    axios.get(`https://reddit-backend-xvml.onrender.com/user/${ID}`).then((res) => {
      if (res.data.imageUrl) {
        setPfpIMg(res.data.imageUrl)
      } else {
        setPfpIMg(defaultpfp)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    setloading(true)
    getData()
    setTimeout(() => {
      setloading(false)
    }, 100);

  }, [])


  useEffect(() => {
    const isUserLogged = () => {
      const user = localStorage.getItem("id")
      if (!user) {
        Router.push("/login")

      }
    }
    isUserLogged()

  }, [])

  const logout = () => {
    localStorage.removeItem("id")
    localStorage.removeItem("userId")
    localStorage.removeItem("imageUrl")
    Router.push("/login")
  }

  const id = () => {
    Router.push("/myFacts")
  }

  const user = () => {
    Router.push("/profile")
  }

  const gradientStyle = {
    background: 'linear-gradient(to top, black, #5c5d5e)',
    padding: '20px',
    color: '#fff',
    textAlign: 'center',
    display: "flex",
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "20px",
  };

  return (
    <div style={{ overflow: "hidden" }} >
      {loading && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", fontFamily: "sans-serif" }}> Loading . . . </div>}
      {!loading && facts.length > 0 && <div style={gradientStyle}>
        <div style={{ display: "flex", height: "10vh", width: "100vw", backgroundColor: "rgba(92, 93, 94,0.5)", position: "fixed", top: "0", justifyContent: "space-evenly", alignItems: "center", zIndex: "1" }}>
          <button onClick={id} style={{ padding: "10px", borderRadius: "10px", border: "none" }}>My facts</button> <img src={pfpImg} style={{ width: '70px', height: "70px", border: "5px #545454 solid", borderRadius: "50%" }} onClick={user} />   <button onClick={logout} style={{ padding: "10px", borderRadius: "10px", border: "none" }}>logout</button>
        </div>
        {/* <button onClick={id}>33</button> */}
        <div style={{ position: "relative", top: "10vh", overflow: "scroll" }}>
          {facts.map((fact, key) => {
            return <Facts
              key={key}
              title={fact.title}
              fact={fact.fact}
              id={fact._id}
              like={fact.like}
              dislike={fact.dislike}
              Date={fact.Date}
              getData={getData}

            />
          })}
        </div>

      </div>}
    </div >
  )
}

export default Home