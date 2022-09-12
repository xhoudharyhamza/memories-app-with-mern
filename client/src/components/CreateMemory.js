import React, { useState, useContext } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { MemoriesContext } from "../GlobalState/Context";
const CreateMemory = () => {
  let { addMemory } = useContext(MemoriesContext);
  const [memoryDetails, setMemoryDetails] = useState({
    title: "",
    author: "",
    image: "",
    description: "",
  });
  let memoryChangeHandler = (e) => {
    setMemoryDetails({ ...memoryDetails, [e.target.name]: e.target.value });
  };
  //function to post memory to server
  let postMemory = async (e) => {
    e.preventDefault();
    let { title, author, image, description } = memoryDetails;
    try {
      let res = await axios.post("/memories", {
        title,
        author,
        image,
        description,
      });
      if (res.status === 401) {
        alert("Some error! memory cannot created ");
      } else if (res.status === 200) {
        setMemoryDetails({ title: "", author: "", description: "" });
        let memory = res.data.memory;
        addMemory(memory);
      }
    } catch (error) {
      alert("Error! request cannot be sent to server");
    }
  };
  return (
    <div className="col-md-5 col-sm-12 col-lg-5">
      <div className="create-memory">
        <h3>Post Your Memory</h3>
        <div className="memory-form">
          <form method="POST" onSubmit={postMemory}>
            <div className="form-group">
              <label htmlFor="title">Enter Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Title"
                name="title"
                required
                onChange={memoryChangeHandler}
                value={memoryDetails.title}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Author Name"
                name="author"
                required
                onChange={memoryChangeHandler}
                value={memoryDetails.author}
              />
            </div>
            <div className="form-group">
              <label htmlFor="picture">Choose Image</label>
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) => {
                  setMemoryDetails({ ...memoryDetails, image: base64 });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Add Details</label>
              <textarea
                className="form-control"
                rows="3"
                name="description"
                required
                onChange={memoryChangeHandler}
                value={memoryDetails.description}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Post Memory
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMemory;
