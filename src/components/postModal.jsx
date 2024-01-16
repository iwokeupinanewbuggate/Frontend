import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "30%",
  left: "27.7%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "1000px",
  height: "30vh",
  border: "none",
  backgroundColor: "#2e2e2d",
  borderRadius: "20px",
};

export default function BasicModal({ myFacts, setMyFacts }) {
  const [titleText, settitleText] = React.useState("");
  const [fact, setfact] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTitle = (event) => {
    settitleText(event.target.value);
  };
  const handleFacts = (event) => {
    setfact(event.target.value);
  };

  const Close = () => {
    setOpen(false);
    settitleText("");
    setfact("");
  };

  const postFact = async () => {
    const userid = localStorage.getItem("userId");
    const userID = JSON.parse(userid);
    if (titleText !== "" && fact !== "") {
      axios
        .post(`https://reddit-backend-xvml.onrender.com/facts`, {
          title: titleText,
          fact: fact,
          userId: userID,
        })
        .then((res) => {
          console.log(res);
          handleClose();
          settitleText("");
          setfact("");
          setMyFacts([...myFacts, { ...res.data }]);
          toast.success("Successfully posted", {
            position: "top-right",
            theme: "dark",
            hideProgressBar: true,
            pauseOnHover: false,
            closeOnClick: false,
            autoClose: 2000,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Fill out inputs");
    }
  };
  return (
    <div>
      <Button
        style={{
          backgroundColor: "gray",
          padding: "10px",
          color: "white",
        }}
        onClick={handleOpen}
      >
        Post fact
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-titletext"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(10, 10, 10, 0.1)",
          }}
        >
          <Box sx={style}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "40px" }}
            >
              <input
                placeholder="Title"
                value={titleText}
                onChange={handleTitle}
                style={{
                  padding: "30px",
                  backgroundColor: "#2e2e2d",
                  width: "500px",
                  border: "none",
                }}
              />
              <input
                placeholder="Fact"
                value={fact}
                onChange={handleFacts}
                style={{
                  padding: "30px",
                  backgroundColor: "#2e2e2d",
                  width: "500px",
                  border: "none",
                }}
              />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "space-evenly",
                }}
              >
                <button onClick={postFact} style={{ padding: "5px" }}>
                  Post
                </button>
                <button
                  onClick={Close}
                  style={{
                    backgroundColor: "rgba(10, 10, 10,)",
                  }}
                >
                  X
                </button>
              </div>
            </div>
          </Box>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}
