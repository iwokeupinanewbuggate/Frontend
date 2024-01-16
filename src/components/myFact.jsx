import axios from "axios";
import Edit from "./edit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Fact({
  title,
  fact,
  like,
  dislike,
  Date,
  id,
  myFacts,
  setMyFacts,
}) {
  const deleteFact = async () => {
    await axios
      .delete(`https://reddit-backend-xvml.onrender.com/facts/${id}`)
      .then((res) => {
        const filteredData = myFacts.filter((fact) => fact._id !== res.data);
        setMyFacts(filteredData);
        toast.success("Successfully deleted", {
          position: "bottom-left",
          autoClose: 2000,
          draggable: false,
          hideProgressBar: true,
          pauseOnHover: false,
          closeOnClick: false,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        backgroundColor: "gray",
        width: "1000px",
        padding: "20px",
        backgroundColor: "rgba(31, 31, 31, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "30px",
        fontFamily: "sans-serif",
      }}
    >
      <h2>{title}</h2>
      <div style={{ overflow: "scroll" }}>
        <p>{fact}</p>
      </div>
      <div>
        <button>{like.length}</button> | <button>{dislike.length}</button>
      </div>
      <p style={{ fontSize: "10px" }}> {Date}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Edit
          factId={id}
          fact={fact}
          title={title}
          myFacts={myFacts}
          setMyFacts={setMyFacts}
        />
        <button
          style={{
            backgroundColor: "red",
            padding: "10px",
            border: "none",
            borderRadius: "10px",
            fontSize: "15px",
            fontFamily: "sans-serif",
          }}
          onClick={deleteFact}
        >
          delete
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
