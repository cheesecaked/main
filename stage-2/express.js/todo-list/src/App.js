import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [desc, setDesc] = useState("");

  const [succes, setSucces] = useState("");
  const [dataa, setDataa] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/post");
        setDataa(data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, [succes]);
  const createPost = async () => {
    try {
      await axios
        .post("http://localhost:8000/post/create", {
          text: desc,
          ownerID: inputValue,
        })
        .then((el) => setSucces(el));
    } catch (error) {
      console.log("error");
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/post/${id}`);

      const temp = dataa.filter((item) => item._id !== id);
      setDataa(temp);
    } catch (error) {
      console.log("error");
    }
  };
  const updatePost = async (id, valu, value) => {
    try {
      const update = {
        text: valu,
      };
      const res = await axios.put(`http://localhost:8000/post/${id}`, update);
      console.log(res);
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div style={{ padding: 0, margin: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(#e66465, #9198e5)",
          flexDirection: "column",
        }}
      >
        <p style={{ color: "purple", fontStyle: "italic", fontSize: "45px" }}>
          Todo list
        </p>
        <div style={{ display: "flex", gap: "30px" }}>
          <input
            type="text"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <button
            onClick={() => {
              createPost();
              console.log("done");
            }}
          ></button>
        </div>
        <div>
          {dataa.map((el, index) => {
            return (
              <ListItem
                key={index}
                updatePost={updatePost}
                deletePost={deletePost}
                listElement={el}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
const ListItem = ({ updatePost, deletePost, listElement }) => {
  const [edit, setEdit] = useState(false);
  const [valu, setValu] = useState("");
  const [value, setValue] = useState("");
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        flexDirection: "row",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          marginTop: "10PX",
          border: "1px solid",
          width: "250px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {edit ? (
          <input
            style={{ width: "100%", height: "100%" }}
            value={valu}
            onChange={(e) => {
              setValu(e.target.value);
              console.log(valu);
            }}
          />
        ) : (
          <p>{listElement.text}</p>
        )}
      </div>
      <div>
        <p
          style={{ fontSize: "25px" }}
          onClick={() => {
            deletePost(listElement._id);
          }}
        >
          🗑️{" "}
        </p>
        <button
          onClick={() => {
            if (edit) {
              updatePost(listElement._id, valu, value);
              setEdit(false);
            } else {
              setValue(listElement.ownerID);
              setValu(listElement.text);
              setEdit(true);
            }
          }}
        >
          {edit ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};
export default App;
