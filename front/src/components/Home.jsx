import { useState } from "react";
import axios from "axios";
import "../index.css";
import Menu from "./Menu";

const Home = () => {
  const [terminalSymbols, setTerminalSymbols] = useState("");
  const [nonterminalSymbols, setNonterminalSymbols] = useState("");
  const [startingSymbol, setStartingSymbol] = useState("");
  // const [generatedLanguage, setGeneratedLanguage] = useState("");
  const [rules, setRules] = useState([]);



  // const handleGenerate = async () => {
  //   const requestData = {
  //     terminal_symbols: terminalSymbols,
  //   };
  
  //   try {
  //     const response = await axios.post("http://localhost:5000/newRule", requestData);
  //     // Handle the response from the backend
  //     // setGeneratedLanguage(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error generating language:", error);
  //   }
  // };
  
  const handleGenerate = async () => {
    const requestData = {
      terminalSymbols: terminalSymbols,
      nonterminalSymbols: nonterminalSymbols,
      startingSymbol: startingSymbol,
      rules: rules,
    };
    
  
    try {
      const response = await axios.post("http://localhost:5000/newRule", requestData);
      console.log(response.data); // This will show the response on your frontend console.
    } catch (error) {
      console.error("Error generating language:", error);
    }
  };
  

  // const handleGenerate = () => {
  //   // Prepare the data to be sent to the backend
  //   // const requestData = {
  //   //   grammar_rules: [
  //   //     // You can construct grammar rules based on the user input
  //   //     // For simplicity, let's assume the user only inputs terminal and nonterminal symbols
  //   //     `${startingSymbol} -> ${terminalSymbols} ${nonterminalSymbols}`,
  //   //   ],
  //   //   symbols: {
  //   //     terminal: terminalSymbols.split(" "),
  //   //     nonterminal: nonterminalSymbols.split(" "),
  //   //     starting: startingSymbol,
  //   //   },
  //   // };
  //   const requestData = {
  //     // ... other data
  //     terminal_symbols: terminalSymbols,
  //   };
  //   console.log(`Sending this data to the server:\n${requestData}`);

  //   // Send the data to the backend

  //   // Send a POST request to the backend
  //   axios.post("/api/generate-languages", requestData)
  //     .then(response => {
  //       // Handle the response from the backend
  //       setGeneratedLanguage(response.data);
  //     })
  //     .catch(error => {
  //       console.error("Error generating language:", error);
  //     });
  // };

  const addRule = () => {
    setRules(prevRules => [...prevRules, rules.length + 1]);
    console.log('New button was clicked!')
  };

  const handleRuleChange = (index, value) => {
    setRules(prevRules => {
      const updatedRules = [...prevRules];
      updatedRules[index] = value;
      return updatedRules;
    });
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
              value={terminalSymbols}
              onChange={(e) => setTerminalSymbols(e.target.value)}
            ></textarea>
          </div>
          <div className="symbol-row">
            <p className="label">Nonterminal symbols:</p>
            <textarea
              rows="1"
              cols="5"
              placeholder="Enter nonterminal symbols here"
              value={nonterminalSymbols}
              onChange={(e) => setNonterminalSymbols(e.target.value)}
            ></textarea>
          </div>
          <div className="symbol-row">
            <p className="label">Starting symbol:</p>
            <textarea
              rows="1"
              cols="5"
              placeholder="S"
              value={startingSymbol}
              onChange={(e) => setStartingSymbol(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="rules">
          <div className="rules-top">
            <p className="label">Rules:</p>
            
            <button type="button" value="New" className="btn" onClick={addRule}>
              New
            </button>
          </div>
          <div>
          <p>[ S &#x2192; aA]</p>
          </div>
          {rules.map((rule, index) => (
            <div key={index} className="rule-row">
              <p>{index + 1}. <input type="text" value={rule || ""} onChange={(e) => handleRuleChange(index, e.target.value)} /></p>
            </div>
          ))}
        </div>
      </div>
      <div className="solution">
        <button type="button" value="Generate" className="btn" onClick={handleGenerate}>
          Generate
        </button>
      </div>
      <div className="lang">
        <p className="label">Language:</p>
        {/* <div>{generatedLanguage}</div> */}
      </div>
      <div style={{ display: "none" }}>
        {/* This section is hidden, but you can uncomment it if needed */}
        {/* <button onClick={handleClick}>Run Python Code</button> */}
        {/* <div>Result: {result}</div> */}
      </div>
    </div>
  );
};

export default Home;
