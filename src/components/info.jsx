import axios from "axios";
import { useState } from "react";

export function Facts({ title, fact, like, dislike, Date, id, getData }) {
  const [likes, setLikes] = useState(like);
  const [disLikes, setDisLikes] = useState(dislike);
  const addLike = async () => {
    const userId = localStorage.getItem("userId");
    await axios
      .post(`https://reddit-backend-xvml.onrender.com/addLike/${id}/${userId}`)
      .then((res) => {
        setLikes(res.data.like);
        setDisLikes(res.data.dislike);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addDislike = async () => {
    const userId = localStorage.getItem("userId");

    await axios
      .post(
        `https://reddit-backend-xvml.onrender.com/addDislike/${id}/${userId}`
      )
      .then((res) => {
        setLikes(res.data.like);
        setDisLikes(res.data.dislike);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      style={{
        marginTop: "30px",
        fontFamily: "sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
          backgroundColor: "gray",
          width: "1000px",
          padding: "20px",
          backgroundColor: "rgba(31, 31, 31, 0.5)",
        }}
      >
        <h2>{title}</h2>
        <div style={{ overflow: "scroll" }}>
          <p>{fact}</p>
        </div>

        <div>
          <button onClick={addLike}>{likes.length}</button> |
          <button onClick={addDislike}>{disLikes.length}</button>
        </div>

        <p style={{ fontSize: "10px" }}> {Date}</p>
      </div>
    </div>
  );
}
