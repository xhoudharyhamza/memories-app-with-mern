import React, { useContext } from "react";
import Memory from "./Memory";
import { MemoriesContext } from "../GlobalState/Context";
const Memories = () => {
  let { memories } = useContext(MemoriesContext);
  return (
    <div className="col-md-7 col-lg-7 col-sm-12">
      <div className="memories">
        <div className="row">
          {memories ? (
            memories.map((memory, index) => {
              return (
                <Memory
                  title={memory.title}
                  author={memory.author}
                  description={memory.description}
                  key={index}
                  id={memory._id}
                  likes={memory.likes}
                  image={memory.image}
                  date={memory.date}
                />
              );
            })
          ) : (
            <p>Nothing To show yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Memories;
