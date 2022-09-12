import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import CreateMemory from "./components/CreateMemory";
import Memories from "./components/Memories";
import Navbar from "./components/Navbar";
import Context from "./GlobalState/Context";
function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <Context>
            <CreateMemory />
            <Memories />
          </Context>
        </div>
      </div>
    </>
  );
}

export default App;
