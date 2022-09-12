import React, { useContext } from "react";
import axios from "axios";
import moment from "moment";
import { MemoriesContext } from "../GlobalState/Context";
const Memory = ({ title, author, description, id, likes, image, date }) => {
  let { removeMemory, increaseLikes } = useContext(MemoriesContext);
  //create the function to request the server when use hit the delete button
  let deleteMemory = async (id) => {
    alert("Are you sure? Do you want to delete the memory");
    try {
      let res = await axios.delete(`/memories/${id}`);
      if (res.status !== 200) {
        alert("error! memory is not deleted");
      } else if (res.status === 200) {
        let memory = res.data.memory;
        removeMemory(memory._id);
      }
    } catch (error) {
      alert("Some error! memory can't be deleted");
    }
  };
  //create the function to request the server when use hit the like button
  let likeMemory = async (id) => {
    let res = await axios.patch(`/memories/like/${id}`);
    if (res.status !== 200) {
      console.log("likes count is not increased");
    } else if (res.status === 200) {
      let memory = res.data.likedMemory;
      increaseLikes(memory._id);
    }
  };
  return (
    <>
      <div className="col-md-6 col-lg-6 col-sm-12">
        <div className="memory">
          <div className="memory-image">
            <img className="card-img-top" src={image} alt="alternate" />
            <p className="memory-date">{moment(date).format("DD/MM/YYYY")}</p>
          </div>
          <div className="memory-body">
            <h4 className="memory-title">{title}</h4>
            <p className="memory-description">{description}</p>
            <p className="memory-author">{author}</p>
            <div className="memory-action-btn">
              <div className="like-memory">
                <button
                  onClick={() => {
                    likeMemory(id);
                  }}
                >
                  <i
                    className="fa-regular fa-thumbs-up"
                    style={{ color: likes > 0 ? "blue" : "black" }}
                  ></i>
                </button>
                <p className="likes-count">{likes}</p>
              </div>
              <div className="delete-memory">
                <button
                  onClick={() => {
                    deleteMemory(id);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Memory;
