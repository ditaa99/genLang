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

  const handleGenerate = async () => {
    const requestData = {
      terminalSymbols: terminalSymbols,
      nonterminalSymbols: nonterminalSymbols,
      startingSymbol: startingSymbol,
      rules: rules,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/fetchData",
        requestData
      );
      console.log(response.data); // This will show the response on your frontend console.
    } catch (error) {
      console.error("Error generating language:", error);
    }
  };

  const addRule = () => {
    setRules((prevRules) => [...prevRules, rules.length + 1]);
    console.log("New button was clicked!");
  };

  const handleRuleChange = (index, value) => {
    setRules((prevRules) => {
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
              <p>
                {index + 1}.{" "}
                <input
                  type="text"
                  value={rule || ""}
                  onChange={(e) => handleRuleChange(index, e.target.value)}
                />
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="solution">
        <button
          type="button"
          value="Generate"
          className="btn"
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>
      <div className="lang">
        <p className="label">Language:</p>
        {/* <div>{generatedLanguage}</div> */}
      </div>
    </div>
  );
};

export default Home;
