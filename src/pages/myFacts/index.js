import { useEffect, useState } from "react"
import Fact from "../../components/myFact"
import axios from "axios"
import Router from "next/router"
import BasicModal from "@/components/postModal"

const facts = () => {
    const [myFacts, setMyFacts] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {

        const getMyFacts = async () => {
            setloading(true)
            const UserId = localStorage.getItem("userId")
            const userId = JSON.parse(UserId)
            await axios.get(`https://reddit-backend-xvml.onrender.com/facts/${userId}`).then((res) => {
                setloading(false)
                setMyFacts(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }
        getMyFacts()
    }, [])
    const goBack = () => {
        Router.push("/")
    }

    return (<div>
        {loading &&
            <div style={{ backgroundColor: "gray", width: "20vw", height: "20vh", display: "flex", justifyContent: "center", alignItems: "center" }}>You have never posted </div>
        }
        {!loading && myFacts.length === 0 && <div style={{
            background: 'linear-gradient(to top, black, #5c5d5e)', width: "100vw", height: "100vh", display: 'flex', justifyContent: "center",
            alignItems: "center", flexDirection: "column"
        }}>
            <div style={{ width: "100vw", height: "10vh", display: "flex", justifyContent: "space-evenly", alignItems: "center", position: "fixed", top: "0", backgroundColor: "" }}>
                <button style={{ backgroundColor: "gray", padding: "10px", border: "none", borderRadius: "5px", padding: "13px", fontSize: "17px" }} onClick={goBack}>Go Back</button> <BasicModal setMyFacts={setMyFacts}
                    myFacts={myFacts} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "sans-serif" }}>You have never posted </div>
        </div>}
        {!loading && myFacts.length > 0 && < div style={{
            background: 'linear-gradient(to top, black, #5c5d5e)', width: "100vw", height: "100vh", display: 'flex', justifyContent: "center",
            alignItems: "center", flexDirection: "column"
        }}>
            <div style={{ width: "100vw", height: "10vh", display: "flex", justifyContent: "space-evenly", alignItems: "center", position: "fixed", top: "0", backgroundColor: "" }}>
                <button style={{ backgroundColor: "gray", padding: "10px", border: "none", borderRadius: "5px", padding: "13px", fontSize: "17px" }} onClick={goBack}>Go Back</button> <BasicModal setMyFacts={setMyFacts}
                    myFacts={myFacts} />
            </div>


            <div style={{
                overflow: "scroll", display: 'flex',
                alignItems: "center", flexDirection: "column", top: "10vh", position: "relative"
            }}>
                {myFacts.map((fact, key) => {
                    return <Fact
                        key={key}
                        title={fact.title}
                        setMyFacts={setMyFacts}
                        myFacts={myFacts}
                        fact={fact.fact}
                        id={fact._id}
                        like={fact.like}
                        dislike={fact.dislike}
                        Date={fact.Date}
                    />

                })}
            </div>
        </div>}
    </div >)
}

export default facts