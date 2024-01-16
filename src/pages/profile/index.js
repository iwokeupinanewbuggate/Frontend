import axios from "axios"
import Router from "next/router"
import { use, useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";


const defaultProfilePic = "pfp.png";

const Profile = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [profile, setprofile] = useState([]);
    const [pfpuptade, setpfpuptade] = useState(false);
    const [isUptadingProfile, setIsUptadingProfile] = useState(false)
    const [aboutMe, setaboutMe] = useState("")
    const [userName, setuserName] = useState("")
    const [Age, setAge] = useState()
    const goBack = () => {
        Router.push("/")
    }

    useEffect(() => {
        const getUsersInfo = () => {
            const id = localStorage.getItem("userId")
            const ID = JSON.parse(id)
            axios.get(`https://reddit-backend-xvml.onrender.com/user/${ID}`).then((res) => {
                setPreviewImage(res.data.imageUrl)
                setprofile(res.data)
                setAge(res.data.age)
                setuserName(res.data.username)
                setaboutMe(res.data.aboutMe)
            }).catch((err) => {
                console.log(err)

            },)
        }
        getUsersInfo()

    }, [])


    const uptadeProfile = () => {
        const id = localStorage.getItem("userId")
        const imageUrl = localStorage.getItem('imageUrl')
        const ID = JSON.parse(id)
        axios.put(`https://reddit-backend-xvml.onrender.com/user/edit/${ID}`,
            {
                aboutMe: aboutMe,
                username: userName,
                imageUrl: imageUrl,
                userId: id,
                age: Age
            }).then((res) => {
                console.log(res)
                toast.success("Successfully saved", {
                    position: "top-left",
                    autoClose: 2000,
                    draggable: false,
                    hideProgressBar: true,
                    pauseOnHover: false,
                    closeOnClick: false,
                    theme: "dark",
                });
                window.location.reload()
                if (res.data.imageUrl === "") {

                } else {
                    previewImage(res.data.imageUrl)
                }
                setIsUptadingProfile(false);

            }).catch((err) => err)

    }

    const uptade = () => {
        setIsUptadingProfile(true)

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalProfilePic = profilePic || defaultProfilePic;
        console.log("Updated Profile Picture:", finalProfilePic);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                localStorage.setItem('imageUrl', imageUrl)
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setProfilePic(file);

        } else {
            setPreviewImage(null);
            setProfilePic(null);
        }
    };

    const uptadeed = () => {
        setpfpuptade(true);

    };
    const done = () => {
        setpfpuptade(false);
    };
    const handleAboutme = event => {
        setaboutMe(event.target.value)
    }

    const handleUserName = event => {
        setuserName(event.target.value)
    }
    const handleAge = event => {
        setAge(event.target.value)
    }



    return (<div style={{ width: "100vw", height: "100vh", background: 'linear-gradient(to top, black, #363534)', }}>
        {!isUptadingProfile &&
            <div>
                <div style={{ display: "flex", height: "5vh", width: "100vw", backgroundColor: "#363534", justifyContent: "space-evenly" }}> <button onClick={goBack}>Go Back</button> <button onClick={uptade}>Edit profile</button>

                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "30px" }}>

                    {previewImage ? (
                        <img
                            src={previewImage}
                            alt="Profile Preview"
                            style={{ width: "100px", height: "100px", border: "3px solid gray", borderRadius: "50%" }}
                        />
                    ) : (
                        <img
                            src={defaultProfilePic}
                            alt="Default Profile"
                            style={{ width: "100px", height: "100px", border: "3px solid gray", borderRadius: "50%" }}
                        />
                    )}

                    <p style={{ fontFamily: "sans-serif" }}>  {profile.username}</p>
                    <p style={{ fontFamily: "sans-serif" }}> {profile.age}</p>
                    <h2 style={{ fontFamily: "sans-serif" }}>About</h2>
                    <div style={{ backgroundColor: "#1f1f1f", width: "50vw", height: "30vh", borderRadius: "20px", fontFamily: "sans-serif", padding: "10px" }}>
                        <p >{profile.aboutMe}</p>
                    </div>

                </div>
            </div>}


        {isUptadingProfile && <div
            style={{
                width: "100vw",
                height: "100vh",
                background: "linear-gradient(to top, black, #363534)",
                position: "fixed",
                backgroundColor: "rgba(10,10,10,1)",
            }}
        >

            <div
                style={{
                    display: "flex",
                    height: "5vh",
                    width: "100vw",
                    backgroundColor: "#363534",
                    justifyContent: "space-evenly",
                }}
            >

                <button onClick={uptadeProfile}>Save</button>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "30px",
                }}
            >
                {previewImage ? (
                    <img
                        src={previewImage}
                        alt="Profile Preview"
                        onClick={uptadeed}
                        style={{
                            width: "100px",
                            height: "100px",
                            border: "3px solid gray",
                            borderRadius: "50%",
                        }}
                    />
                ) : (
                    <img
                        src={defaultProfilePic}
                        alt="Default Profile"
                        onClick={uptadeed}
                        style={{
                            width: "100px",
                            height: "100px",
                            border: "3px solid gray",
                            borderRadius: "50%",
                        }}
                    />
                )}

                <input value={userName} onChange={handleUserName} style={{ padding: "10px" }} />
                <input value={Age} onChange={handleAge} />
                <h2 style={{ fontFamily: "sans-serif" }}>About</h2>
                <div style={{ backgroundColor: "#1f1f1f", width: "50vw", height: "30vh", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <input value={aboutMe} onChange={handleAboutme} style={{ width: "45vw", height: "25vh", backgroundColor: "#1f1f1f", border: "none", padding: "10px" }} placeholder="About me" />
                </div>
            </div>
            {pfpuptade && (
                <div
                    style={{ position: "relative", backgroundColor: "rgba(10,10,10,0.1)" }}

                >
                    <form onSubmit={handleSubmit}>
                        <label>
                            Profile Picture:
                            <input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </label>

                        <br />
                        <button type="submit" onClick={done}>
                            Update Profile Picture
                        </button>
                    </form>
                </div>
            )}
            <p> </p>
        </div>}
    </div >)


}

export default Profile



