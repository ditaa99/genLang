import { useState } from "react";
import axios from "axios";
import "./index.css";
// import { Route} from "react-router-dom";
// import { Router, Routes, Route} from "react-router-dom";
import Menu from "./components/menu";
// import Info from "./components/Info";

const App = () => {
  const [result, setResult] = useState("");

  const handleClick = async () => {
    try {
      // Make a POST request to your Flask API
      const response = await axios.post("http://localhost:5000/", {
        // Pass any necessary data to your Python code
        // For example, you might send user input
        inputData: "example data",
      });

      console.log(response.data.result);
      // Handle the response
      setResult(response.data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <Menu />

      <div className="symb_rules">
        <div className="symbols">
          <div className="symbol-row">
            <p className="label">Terminal symbols:</p>
            <textarea
              rows="1"
              cols="5"
              placeholder="Enter terminal symbols here"
            ></textarea>
          </div>
          <div className="symbol-row">
            <p className="label">Nonterminal symbols:</p>
            <textarea
              rows="1"
              cols="5"
              placeholder="Enter nonterminal symbols here"
            ></textarea>
          </div>
          <div className="symbol-row">
            <p className="label">Starting symbol:</p>
            <textarea rows="1" cols="5" placeholder="S"></textarea>
          </div>
        </div>

        <div className="rules">
          <div className="rules-top">
            <p>Rules:</p>
            <button type="button" value="New" className="btn">
              New
            </button>
          </div>
          <p>[backend will do the rest, inputting new sets of rules]</p>
        </div>
      </div>
      <div className="solution">
        <button type="button" value="Generate" className="btn">
          Generate
        </button>
        {/* <input type='text' id='generate' name='generate' /> */}
      </div>
      <div className="lang">
        <p>Lanugage:</p>
      </div>
      <div style={{ display: "none" }}>
        <button onClick={handleClick}>Run Python Code</button>
        <div>Result: {result}</div>
      </div>


      {/* <Router>
      <Routes>
        <Route path="/info" element={<Info />} />
        <Route path="/" element={<Menu />} />
      </Routes>
    </Router> */}
    </div>
  );
};

export default App;
