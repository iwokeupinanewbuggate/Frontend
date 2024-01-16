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

export default function Edit({ myFacts, setMyFacts, factId, fact, title }) {
  const [titleText, setFactTitle] = React.useState(title);
  const [factText, setFactText] = React.useState(fact);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTitle = (event) => {
    setFactTitle(event.target.value);
  };
  const handleFact = (event) => {
    setFactText(event.target.value);
  };

  const close = () => {
    setOpen(false);
    setFactTitle("");
    setFactText("");
  };

  const editPost = async () => {
    if (titleText !== "" && factText !== "") {
      axios
        .put(`https://reddit-backend-xvml.onrender.com/facts/${factId}`, {
          title: titleText,
          fact: factText,
        })
        .then((res) => {
          console.log(res);
          handleClose();
          toast.success("Successfully edited", {
            position: "top-left",
            theme: "dark",
            hideProgressBar: true,
            pauseOnHover: false,
            closeOnClick: false,
            draggable: false,
            autoClose: 2000,
          });
          const updatedFacts = myFacts.map((fact) => {
            if (fact._id === factId) {
              return { ...fact, fact: factText, title: titleText };
            } else {
              return fact;
            }
          });
          setMyFacts(updatedFacts);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Fill the input");
    }
  };
  return (
    <div>
      <ToastContainer />
      <Button
        style={{
          backgroundColor: "green",
          padding: "5px",
          color: "white",
          borderRadius: "10px",
        }}
        onClick={handleOpen}
      >
        edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
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
                  padding: "20px",
                  backgroundColor: "#2e2e2d",
                  width: "500px",
                  border: "none",
                }}
              />
              <input
                placeholder="Fact"
                value={factText}
                onChange={handleFact}
                style={{
                  padding: "20px",
                  backgroundColor: "#2e2e2d",
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
                <button onClick={editPost} style={{ padding: "5px" }}>
                  Save
                </button>
                <button
                  onClick={close}
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
    </div>
  );
}
