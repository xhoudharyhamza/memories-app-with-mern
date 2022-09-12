import React, { useReducer, createContext, useEffect } from "react";
import reducer from "./Reducer";
import axios from "axios";
let initialState = {
  memories: [],
};
let MemoriesContext = createContext();
const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //fetching memories from the database when the components rendered
  let fetchMemories = async () => {
    try {
      let res = await axios.get("/memories");
      if (res.status === 200) {
        let memories = res.data.memories;
        dispatch({ type: "SET_MEMORIES", payload: memories });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMemories();
  }, []);
  //add memory to state when the user add new memory
  let addMemory = (memory) => {
    dispatch({ type: "ADD_MEMORY", payload: memory });
  };
  // remove memory from the state
  let removeMemory = (id) => {
    let memories = state.memories.filter((memory) => {
      return memory._id != id;
    });
    dispatch({ type: "DELETE_MEMORY", payload: memories });
  };
  //function to increase update the state when use hit the like button
  let increaseLikes = (id) => {
    let memories = state.memories.map((memory) => {
      if (memory._id === id) {
        return {
          ...memory,
          likes: memory.likes + 1,
        };
      } else {
        return memory;
      }
    });
    dispatch({ type: "INCREASE_LIKES", payload: memories });
  };
  return (
    <MemoriesContext.Provider
      value={{ ...state, addMemory, removeMemory, increaseLikes }}
    >
      {children}
    </MemoriesContext.Provider>
  );
};

export default Context;
export { MemoriesContext };
