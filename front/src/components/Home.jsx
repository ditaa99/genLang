import { useState } from "react";
import axios from "axios";
import "../index.css";
import Menu from "./Menu";
import Rule from "./Rule";

const Home = () => {
  const [terminalSymbols, setTerminalSymbols] = useState("");
  const [nonterminalSymbols, setNonterminalSymbols] = useState("");
  const [startingSymbol, setStartingSymbol] = useState("");
  const [rules, setRules] = useState([]);
  const [terminalSymbolsError, setTerminalSymbolsError] = useState(null);
  const [nonterminalSymbolsError, setNonterminalSymbolsError] = useState(null);
  const [startingSymbolError, setStartingSymbolError] = useState(null);
  const [rulesError, setRulesError] = useState(null);
  const [terminalDuplicateWarning, setTerminalDuplicateWarning] =
    useState(null);
  const [nonTerminalDuplicateWarning, setNonTerminalDuplicateWarning] =
    useState(null);

  const handleGenerate = async () => {
    // Validation
    let hasError = false;

    if (!validateTerminalSymbols(terminalSymbols)) {
      setTerminalSymbolsError(
        "Terminal symbols should be small letters or numbers separated by commas."
      );
      hasError = true;
    } else {
      setTerminalSymbolsError(null);
    }

    if (!validateNonterminalSymbols(nonterminalSymbols)) {
      setNonterminalSymbolsError(
        "Nonterminal symbols should be capital letters separated by commas."
      );
      hasError = true;
    } else {
      setNonterminalSymbolsError(null);
    }

    if (!validateStartingSymbol(startingSymbol)) {
      setStartingSymbolError(
        "Starting symbol should be a single capital letter."
      );
      hasError = true;
    } else {
      setStartingSymbolError(null);
    }

    if (!nonterminalSymbols.includes(startingSymbol)) {
      setStartingSymbolError(
        "Starting symbol must be a valid nonterminal symbol."
      );
      hasError = true;
    }

    // Check for duplicates in Terminal Symbols
    const terminalSymbolsArray = terminalSymbols.split(",");
    const hasTerminalDuplicates =
      new Set(terminalSymbolsArray).size !== terminalSymbolsArray.length;

    if (hasTerminalDuplicates) {
      setTerminalDuplicateWarning(
        "Warning: You have entered duplicate symbols in Terminal symbols."
      );
    } else {
      setTerminalDuplicateWarning(null);
    }

    // Check for duplicates in Nonterminal Symbols
    const nonTerminalSymbolsArray = nonterminalSymbols.split(",");
    const hasNonTerminalDuplicates =
      new Set(nonTerminalSymbolsArray).size !== nonTerminalSymbolsArray.length;

    if (hasNonTerminalDuplicates) {
      setNonTerminalDuplicateWarning(
        "Warning: You have entered duplicate symbols in Nonterminal symbols."
      );
    } else {
      setNonTerminalDuplicateWarning(null);
    }

    if (rules.length === 0) {
      setRulesError("You must have at least a rule.");
      hasError = true;
    } else {
      // Check for empty rules
      const hasEmptyRule = rules.some((rule) => rule === "");
      if (hasEmptyRule) {
        setRulesError("Rules cannot be empty");
        hasError = true;
      } else {
        setRulesError(null);
      }
    }

    {
      rules.map((rule, index) => (
        <Rule
          key={index}
          index={index} // Pass the index
          value={rule} // Pass the rule value
          onRemove={(ruleIndex, updatedValue) => {
            // Pass the onRemove function
            const updatedRules = [...rules];
            updatedRules.splice(ruleIndex, 1);
            setRules(updatedRules);
            onInputChange(index, updatedValue);
          }}
        />
      ));
    }

    if (hasError) {
      return;
    }

    // Data to send
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
    setRules((prevRules) => [...prevRules, ""]);
  };

  const handleRuleChange = (index, updatedValue) => {
    setRules((prevRules) => {
      const updatedRules = [...prevRules];
      updatedRules[index] = updatedValue.trim(); // Trim for more reliable validation
      return updatedRules;
    });
  };

  const onInputChange = (index, updatedValue) => {
    handleRuleChange(index, updatedValue);
  };

  const onRemove = (ruleIndex) => {
    console.log("Rule index to remove:", ruleIndex);

    const updatedRules = [...rules];
    updatedRules.splice(ruleIndex, 1);
    setRules(updatedRules);
  };

  // Validation functions
  const validateTerminalSymbols = (symbols) => {
    const regex = /^[a-z0-9,]+$/; // Allows small letters, numbers, and commas
    return regex.test(symbols.trim());
  };

  const validateNonterminalSymbols = (symbols) => {
    const regex = /^[A-Z,]+$/; // Allows capital letters and commas
    return regex.test(symbols.trim());
  };

  const validateStartingSymbol = (symbol) => {
    const regex = /^[A-Z]$/; // Allows a single capital letter
    return regex.test(symbol.trim());
  };

  return (
    <div className="App">
      <Menu />

      <div className="symb_rules">
        <div className="symbols">
          <div className="symbol-row">
            <div className="input-wrapper">
              <p className="label">Terminal symbols:</p>
              <textarea
                rows="1"
                cols="5"
                placeholder="Enter terminal symbols here"
                value={terminalSymbols}
                onChange={(e) => setTerminalSymbols(e.target.value)}
              ></textarea>
            </div>
            <div className="error-message">{terminalSymbolsError}</div>
            {terminalDuplicateWarning && (
              <div className="warning-message">{terminalDuplicateWarning}</div>
            )}
          </div>
          <div className="symbol-row">
            <div className="input-wrapper">
              <p className="label">Nonterminal symbols:</p>
              <textarea
                rows="1"
                cols="5"
                placeholder="Enter nonterminal symbols here"
                value={nonterminalSymbols}
                onChange={(e) => setNonterminalSymbols(e.target.value)}
              ></textarea>
            </div>{" "}
            <div className="error-message">{nonterminalSymbolsError}</div>
            {nonTerminalDuplicateWarning && (
              <div className="warning-message">
                {nonTerminalDuplicateWarning}
              </div>
            )}
          </div>
          <div className="symbol-row">
            <div className="input-wrapper">
              <p className="label">Starting symbol:</p>
              <textarea
                rows="1"
                cols="5"
                placeholder="S"
                value={startingSymbol}
                onChange={(e) => setStartingSymbol(e.target.value)}
              ></textarea>
            </div>{" "}
            <div className="error-message">{startingSymbolError}</div>
          </div>
        </div>

        <div className="rules">
          <div className="rules-top">
            <p className="label">Rules:</p>
            <button type="button" value="New" className="btn" onClick={addRule}>
              New
            </button>
          </div>
          {rules.map((rule, index) => (
            <Rule
              key={index}
              index={index}
              value={rule}
              onRemove={(index) => onRemove(index)}
              onInputChange={handleRuleChange} // Pass handleRuleChange to Rule component
            />
          ))}
          <div className="error-message">{rulesError}</div>
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
    </div>
  );
};

export default Home;
