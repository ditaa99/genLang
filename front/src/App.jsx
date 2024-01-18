import { useState } from "react";
import axios from "axios";
import "./index.css";

const YourReactComponent = () => {
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
      <div className="menu">
        <button type="button" value="Save" className="menu-item">
          Save
        </button>
        <button type="button" value="Import" className="menu-item">
          Import
        </button>
        <button type="button" value="Examples" className="menu-item">
          Examples
        </button>
        <button type="button" value="Help" className="menu-item">
          Help
        </button>
      </div>

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
          <button type="button" value="New" className="btn">
            New
          </button>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            inventore sapiente doloribus deleniti suscipit sunt harum veritatis
            corrupti assumenda aliquid tenetur earum dolor mollitia, delectus
            dolore incidunt, neque ipsa eius.
          </p>
        </div>
      </div>
      <div className="solution">
        <p>Generate </p>
        {/* <input type='text' id='generate' name='generate' /> */}
      </div>
      <div className="lang">
        <p>Lanugage</p>
      </div>
      <div style={{ display: "none" }}>
        <button onClick={handleClick}>Run Python Code</button>
        <div>Result: {result}</div>
      </div>
    </div>
  );
};

export default YourReactComponent;
